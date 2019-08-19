function equalHeightChildren() {
    var parents = $('.js-equal-height-children');

    // If there are equal height blocks
    if (parents.length) {
        // If the layout is only one column
        if (layoutQ().number[0] === 1) {
            // Remove the set height attribute of the equalized blocks.
            parents.children().removeAttr('style');
        } else {
            // The layout is not one column.  Set equal height.
            parents.each(function() {
                var children = $(this).children(),
                    row = [],
                    cur_top = 0;

                // Remove the previous style
                children.removeAttr('style');

                children.each(function() {
                    if ($(this).offset().top === cur_top) {
                        row.push($(this));
                    } else {
                        setEqualHeight(row);
                        row = [$(this)];
                        cur_top = $(this).offset().top;
                    }
                });
            });
        }
    }
}

var getMaxHeight = function(elements) {
    var maxHeight = 0;
    elements.forEach(function(e) {
        maxHeight = Math.max(e.height(), maxHeight);
    });
    return maxHeight;
};

var setEqualHeight = function(elements) {
    if (elements.length === 0) return;
    var maxHeight = getMaxHeight(elements);
    elements.forEach(function(e) {
        e.height(maxHeight);
    });
};

window.equalHeightChildren = equalHeightChildren;
