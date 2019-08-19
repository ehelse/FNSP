function resizeIframe() {
    var iframes = initResponsiveIframes();

    function initResponsiveIframes() {
        iframes = $(
            "iframe[src*='vimeo'], iframe[src*='youtu'], .js-responsive-iframe"
        );

        iframes.each(function() {
            if (!$(this).attr('data-AR')) {
                var dataAR = $(this).innerHeight() / $(this).innerWidth();

                $(this)
                    .attr('allowfullscreen', '')
                    .attr('height', '')
                    .attr('data-AR', dataAR)
                    .attr({ width: '100%', frameborder: 'no' });

                $(this)
                    .closest('.ms-rte-embedil')
                    .css('display', 'block');
                $(this)
                    .closest('.ms-webpart-zone')
                    .css('display', 'block');
            }
        });

        responsiveIframes(iframes);

        return iframes;
    }

    function responsiveIframes(iframes) {
        iframes.each(function() {
            var newHeight = Math.round(
                $(this).width() * $(this).attr('data-AR')
            );

            $(this).attr({
                height: newHeight
            });
        });
    }
}

window.resizeIframe = resizeIframe;
