FNSP.Current.LocationSpecifixTextWebPart = function() {
    return {
        init: function(webpartId) {
            var lspwp = this;
            lspwp.unselectableFixed = false;
            var $currentWebPart = $(
                "div[id*='" + webpartId + "'] .location-specific-text-editpanel"
            )
                .parent()
                .parent();
            var webpartIdAttribute = $currentWebPart.attr('webpartid');
            $currentWebPart
                .find('.LocationSpecificTextSave')
                .on('click', function(event) {
                    event.preventDefault();
                    lspwp.saveProperties($currentWebPart, webpartIdAttribute);
                });
            //this.initializeTaxPicker($currentWebPart, departmentTermSet, terms);
        },
        initializeTaxPicker: function(webpart, termsetId, existingTerms) {
            var initialValues = [];
            if (existingTerms && existingTerms.indexOf('|') > -1) {
                existingTerms.split(';').forEach(function(element) {
                    if (element.indexOf('|') > -1) {
                        initialValues.push(element.split('|')[0]);
                    }
                });
            }
            var context = new SP.ClientContext();
            webpart.find('.taxpicker-location-specific-text').taxpicker(
                {
                    isMulti: true,
                    allowFillIn: false,
                    termSetId: termsetId,
                    useContainsSuggestions: true,
                    initialLabels: initialValues
                },
                context,
                function() {}
            );
        },
        saveProperties: function($webpart, webpartId) {
            console.log('Save ' + webpartId);
            $webpart.find('#UpdateSuccess').hide();
            $webpart.find('#UpdateFail').hide();
            var locationValues = $webpart.find("input[type='hidden']").val();
            if (!locationValues || locationValues === '') {
                $webpart
                    .find('#UpdateFail')
                    .text('⛌ Ingen gyldige steder er valgt');
                $webpart.find('#UpdateFail').show();
                return;
            }
            var foundError = false;

            var selectedValues = locationValues.split(';');

            selectedValues.forEach(function(element) {
                var locationParts = element.split('|');
                if (
                    locationParts.length < 2 ||
                    locationParts[1].indexOf('00000000') > -1
                ) {
                    $webpart
                        .find('#UpdateFail')
                        .text('⛌ Ugyldige steder er valgt');
                    $webpart.find('#UpdateFail').show();
                    foundError = true;
                }
            });

            if (foundError) return;

            FNSP.WebPart.saveWebPartProperties(webpartId, {
                LocationId: selectedValues.join(';')
            })
                .done(function() {
                    $webpart.find('#UpdateSuccess').show('slow');
                })
                .fail(function() {
                    $webpart
                        .find('#UpdateFail')
                        .text('⛌ Webdelen ble ikke oppdatert');
                    $webpart.find('#UpdateFail').show('slow');
                });
        }
    };
};

(function($) {
    $.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    };
})(jQuery);
