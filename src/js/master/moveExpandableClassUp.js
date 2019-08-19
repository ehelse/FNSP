// #moveExpandableClassUp
// Handles situations in which a web part that's a horizontal section is not
// a direct child of main.  These should be fixed in SP!
function moveExpandableClassUp() {
    // get responsive sections that are not a child of main and not a child of a responsive section

    var responsiveExpandableSectionToMove = $('main .js-responsive-expand')
        .not('.js-responsive-expand .js-responsive-expand')
        .not('main > .js-responsive-expand')
        .not('.searchblock');

    responsiveExpandableSectionToMove.each(function() {
        // $(this).removeClass("o_horizontal-section js-responsive-expand collapsed");
        // $(this).closest("main > *").addClass("o_horizontal-section js-responsive-expand");

        $(this).addClass('moveExpandableClassUp');
    });
}

window.moveExpandableClassUp = moveExpandableClassUp;
