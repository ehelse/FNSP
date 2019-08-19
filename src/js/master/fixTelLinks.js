// #fixtellinks =====================================================
// Strips http:// to give editors support for tel:-links in RTE
function fixtellinks() {
    if (!inDesignMode()) {
        $('main .ms-rtestate-field a').each(function() {
            var thisTarget = $(this).attr('href');
            if (thisTarget && thisTarget.startsWith('http://tel:'))
            {
                var hrefLink = thisTarget.split('http://')[1];
                // Sometimes SP adds a / in the end
                if (hrefLink.match('/$')) {
                    hrefLink = hrefLink.substring(0, hrefLink.length - 1);
                }
                $(this).attr('href', hrefLink);
            }
        });
    }
}

window.fixtellinks = fixtellinks;
