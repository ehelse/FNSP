// #removeZeroHeightSections
// Checks the height of expandable sections and adds
// a class to nix the margin if so.
function removeZeroHeightSections() {
    var firstLevelHorizontalSections = $('main .o_horizontal-section');

    firstLevelHorizontalSections.each(function() {
        if ($(this).innerHeight() === 0) {
            $(this).addClass('zeroHeightHorizontalSection');
            $(this).addClass('empty');
        }
    });
}

window.removeZeroHeightSections = removeZeroHeightSections;
