// #sortExpandableSections
// If content isn't in an expandable section, move it into the nearest expandable section

function sortExpandableSections() {
    if (!inDesignMode()) {
        var firstLevelExpandSections = $('main .js-responsive-expander')
                .not('.js-responsive-expandable .js-responsive-expander')
                .closest('.js-responsive-expand')
                .closest('main > *'),
            nonExpandSections = firstLevelExpandSections
                .first()
                .nextAll()
                .not(firstLevelExpandSections)
                .not($('footer'))
                .not('.o_promoted-content');

        nonExpandSections.each(function() {
            var orphanSection = $(this),
                closestExpandSection = orphanSection
                    .prevAll()
                    .filter(firstLevelExpandSections)
                    .first(),
                closestExpandableSection = closestExpandSection.find(
                    '.js-responsive-expandable'
                );

            if ($.inArray(closestExpandableSection, nonExpandSections)) {
                var contentToMove = orphanSection.find(
                    '.js-responsive-expandable > .container'
                );
                if (contentToMove.length > 0) {
                    closestExpandableSection.append(contentToMove);
                    contentToMove.addClass('sortExpandableSections');
                    orphanSection.remove();
                }
            }
        });
    }
}

window.sortExpandableSections = sortExpandableSections;
