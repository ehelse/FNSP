/* FNSP Module */
if (typeof FNSP === 'undefined') {
    FNSP = {};
}
if (typeof FNSP.Ribbon === 'undefined') {
    FNSP.Ribbon = {};
}
if (typeof FNSP.EditMode === 'undefined') {
    FNSP.EditMode = {};
}

/*
Fix for MS-javascript that checks for browseris.ie and then uses attachEvent. This will cause an objectreference error on ie11
https://msdn.microsoft.com/en-us/library/ms536343(v=vs.85).aspx
Adding polyfill/spackling paste for attachEvent on ie11
TFS bug: 109651
*/
if (browseris.ie && browseris.ie11 && !HTMLElement.prototype.attachEvent) {
    HTMLElement.prototype.attachEvent = function (strEvt, func) {
        this.addEventListener(strEvt.substr(2), func, false);
    };
    window.attachEvent = function (strEvt, func) {
        this.addEventListener(strEvt.substr(2), func, false);
    };
}

//used for loading dialog for diffchecker
var waitDialog;

FNSP.Ribbon.ShouldButtonRender = function (shouldOverrideRender) {
    var cursor = RTE.Cursor.get_range();
    var htmlField = jQuery(cursor.$3_0).closest('[id$="RichHtmlField"]');

    if (
        htmlField.find('input[name*="MeetingPoint"]').length +
        htmlField.find('input[name*="ContactInformation"]').length >
        0
    ) {
        return false;
    }

    if (
        htmlField.find('input[name*="Ingressfield"]').length > 0 &&
        !shouldOverrideRender
    ) {
        return false;
    } else {
        return true;
    }
};

FNSP.Ribbon.ShouldAllSharedContentRender = function () {
    if (g_PageFileVersionForDisplay === '0.1') {
        return true;
    }
    return false;
};

if (typeof FNSP.WebPart === 'undefined') {
    FNSP.WebPart = {
        _currentWebPart: undefined,
        _webPartDefinition: undefined
    };
}

//Functions used to add webparts to richtext-fields
//pass in the web part ID as a string (guid)
FNSP.WebPart.getWebPartProperties = function (wpId) {
    var dfd = $.Deferred();

    var clientContext = new SP.ClientContext(
        _spPageContextInfo.webServerRelativeUrl
    );

    var oFile = clientContext
        .get_web()
        .getFileByServerRelativeUrl(_spPageContextInfo.serverRequestPath);

    var limitedWebPartManager = oFile.getLimitedWebPartManager(
        SP.WebParts.PersonalizationScope.shared
    );

    var collWebPart = limitedWebPartManager.get_webParts();

    //request the web part collection and load it from the server
    clientContext.load(collWebPart);
    clientContext.executeQueryAsync(
        Function.createDelegate(this, function () {
            var webPartDef = null;
            //find the web part on the page by comparing ID's
            for (var x = 0; x < collWebPart.get_count() && !webPartDef; x++) {
                var temp = collWebPart.get_item(x);
                if (temp.get_id().toString() === wpId) {
                    webPartDef = temp;
                }
            }
            //if the web part was not found
            if (!webPartDef) {
                dfd.reject(
                    'Web Part: ' +
                    wpId +
                    ' not found on page: ' +
                    _spPageContextInfo.webServerRelativeUrl
                );
                return;
            }

            //get the web part properties and load them from the server
            var webPartProperties = webPartDef.get_webPart().get_properties();
            clientContext.load(webPartProperties);
            clientContext.executeQueryAsync(
                Function.createDelegate(this, function () {
                    dfd.resolve(webPartProperties, webPartDef, clientContext);
                }),
                Function.createDelegate(this, function () {
                    dfd.reject('Failed to load web part properties');
                })
            );
        }),
        Function.createDelegate(this, function () {
            dfd.reject('Failed to load web part collection');
        })
    );

    return dfd.promise();
};

//Move webparts on the page. Use wpId (from markup), target zone name, and index in zone.
FNSP.WebPart.moveWebPart = function (wpId, zone, index) {
    var dfd = $.Deferred();

    FNSP.WebPart.getWebPartProperties(wpId)
        .done(function (webPartProperties, webPartDef, clientContext) {
            webPartDef.moveWebPartTo(zone, index);
            //save web part changes
            webPartDef.saveWebPartChanges();
            //execute update on the server
            clientContext.executeQueryAsync(
                Function.createDelegate(this, function () {
                    dfd.resolve();
                }),
                Function.createDelegate(this, function () {
                    dfd.reject('Failed to save web part properties');
                })
            );
        })
        .fail(function (err) {
            dfd.reject(err);
        });

    return dfd.promise();
};

//pass in the web part ID and a JSON object with the properties to update
FNSP.WebPart.saveWebPartProperties = function (wpId, obj) {
    var dfd = $.Deferred();

    FNSP.WebPart.getWebPartProperties(wpId)
        .done(function (webPartProperties, webPartDef, clientContext) {
            //set web part properties
            for (var key in obj) {
                webPartProperties.set_item(key, obj[key]);
            }
            //save web part changes
            webPartDef.saveWebPartChanges();
            //execute update on the server
            clientContext.executeQueryAsync(
                Function.createDelegate(this, function () {
                    dfd.resolve();
                }),
                Function.createDelegate(this, function () {
                    dfd.reject('Failed to save web part properties');
                })
            );
        })
        .fail(function (err) {
            console.error(err);
            dfd.reject(err);
        });

    return dfd.promise();
};

FNSP.WebPart.addWebPartFromXML = function (xml) {
    var dfd = $.Deferred(),
        clientContext = new SP.ClientContext(
            _spPageContextInfo.webServerRelativeUrl
        ),
        oFile = clientContext
            .get_web()
            .getFileByServerRelativeUrl(_spPageContextInfo.serverRequestPath),
        limitedWebPartManager = oFile.getLimitedWebPartManager(
            SP.WebParts.PersonalizationScope.shared
        );

    this._webPartDefinition = limitedWebPartManager.importWebPart(xml);
    this._currentWebPart = this._webPartDefinition.get_webPart();
    limitedWebPartManager.addWebPart(this._currentWebPart, '', 1);

    clientContext.load(this._currentWebPart);
    clientContext.load(this._webPartDefinition);

    clientContext.executeQueryAsync(
        Function.createDelegate(this, function (a, b) {
            dfd.resolve(
                clientContext,
                this._currentWebPart,
                this._webPartDefinition
            );
        }),
        function (request, failedEventArgs) {
            dfd.reject(failedEventArgs.get_message(), request, failedEventArgs);
        }
    );
    return dfd.promise();
};

FNSP.WebPart.AddWebpartFromGallery = function (category, name) {
    var findWebPart = function (webPartAdder, category, wpTitle) {
        if (webPartAdder) {
            var wpCategory = findByTitle(webPartAdder._cats, category);
            if (wpCategory) return findByTitle(wpCategory.items, wpTitle);
        }
    },
        findByTitle = function (list, title) {
            for (i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.title === title) return item;
            }
        };

    if (WPAdder) {
        console.log('WPAdder exists, adding directly');
        (webPart = findWebPart(WPAdder, category, name)),
            (zone = WPAdder._zones[0]),
            (wpid = WPAdder._createWebpartPlaceholderInRte()),
            (i = webPart.id),
            (e = WPAdder),
            (f = wpid);
        WPAdder.addItemToPageByItemIdAndZoneId(i, zone.id, 0, wpid);
    } else {
        console.log('WPAdder does not exist, loading...');
        LoadWPAdderOnDemand();
        ExecuteOrDelayUntilEventNotified(function () {
            var adder = window.WPAdder;
            (webPart = findWebPart(adder, category, name)),
                (zone = adder._zones[0]),
                (wpid = adder._createWebpartPlaceholderInRte()),
                (i = webPart.id),
                (e = WPAdder),
                (f = wpid);
            adder.addItemToPageByItemIdAndZoneId(i, zone.id, 0, wpid);
        }, '_spEventWebPartAdderReady');
    }
};

FNSP.EditMode.RegisterPageEvents = function (inputselector) {
    function inputChangedTrigger(selector, callback) {
        var input = $(selector);
        var oldvalue = input.val();
        setInterval(function () {
            if (input.val() !== oldvalue) {
                oldvalue = input.val();
                callback();
            }
        }, 1000);
    }
    inputChangedTrigger(inputselector, function () {
        FNSP.EditMode.CurrentFurlStatus(inputselector);
    });
    inputChangedTrigger("input[Title = 'Tittel']", function () {
        FNSP.EditMode.CurrentFurlStatus(inputselector);
    });
};

FNSP.CurrentFurlStatus = function () {
    var infoStringTemplate =
        "<span class='ms-status-status fnsp-custom-status' role='alert' tabindex='0'><span class='ms-status-iconSpan'><img class='ms-status-iconImg' src='/_layouts/15/images/spcommon.png'></span><span class='ms-bold ms-status-title'>{0}</span><span class='ms-status-body'>{1}</span><br></span>";
    $.ajax({
        type: 'GET',
        cache: false,
        url:
            _spPageContextInfo.webAbsoluteUrl +
            '/_layouts/15/fnsp/editmodehandler.ashx',
        data: {
            command: 'GetFurlStatus',
            currentPage: decodeURIComponent(
                _spPageContextInfo.serverRequestPath
            )
        },
        dataType: 'json',
        success: function (data) {
            $('#pageStatusBar').append(
                String.format(
                    infoStringTemplate,
                    'Beregnet vennlig url:',
                    data.Furl
                )
            );
            if (data.ErrorMessage && 0 !== data.ErrorMessage.length) {
                $('#pageStatusBar').append(
                    String.format(
                        infoStringTemplate,
                        'Status vennlig url:',
                        data.ErrorMessage
                    )
                );
            }
            //Disable saving, check-in, and publishing
            if (data.CriticalError) {
                $('#Ribbon\\.WikiPageTab-title>a')[0].click();
                $(
                    '#Ribbon\\.WikiPageTab\\.EditAndCheckout\\.SaveEdit-Large'
                ).hide();
                $(
                    '#Ribbon\\.WikiPageTab\\.EditAndCheckout\\.Checkout-Large'
                ).hide();
                $('#Ribbon\\.PublishTab-title').hide();
                $('#status_1_body>a').hide();
            }
            //Enable saving, check-in, and publishing
            else {
                $('#Ribbon\\.WikiPageTab-title>a')[0].click();
                $(
                    '#Ribbon\\.WikiPageTab\\.EditAndCheckout\\.SaveEdit-Large'
                ).show();
                $(
                    '#Ribbon\\.WikiPageTab\\.EditAndCheckout\\.Checkout-Large'
                ).show();
                $('#Ribbon\\.PublishTab-title').show();
                $('#status_1_body>a').show();
            }
        },
        failure: function (data) {
            console.log(data);
        }
    });
};

FNSP.EditMode.CurrentFurlStatus = function (inputselector) {
    var titleValue = $("input[Title = 'Tittel']").val();

    var placementValue = $(inputselector).val();
    if (placementValue.indexOf('|') > -1) {
        placementValue = placementValue.split('|')[1];
    }

    var infoStringTemplate =
        "<span class='ms-status-status fnsp-custom-status' role='alert' tabindex='0'><span class='ms-status-iconSpan'><img class='ms-status-iconImg' src='/_layouts/15/images/spcommon.png'></span><span class='ms-bold ms-status-title'>{0}</span><span class='ms-status-body'>{1}</span><br></span>";

    $.ajax({
        type: 'GET',
        cache: false,
        url:
            _spPageContextInfo.webAbsoluteUrl +
            '/_layouts/15/fnsp/editmodehandler.ashx',
        data: {
            command: 'GetFurlStatusEditMode',
            currentPage: decodeURIComponent(
                _spPageContextInfo.serverRequestPath
            ),
            newTitle: titleValue,
            newPlacement: placementValue
        },
        dataType: 'json',
        success: function (data) {
            $('.fnsp-custom-status').remove();
            $('#pageStatusBar').append(
                String.format(
                    infoStringTemplate,
                    'Beregnet vennlig url:',
                    data.Furl
                )
            );
            if (data.ErrorMessage && 0 !== data.ErrorMessage.length) {
                $('#pageStatusBar').append(
                    String.format(
                        infoStringTemplate,
                        'Status vennlig url:',
                        data.ErrorMessage
                    )
                );
            }
            //Disable saving, check-in, and publishing
            if (data.CriticalError) {
                $('#s4-ribbonrow').addClass('visuallyhidden');

                $('#status_1_body>a').hide();
            }
            //Enable saving, check-in, and publishing
            else {
                $('#s4-ribbonrow').removeClass('visuallyhidden');

                $('#status_1_body>a').show();
            }
        },
        failure: function (data) {
            console.log(data);
        }
    });
};

FNSP.EditMode.PublishingEndDateStatus = function () {
    var infoStringTemplate = "<span class='ms-status-status' role='alert' tabindex='0'><span class='ms-status-iconSpan'><img class='ms-status-iconImg' src='/_layouts/15/images/spcommon.png'></span><span class='ms-bold ms-status-title'>{0}</span><span class='ms-status-body'>{1}</span><br></span>";
    
    $.ajax({
        url:
            _spPageContextInfo.webAbsoluteUrl +
            "/_api/web/lists(guid'" + _spPageContextInfo.pageListId.replace('{','').replace('}','') + "')/items(" +
            _spPageContextInfo.pageItemId +
            ')?$select=Title,PublishingExpirationDate',
        type: 'GET',
        dataType: 'json',
        headers: {
            Accept: 'application/json;odata=verbose'
        }
    })
        .done(function (data) {
            var dateString = data.d.PublishingExpirationDate;
            var date = "Aldri";
            if(dateString && dateString.length > 0){
                var d = new Date(dateString);
                date = d.format("dd.MM.yyyy HH:mm");
            }
            
            $("#pageStatusBar").append(String.format(infoStringTemplate, "Avpubliseringsdato:", date));
        })
        .fail(function () {
            console.log('error');
        });
};

FNSP.EditMode.CheckItemLockedDown = function () {
    if (!_spPageContextInfo.webAbsoluteUrl) return;
    $.ajax({
        type: 'GET',
        cache: false,
        url:
            _spPageContextInfo.webAbsoluteUrl +
            '/_layouts/15/fnsp/editmodehandler.ashx',
        data: {
            command: 'CheckUniqeEditPermissionsOnPage',
            currentPage: decodeURIComponent(
                _spPageContextInfo.serverRequestPath
            )
        },
        dataType: 'text',
        success: function (data) {
            if (data === 'pageLockedForUser') {
                $('#ribbonBox').hide();
                $(
                    "<style type='text/css'> .ms-core-menu-link[title='Rediger side'],.ms-core-menu-link[title='Edit page'] { display: none; } </style>"
                ).appendTo('head');
                $('#globalNavBox').prepend(
                    "<div style='float:left;color:red;margin:7px 0 0 20px;font-size:10pt;'>Denne siden har unike redigeringstillatelser, du har ikke tilgang til å endre den.</div>"
                );
            }
        },
        failure: function (data) {
            console.log(data);
        }
    });
};

FNSP.EditMode.GeneratePreview = function (web, list, item) {
   
    if (!_spPageContextInfo.webAbsoluteUrl) {
         return;
    }
    var itemId = _spPageContextInfo.pageItemId;
    var listId = _spPageContextInfo.pageListId;
    if (!itemId || !listId) {
         return;
    }
    var $snapShotHtml = $('#s4-workspace').clone();
    $snapShotHtml.find('.m_status-panel').remove();
    var origin = location.origin;
    $snapShotHtml.find('a').each(function () {
        var href = $(this).attr('href');

        if (href) {
            if (href.indexOf(origin) > -1) {
                $(this).attr('href', href.replace(origin, ''));
            }
        }
    });   
    $.ajax({
        type: 'POST',
        cache: false,
        url:
            _spPageContextInfo.webAbsoluteUrl +
            '/_layouts/15/fnsp/editmodehandler.ashx',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            command: 'GeneratePagePreview',
            currentPage: itemId,
            currentList: listId,
            snapshotHtml: $snapShotHtml.html()
        },
        dataType: 'text',
        success: function (data) {

            FNSP.EditMode.GeneratePreviewDialog(data);
        },
        failure: function (data) {
            console.error(data);
        }
    });
};

FNSP.EditMode.DiffChecker = function (web, list, item) {    
    if (!_spPageContextInfo.webAbsoluteUrl) return;
    var itemId = _spPageContextInfo.pageItemId;
    var listId = _spPageContextInfo.pageListId;
    if (!itemId || !listId) return;   
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
        waitDialog =  SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
    });
    $.ajax({
            type: 'POST',
            cache: false,
            url:
                _spPageContextInfo.webAbsoluteUrl +
                '/_layouts/15/fnsp/editmodehandler.ashx',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                command: 'GetLastPublishedPageUrl',
                currentPage: itemId,
                currentList: listId,
              
            },
            dataType: 'text',
            success: function (data) { 
                var urlLastPublishedVersion = data.split("$")[0].toString();
                var urlCurrentDraft = data.split("$")[1].toString();                            
                $.when(FNSP.DiffChecker.getLastPublishedVersionHtml(urlLastPublishedVersion)).then(function(publishedPageHtml) {
                    $.when(FNSP.DiffChecker.getCurrentDraftHtml(urlCurrentDraft)).then(function(draftPageHtml) {
                        $.when(FNSP.DiffChecker.checkHtmlDiff(publishedPageHtml, draftPageHtml)).then(function (diffHtml) {
                            FNSP.EditMode.GenerateDiff(diffHtml);
                            waitDialog.close();                            
                        }, function error(error) {
                            waitDialog.close()  
                            alert(error)                          
                            console.error(error)
                        })
                    }, function error(error) {
                        waitDialog.close()
                        alert(error)
                        console.error(error)
                    })                    
                }, function error(error){                    
                    waitDialog.close()
                    alert(error)
                    console.error(error)            
                });
            },
            failure: function (data) {
                console.error(data);
                waitDialog.close();
            }
        });    
};
FNSP.EditMode.GenerateDiff = function (diffHtml) {    
    var itemId = _spPageContextInfo.pageItemId;
    var listId = _spPageContextInfo.pageListId;      
    $.ajax({
            type: 'POST',
            cache: false,
            url:
                _spPageContextInfo.webAbsoluteUrl +
                '/_layouts/15/fnsp/editmodehandler.ashx',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                command: 'GenerateDiff',
                currentPage: itemId,
                currentList: listId,
                snapshotHtml: diffHtml
                
            },
            dataType: 'text',
            success: function (data) {             
               FNSP.EditMode.GeneratePreviewDialog(data);
            },
            failure: function (data) {
                console.error(data);
            }
        });
};
FNSP.EditMode.GeneratePreviewDialog = function (link) {    
    var textarea = document.createElement('textarea');
    textarea.rows = '3';
    textarea.cols = '60';
    textarea.value = link;

    var options = {
        html: textarea,
        title: 'Lenke til forhåndsvisning',
        allowMaximize: false,
        showClose: true,
        width: 600,
        height: 100
    };
    SP.SOD.execute(
        'sp.ui.dialog.js',
        'SP.UI.ModalDialog.showModalDialog',
        options
    );
};
FNSP.EditMode.CallHandler = function (command) {
    SP.Ribbon.PageState.Handlers.showStateChangeDialog(
        command,
        SP.Ribbon.PageState.ImportedNativeData.CommandHandlers[command]
    );
};

FNSP.EditMode.RespondifyTable = function () {
    var rng = RTE.Cursor.get_range().$3_0;
    var $thisTable = $(rng).closest('table');
    $thisTable.css('height', '');
    var headers = [];
    var thead = $thisTable.find('thead');
    if (thead.length === 0) {
        thead = $('<thead></thead>').prependTo($thisTable);
    }
    $thisTable.find('tr').each(function (yindex) {
        if (yindex === 0) {
            $(this).addClass('headerRow'); //always hide first row when breaking
            $(this).find('th').each(function () {
                $(this).attr('scope', 'col');
                headers.push($(this).text());
            });
        }
        $(this).children().each(function (xindex) {
            if (yindex === 0) {
                $(this).replaceWith("<th scope='col'>" + $(this).html() + '</th>');
                headers.push($(this).text());
            } else {
                $(this).removeClass();
                var label = headers[xindex];
                if(label.trim().length) $(this).attr('data-label', headers[xindex]+":");
            }
        });
    });
    var headerRow = $thisTable.find('.headerRow');
    headerRow.detach().appendTo(thead);
};

FNSP.EditMode.CheckIfTableExists = function () {
    return $('table').filter('.ms-rteTable-default, .ms-rteTable-4').length > 0;
};

//What is this, I don't even
FNSP.EditMode.SetBeforeInResponsiveTable = function (newTable, tables) {
    var counter = 0;
    if (newTable) {
        tables = [];
    }

    $('table').filter('.ms-rteTable-default, .ms-rteTable-4').each(function () {
        var tableLength = $(this).html().length;

        if (tableLength !== tables[counter]) {
            tables[counter] = tableLength;

            var headers = [];
            $(this).find('tr').each(function (yindex) {
                $(this).children().each(function (xindex) {
                    if (yindex === 0) {
                        headers.push($(this).text());
                    } else {
                        $(this).removeClass();
                        var label = headers[xindex];
                        if(label.trim().length) $(this).attr('data-label', headers[xindex]+":");
                    }
                });
            });
        }

        counter++;
    });

    return tables;
};

if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

// To avoid automatic 5px margin on images when inserting them into rich text
if (typeof RTE !== 'undefined') {
    RTE.RteUtility.initImage = function RTE_RteUtility$initImage(image) {
        if (typeof RTE.RteUtility.$CN !== 'undefined') {
            RTE.RteUtility.$CN(image);
        }
    };
}
//Fix to set focus in first input and not in first rich text field only on first load of editmode
SP.SOD.executeFunc('sp.ui.rte.publishing.js', 'SP.ClientContext', function () {
    if (typeof RTE !== 'undefined' && typeof RTE.Canvas !== 'undefined') {
        RTE.Canvas.initialFocusOnRichText = function () {
            $('#s4-bodyContainer .ms-formfieldcontainer input')
                .first()
                .focus();
            return true;
        };
    }
});

//Script registrations
$(document).ready(function () {
    SP.SOD.executeFunc(
        'sp.js',
        'SP.ClientContext',
        FNSP.EditMode.CheckItemLockedDown
    );
    SP.SOD.registerSod(
        'taxonomypickercontrol.js',
        FNSP.CDN + '/js/taxonomypickercontrol.js?=' + FNSP.CDNV
    );
    SP.SOD.registerSod(
        'sp.taxonomy.js',
        _spPageContextInfo.siteAbsoluteUrl + '/_layouts/15/sp.taxonomy.js'
    );
    SP.SOD.registerSodDep('taxonomypickercontrol.js', 'sp.taxonomy.js');
    SP.SOD.registerSod(
        'FNSP.TreatmentLocation.Edit.js',
        FNSP.CDN + '/js/FNSP.TreatmentLocation.Edit.js?=' + FNSP.CDNV
    );
    SP.SOD.registerSodDep(
        'FNSP.TreatmentLocation.Edit.js',
        'taxonomypickercontrol.js'
    );
    SP.SOD.registerSod(
        'FNSP.PrimaryTreatment.Edit.js',
        FNSP.CDN + '/js/FNSP.PrimaryTreatment.Edit.js?=' + FNSP.CDNV
    );
    SP.SOD.registerSodDep(
        'FNSP.PrimaryTreatment.Edit.js',
        'taxonomypickercontrol.js'
    );
    SP.SOD.registerSod(
        'FNSP.LocationSpecificText.Edit.js',
        FNSP.CDN + '/js/FNSP.LocationSpecificText.Edit.js?=' + FNSP.CDNV
    );
    SP.SOD.registerSod(
        'vue.min.js',
        FNSP.CDN + '/js/vue.min.js?=' + FNSP.CDNV
    );
    SP.SOD.registerSodDep(
        'FNSP.TreatmentLocation.Edit.js',
        'vue.min.js'
    );
    SP.SOD.registerSod(
        'FNSP.ConfigurableCBS.Edit.js',
        FNSP.CDN + '/js/FNSP.ConfigurableCBS.Edit.js?=' + FNSP.CDNV
    );
    SP.SOD.registerSodDep(
        'FNSP.ConfigurableCBS.Edit.js',
        'vue.min.js'
    );
    SP.SOD.registerSodDep(
        'FNSP.ConfigurableCBS.Edit.js',
        'taxonomypickercontrol.js'
    );
    SP.SOD.notifyEventAndExecuteWaitingJobs('FNSPEditModeSODRegistered');
});

$(window).on('load', function () {
    //Fix menu button my settings in Chrome
    $menu = $('#suiteBar').find('#welcomeMenuBox');

    $menuItems = $menu.find('ie\\:menuitem');

    $menuItems.each(function () {
        $item = $(this);
        var onmenuclickAttr = $item
            .attr('onmenuclick')
            .replace('return false;', '');
        $item.attr('onmenuclick', onmenuclickAttr);
    });

    //Ensure table responsiveness
    var inDesignMode =
        document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
    if (inDesignMode === '1') {
        var TimerRuns = false;
        var tablesArray = [];

        if (typeof RTE !== 'undefined') {
            RTE.RichTextEditor.insertTable = function RTE_RichTextEditor$insertTable(
                options
            ) {
                RTE.SnapshotManager.takeSnapshot();
                RTE.TableCommands.insertTable(options);
                RTE.RteUtility.showRibbonTab('Ribbon.Table', 'TableLayoutTab');
                RTE.SnapshotManager.takeSnapshot();
                FNSP.EditMode.RespondifyTable();
                if (TimerRuns === false) {
                    setInterval(function () {
                        tablesArray = FNSP.EditMode.SetBeforeInResponsiveTable(
                            false,
                            tablesArray
                        );
                    }, 3000);
                } else {
                    tablesArray = FNSP.EditMode.SetBeforeInResponsiveTable(
                        true,
                        tablesArray
                    );
                }
            };
        }
        var tableExist = FNSP.EditMode.CheckIfTableExists();
        if (tableExist && TimerRuns === false) {
            setInterval(function () {
                tablesArray = FNSP.EditMode.SetBeforeInResponsiveTable(
                    false,
                    tablesArray
                );
            }, 3000);
        }
    }
});

// Give images without alt text border and warning
$(document).ready(function () {
    var inDesignMode =
        document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
    if (inDesignMode !== '1' && _spPageContextInfo.pageItemId) {
        $('.ms-rtestate-field img').each(function () {
            if (!$(this).attr('alt')) {
                $(this).css('border', '1px solid red');
                $(this).after(
                    "<div class='image-alt-warning-overlay'><h4><span>Dette bildet mangler alt-text</span></h4></div>"
                );
            }
        });

        $('.ms-rtestate-field table').each(function () {
            if ($(this).has('caption').length === 0) {
                $(this).prepend(
                    "<caption style='color:red'>Tabelltittel mangler.</caption>"
                );
            } else if (
                !$(this)
                    .find('caption')
                    .text()
                    .trim()
            ) {
                $(this).prepend(
                    "<caption style='color:red'>Tabelltittel mangler.</caption>"
                );
            }
        });
    }

    if (inDesignMode === '1') {
        setInterval(function () {
            var elements = $('.ms-rtestate-field img[class^=ms-rtePosition]');
            if (elements) {
                elements.each(function () {
                    if(!$(this).parent().is('figure')) {
                        $(this).wrap('<figure></figure>')
                    }
                    if ($(this).has('style')) {
                        var currentClass = $(this).attr('class');
                        console.log(
                            'Moving class ' +
                            currentClass +
                            ' on element ' +
                            $(this).attr('src')
                        );
                        $(this).attr('class', 'removed-ms-rtePosition');
                        $(this)
                            .closest('figure')
                            .removeClass()
                            .addClass(currentClass);
                    }
                });
            }
        }, 500);
    }
});

SP.SOD.executeFunc('datepicker.js', 'SP.ClientContext', function () {
    OnIframeLoadFinish = function () {
        OnIframeLoadFinishOverride();
    };
});

function OnIframeLoadFinishOverride() {
    if (!!window.chrome) {
        var picker;
        if (typeof this.Picker !== 'undefined') picker = this.Picker;
        if (
            picker != null &&
            typeof picker.readyState !== 'undefined' &&
            picker.readyState != null &&
            picker.readyState === 'complete'
        ) {
            document.body.scrollLeft = g_scrollLeft;
            document.body.scrollTop = g_scrollTop;
            g_scrollTop = document.getElementById('s4-workspace').scrollTop;
            picker.style.display = 'block';
            if (
                typeof document.frames !== 'undefined' &&
                Boolean(document.frames)
            ) {
                var frame = document.frames[picker.id];
                if (frame != null && typeof frame.focus === 'function')
                    frame.focus();
            } else {
                picker.focus();
            }
        }
        setTimeout(function () {
            document.getElementById('s4-workspace').scrollTop = g_scrollTop;
        }, 1);
    }
}

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('FNSP.Editmode.js');
