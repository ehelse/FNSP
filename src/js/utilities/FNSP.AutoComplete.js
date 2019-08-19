/*
 * Loades the script for https://jqueryui.com/autocomplete/ and
 * gets suggestions webservice at /_vti_bin/FNSP/JsonRpc.svc/Call
 */

if (typeof FNSP === 'undefined') {
    FNSP = {};
}

FNSP.autoSuggest = (function() {
    var inputFields = {},
        scripLoaded = false,
        setup = function(element, suggestions) {
            var id = $(element).attr('id');
            inputFields[id].suggestions = suggestions;

            var autoSuggestions = [];
            $.each(suggestions, function(i, e) {
                autoSuggestions.push(e.label);
            });
            $('#' + id)
                .autocomplete({
                    source: autoSuggestions,
                    delay: 0,
                    position: {
                        my: 'right top',
                        at: 'right bottom + 100'
                    },
                    open: function() {
                        $('#' + id).addClass('jss-autocomplete-open');
                    },
                    close: function() {
                        $('#' + id).removeClass('jss-autocomplete-open');
                    },
                    focus: function(event, ui) {
                        //Iphone and Ipod fix
                        var useragent = navigator.userAgent.toLowerCase();
                        if (
                            useragent.indexOf('iphone') !== -1 ||
                            useragent.indexOf('ipod') !== -1
                        ) {
                            setTimeout(function() {
                                search(id, event);
                            }, 50);
                        }
                    },
                    select: function(event, ui) {
                        search(id, event);
                    }
                })
                .data('ui-autocomplete')._renderItem = function(ul, item) {
                var orgLbl = item.label,
                    t = item.label.replace(
                        RegExp(this.term, 'ig'),
                        '<strong>' + this.term + '</strong>'
                    );
                return $('<li data-value="' + orgLbl + '">')
                    .append('<span>' + t + '</span>')
                    .appendTo(ul);
            };

            /*
                 * Chages the input box to used use FNSP.autoComplete.search to handle 
                 * events.
                 */
            $('#' + id).focus();
            $('#' + id).removeAttr('onclick');
            $('#' + id).keypress(function() {
                FNSP.autoSuggest.search(id, event);
            });
            $('#' + inputFields[id].buttonId).attr(
                'onclick',
                'FNSP.autoSuggest.search("' + id + '", event);return false;'
            );
        },
        loadSuggestions = function(element) {
            var serviceUri =
                _spPageContextInfo.webAbsoluteUrl +
                '/_vti_bin/FNSP/JsonRpc.svc/Call';
            var id = $(element).attr('id');
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: serviceUri,
                dataType: 'json',
                data: JSON.stringify({
                    method: 'autosuggest',
                    id: 1,
                    params: [inputFields[id].querykey]
                }),
                success: function(response) {
                    if (!response.error) {
                        if (!scripLoaded) {
                            SP.SOD.executeFunc('jquery-ui', null, function() {
                                scripLoaded = true;
                                setup(element, JSON.parse(response.result));
                            });
                        } else {
                            setup(element, JSON.parse(response.result));
                        }
                    }
                },
                error: function(jqXHR, txtStatus, errorThrown) {
                    console.log(txtStatus + ' - ' + errorThrown);
                }
            });
        },
        registerAutoSuggest = function(inputId, buttonId, querykey) {
            RegisterSod(
                'jquery-ui',
                FNSP.CDN + '/js/jquery/jquery-ui-cust.min.js?v=' + FNSP.CDNV
            );
            var btn = $('#' + buttonId);
            if (btn) {
                var expr = btn.attr('onclick');
                if (expr) {
                    expr = expr.replace("?k'", "?k='");
                    btn.attr(
                        'onclick',
                        expr.replace("$get(' ", "$get('").replace()
                    );
                }
            }

            inputFields[inputId] = {
                querykey: querykey,
                suggestions: '',
                searchtarget: $('#' + inputId).attr('onkeypress'),
                buttonId: buttonId,
                buttonEvent: $('#' + buttonId).attr('onclick')
            };

            //Register load event
            $('#' + inputId).attr(
                'onclick',
                'FNSP.autoSuggest.loadSuggestions(this);return false;'
            );
        },
        search = function(elementId, event) {
            var value,
                exactMatch = false;
            if (event.type === 'keypress' && event.keyCode !== 13) {
                return false;
            } else if (
                event.type === 'autocompleteselect' ||
                event.type === 'autocompletefocus'
            ) {
                var valueElement = $('.ui-state-active');
                if (valueElement && valueElement.length > 0) {
                    value = valueElement[0].parentElement.dataset.value;
                }
            } else {
                value = $('#' + elementId)[0].value;
            }

            $.each(inputFields[elementId].suggestions, function(index, item) {
                if (item.label === value) {
                    exactMatch = true;
                    window.location = item.path;
                }
            });
            if (!exactMatch) {
                var buttonId = inputFields[elementId].buttonId;
                $('#' + buttonId).attr(
                    'onclick',
                    inputFields[elementId].buttonEvent
                );
                $('#' + buttonId).click();
            }
        };

    return {
        loadSuggestions: loadSuggestions,
        registerAutoSuggest: registerAutoSuggest,
        search: search
    };
})();
