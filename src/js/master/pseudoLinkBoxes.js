// For components where we have to make something act like a link when it actually isn't

function pseudoLinkBoxes() {

    var pseudoLinkBoxes = $('.js-pseudo-link-box');

    if (!inDesignMode() && pseudoLinkBoxes.length !== 0) {

        pseudoLinkBoxes.each(function () {

            var linkBox = $(this),
                link = linkBox.find('a, button').first(),
                pseudoLink = linkBox.find('.js-pseudo-link').addBack('.js-pseudo-link'),
                hoverElements = link.add(pseudoLink);

            hoverElements.each(function () {


                hoverElements.addClass('pseudo-link');

                hoverElements.on('mouseenter', function () {
                    hoverElements.addClass('hover');
                });

                hoverElements.on('mouseleave', function () {
                    hoverElements.removeClass('hover');
                });
            });

            link.on('click', function (event) {
                if (link.is('button')) {
                    event.stopPropagation();
                }
            });

            pseudoLink.on('click', function (event) {
                console.log(pseudoLink);
                event.preventDefault();
                event.stopPropagation();

                if (link.is('a')) {
                    window.location = linkBox.find('.js-pseudo-link-source').attr('href');
                } else if (link.is('button')) {
                    console.log(link);
                    link.click();
                }
            });
        });
    }
}

window.pseudoLinkBoxes = pseudoLinkBoxes;