// #allowFullscreenIframe ================================================
//Fix for allowfullscreen attribute that SP strips away from YouTube links
function allowFullscreenIframe() {
    if (!inDesignMode()) {
        $("main iframe[src*='youtube.com']").each(function() {
            if (!$(this).attr('allowfullscreen'))
                $(this).attr('allowfullscreen', 'allowfullscreen');
        });
    }
}

window.allowFullscreenIframe = allowFullscreenIframe;
