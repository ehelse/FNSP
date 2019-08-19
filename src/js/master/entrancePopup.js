function entrancePopup() {

    var popup = $('.js-entrance-popup');

    if (popup.length !== 0) {

        // Hide non-popup content from screen readers
        // Make sure this content doesn't scroll
        var elementsToFreeze = $('.js-entrance-popup-background');

        elementsToFreeze.addClass('overlay-background').attr('aria-hidden', 'true');

        // Set focus to the first element inside the popup
        popup.find('.js-entrance-popup-description').attr('tabindex', '-1').focus();

        // Trap the focus inside the popup
        var tabbableElements = popup.find('a, button:not([disabled])');

        tabbableElements.last().on('keydown', function (event) {
            if (event.keyCode === 9 && !event.shiftKey) {
                event.preventDefault();
                console.log('tab on last element');
                console.log(tabbableElements.first());

                tabbableElements.first().focus();
            }
        });

        tabbableElements.first().on('keydown', function (event) {
            if (event.keyCode === 9 && event.shiftKey) {
                event.preventDefault();
                console.log('shift tab on first element');
                tabbableElements.last().focus();
            }
        });

        // When the choice for professionals is clicked
        $('.js-entrance-popup-close').on('click', function () {

            // Set the cookie
            var expireDate = new Date();
            expireDate.setDate(new Date().getDate() + 30);
            document.cookie = 'FNSP.HidePopup=true; expires=' + expireDate.toUTCString() + '; path=/';


            // Close the popup and remove it from the DOM
            popup.fadeOut(300);
            setTimeout(function () {
                // Make the main content interactive again
                elementsToFreeze.removeClass('overlay-background').removeAttr('aria-hidden');

                popup.remove();
            }, 300);

        });
    }
}

window.entrancePopup = entrancePopup;