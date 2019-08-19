if (typeof FNSP === 'undefined') {
    FNSP = {};
}
if (typeof FNSP.Treatment === 'undefined') {
    FNSP.Treatment = {};
}
if (typeof FNSP.Treatment.Ribbon === 'undefined') {
    FNSP.Treatment.Ribbon = {};
}

(function() {
    var Ribbon = {
        _currentItem: null,
        _customRibbonEnabled: true,
        _needToLoadContentType: true,
        _validButtonConentTypes: [
            'Behandling',
            'Behandlingsprogram',
            'Artikkelside'
        ],
        _refreshCommandUI: function() {
            RefreshCommandUI();
        },
        addWebPart: function(webpartname) {
            FNSP.WebPart.AddWebpartFromGallery(
                '2. For sideinnholdsfelt',
                webpartname
            );
        },
        addAllWebParts: function() {
            if (
                IsFullNameDefined('SP.UI.ModalDialog.showWaitScreenWithNoClose')
            ) {
                SP.UI.ModalDialog.showWaitScreenWithNoClose(
                    SP.Res.genericLoading,
                    null,
                    null,
                    null
                );
            }
            __doPostBack('SharedContentLoader', '');
        },
        _updateRibbonStatus: function() {
            var cursor = RTE.Cursor.get_range(),
                htmlField = jQuery(cursor.$3_0).closest(
                    '[id$="RichHtmlField"]'
                ),
                contentType = this._currentItem.get_contentType().get_name();

            if (Array.contains(this._validButtonConentTypes, contentType)) {
                this._customRibbonEnabled =
                    htmlField.find('input[name*="Ingressfield"]').length +
                        htmlField.find('input[name*="MeetingPoint"]').length +
                        htmlField.find('input[name*="ContactInformation"]')
                            .length <=
                    0;
            } else {
                this._customRibbonEnabled = false;
            }
        },
        customRibbonEnabled: function() {
            if (this._needToLoadContentType) {
                var context = new SP.ClientContext(
                        _spPageContextInfo.webServerRelativeUrl
                    ),
                    list = context
                        .get_web()
                        .get_lists()
                        .getById(_spPageContextInfo.pageListId);

                this._currentItem = list.getItemById(
                    _spPageContextInfo.pageItemId
                );

                context.load(Ribbon._currentItem, 'ContentType');
                context.executeQueryAsync(
                    Function.createDelegate(this, this._refreshCommandUI)
                );
                this._needToLoadContentType = false;
            }
            this._updateRibbonStatus();
            return this._customRibbonEnabled;
        },
        locationSpecificTextEnabled: function() {
            var cursor = RTE.Cursor.get_range(),
                htmlField = jQuery(cursor.$3_0).closest(
                    '[id$="RichHtmlField"]'
                );
            RefreshCommandUI();
            return (
                htmlField.find('input[name*="MeetingPoint"]').length +
                    htmlField.find('input[name*="ContactInformation"]').length >
                    0 &&
                jQuery(cursor.$3_0).parents('.locationspecifictextedit')
                    .length === 0
            );
        }
    };

    FNSP.Treatment.Ribbon.addWebPart = Function.createDelegate(
        Ribbon,
        Ribbon.addWebPart
    );
    FNSP.Treatment.Ribbon.addAllWebParts = Function.createDelegate(
        Ribbon,
        Ribbon.addAllWebParts
    );
    FNSP.Treatment.Ribbon.customRibbonEnabled = Function.createDelegate(
        Ribbon,
        Ribbon.customRibbonEnabled
    );
    FNSP.Treatment.Ribbon.locationSpecificTextEnabled = Function.createDelegate(
        Ribbon,
        Ribbon.locationSpecificTextEnabled
    );
})();
