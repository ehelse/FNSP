SP.SOD.executeOrDelayUntilScriptLoaded(function() {
    SP.SOD.executeOrDelayUntilScriptLoaded(function() {
        var ctx = SP.ClientContext.get_current();
        var site = ctx.get_site();
        ctx.load(site);

        ctx.executeQueryAsync(
            Function.createDelegate(this, function(sender, args) {
                var pageComponentScriptUrl = SP.Utilities.UrlBuilder.urlCombine(
                    FNSP.CDN,
                    'js/FNSP.CustomActions.PageComponent.js?=' + FNSP.CDNV
                );
                SP.SOD.registerSod(
                    'FNSP.CustomActions.PageComponent.js',
                    pageComponentScriptUrl
                );
                SP.SOD.execute(
                    'FNSP.CustomActions.PageComponent.js',
                    'FNSP.CustomActions.PageComponent.initialize'
                );
            })
        );
    }, 'cui.js');
}, 'sp.js');
