// #expandableBlocks =======================================
// Adds collapsing/expanding functionality to non-responsive expandable blocks.
function expandableBlocks() {
    var expandableBlocks = $('.js-expand').getExpandableBlocks();

    expandableBlocks.addExpandability();

    expandableBlocks.expandBlockFromHash();
}

window.expandableBlocks = expandableBlocks;

function elementExpand(elementQuery) {
    $("[name='" + elementQuery + "']")
        .removeClass('collapsed')
        .addClass('expanded');
    if ($("[name='" + elementQuery + "'] .js-responsive-expander")) {
        if (
            $("[name='" + elementQuery + "'] .js-responsive-expander").attr(
                'aria-expanded'
            ) === 'false'
        ) {
            $("[name='" + elementQuery + "'] .js-responsive-expander").attr(
                'aria-expanded',
                'true'
            );
        }
    }
}

window.elementExpand = elementExpand;
