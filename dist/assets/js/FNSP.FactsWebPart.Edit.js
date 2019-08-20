FNSP.Current.FactsWebPart = {
    editButtonClicked: function(e){
        e.preventDefault();
        var $sourceButton = $(e.srcElement);
        FNSP.Current.FactsWebPart.init($sourceButton);
        $sourceButton.siblings('.settings-panel').show();
        $sourceButton.toggle();
    },

    init: function($button) {
        var fwp = this;
        var webpartId = $button
            .parent()
            .parent()
            .attr('webpartid');
        var $currentWebPart = $("div[webpartid='" + webpartId + "']");
        $currentWebPart.find("input[name='source']").change(function() {
            fwp.radiobuttonSelected(this, $currentWebPart);
        });
        $currentWebPart.find('#factboxheading').keydown(function(e) {
            e.stopPropagation();
        });
        FNSP.WebPart.getWebPartProperties(webpartId).done(function(
            webPartProperties,
            webPartDef,
            clientContext
        ) {
            var listItemId = webPartProperties.get_item('FactsListItemId');
            var heading = webPartProperties.get_item('Heading');
            var showContentFromList = webPartProperties.get_item(
                'ShowContentFromList'
            );

            fwp.getFactListItems($currentWebPart).done(function(value) {
                $currentWebPart
                    .find('#FactsWebPartSave')
                    .on('click', function(event) {
                        event.preventDefault();
                        fwp.saveFactBoxProperties($currentWebPart, webpartId);
                    });
                $currentWebPart.find('#dropdownlistitems').val(listItemId);
                $currentWebPart.find('#dropdownlistitems').change(function() {
                    fwp.getFactListItem($currentWebPart, $(this).val());
                });
            });

            if (showContentFromList) {
                if (listItemId) {
                    fwp.getFactListItem($currentWebPart, listItemId);
                }
                $currentWebPart
                    .find("#choose-source input[value='fromlist']")
                    .prop('checked', true);
                $currentWebPart.find('.settings-panel-listcontrol').show();
                $currentWebPart.find('.label-listcontrol').show();

                $currentWebPart.find('.input-rtefield').hide();
                $currentWebPart.find('.label-rtefield').hide();

                $currentWebPart.find('#factboxheading').prop('disabled', true);
            } else {
                $currentWebPart
                    .find("#choose-source input[value='fromeditor']")
                    .prop('checked', true);
                $currentWebPart.find('.label-listcontrol').hide();
                $currentWebPart
                    .find('.settings-panel-listcontrol')
                    .hide('100', function() {
                        $currentWebPart.find('#factboxheading').val(heading);
                        setTimeout(function() {
                            $currentWebPart.find('#factboxheading').focus();
                        }, 2000);
                    });
            }
        });
    },
    radiobuttonSelected: function(element, $webpart) {
        var radioValue = $(element).val();
        $('#UpdateSuccess').hide();
        if ($(element).is(':checked') && radioValue === 'fromlist') {
            $webpart.find('#factboxheading').prop('disabled', true);
            $webpart.find('.settings-panel-listcontrol').show();
            $webpart.find('..label-listcontrol').show();
            $webpart.find('.input-rtefield').hide();
            $webpart.find('.label-rtefield').hide();
        } else {
            $webpart.find('.input-rtefield').show();
            $webpart.find('.label-rtefield').show();
            $webpart.find('#factboxheading').prop('disabled', false);
            $webpart.find('.settings-panel-listcontrol').hide();
            $webpart.find('.label-listcontrol').hide();
        }
    },
    getFactListItems: function($webpart) {
        var dfd = $.Deferred();
        $.ajax({
            url:
                _spPageContextInfo.siteAbsoluteUrl +
                "/_api/web/lists/getbytitle('Faktaboksinnhold')/items?$select=ID,Title",
            type: 'GET',
            dataType: 'json',
            headers: {
                Accept: 'application/json;odata=verbose'
            }
        })
            .done(function(data) {
                $.each(data.d.results, function(i, item) {
                    $webpart.find('#dropdownlistitems').append(
                        $('<option>', {
                            value: item.Id,
                            text: item.Title
                        })
                    );
                });
                dfd.resolve('success');
            })
            .fail(function() {
                console.log('error');
                dfd.reject('Failed to get factbox items');
            });
        return dfd.promise();
    },
    getFactListItem: function($webpart, itemId) {
        if (itemId === -1) {
            $webpart
                .find('#listcontentpreview')
                .html('<p>Velg et element fra nedtrekkslista</p>');
            $webpart.find('#factboxheading').val('');
            return;
        }

        $.ajax({
            url:
                _spPageContextInfo.siteAbsoluteUrl +
                "/_api/web/lists/getbytitle('Faktaboksinnhold')/items(" +
                itemId +
                ')?$select=Title,FNSPFactBoxContent',
            type: 'GET',
            dataType: 'json',
            headers: {
                Accept: 'application/json;odata=verbose'
            }
        })
            .done(function(data) {
                $webpart
                    .find('#listcontentpreview')
                    .html(data.d.FNSPFactBoxContent);
                $webpart.find('#factboxheading').val(data.d.Title);
            })
            .fail(function() {
                console.log('error');
            });
    },
    saveFactBoxProperties: function($webpart, webpartId) {
        $webpart.find('#UpdateSuccess').hide();
        $webpart.find('#UpdateFail').hide();
        FNSP.WebPart.saveWebPartProperties(webpartId, {
            Heading: $webpart.find('#factboxheading').val(),
            FactsListItemId: $webpart.find('#dropdownlistitems').val(),
            ShowContentFromList: $webpart
                .find("#choose-source input[value='fromlist']")
                .is(':checked')
        })
            .done(function() {
                $webpart.find('#UpdateSuccess').show('slow');
            })
            .fail(function() {
                $webpart.find('#UpdateFail').show('slow');
            });
    }
};

