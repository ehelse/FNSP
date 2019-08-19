// #editorControlledExpandingSections =========================
// Converts the layout of editor-controlled expandable sections into
// the accordion markup so it gets the proper style.
function editorControlledExpandingSections() {
    if (!inDesignMode()) {
        $('.stop-expandable').hide();
        //Fix selector to not include already set up expanders in preview html (not('.js-expander'))
        var expanderHeadings = $('.ms-rteElement-expandable, .ms-rteElement-H1B, .ms-rteElement-H2B, .ms-rteElement-H3B').not('.js-expander');
        if (expanderHeadings.length) {

            expanderHeadings.each(function () {
                var heading = $(this),
                    content = heading.nextUntil('.stop-expandable, h1, h2, h3'),
                    expandSection,
                    expandableContent;

                // Create the expanding section.
                heading.before('<section class="js-expand m_subtle-expander">');
                expandSection = heading.prev();

                // Create the expandable content block.
                heading.after(
                    '<div class="js-expandable" tabindex="-1"></div></div>'
                );
                expandableContent = heading.next();

                // Place the content inside the expandable content block.
                expandableContent.append(content);

                // Place the expander and the expandable content inside the expanding section.
                expandSection.prepend(heading);
                expandSection.append(expandableContent);

                // Adapt the heading markup to make it an expander.
                heading.addClass('js-expander');
                heading.wrapInner('<span class="item-title"></span>');

            });
        }
    }

}

window.editorControlledExpandingSections = editorControlledExpandingSections;