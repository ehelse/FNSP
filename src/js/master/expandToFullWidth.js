function expandToFullWidthElements() {
    var elementsToExpand = $(
        '.js-expand-to-full-width, .container .o_promoted-content, .container .o_horizontal-section, .container .o_primary-treatment:not(.three)'
    );

    if (elementsToExpand.length !== 0) {
        elementsToExpand.each(function() {
            var element = $(this);
            element.css('left', '0');
            var leftMargin = element.offset().left;
            var width = $('main').width();
            element.width(width);
            element.css('position', 'relative');
            element.css('left', -leftMargin + 'px');
        });
    }
}

window.expandToFullWidthElements = expandToFullWidthElements;
