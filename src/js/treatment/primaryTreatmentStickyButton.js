function primaryTreatmentStickyButton() {
    var debouncedEventHandler = debounce(function() {
        var pt = $('.o_primary-treatment.expanded');
        
        if (pt && pt.length !== 0) {
            var scrollBottom = $(window).scrollTop() + $(window).height();
            var currentDistance = $(document).scrollTop();
            pt.each(function() {
                var currentElement = $(this);
                var stickyNav = currentElement.find('.js-sticky-expander-nav');

                if (!currentElement.isInViewPort() && stickyNav.hasClass('relative')) {
                    return;
                }
                else {
                    var expandable = currentElement.find('.js-expandable');
                    var elementTop = currentElement.offset().top;
                    var containerHeight = parseInt(expandable.height())+parseInt(elementTop);

                    var toTopButton = stickyNav.find('.scroll-exp');
                    toTopButton.off('click.primaryTreatmentStickyButton');
                    toTopButton.on('click.primaryTreatmentStickyButton', function() {
                        $('html, body').animate({
                            scrollTop: currentElement.find('.js-scrolltoexp').offset().top - 80
                        });
                    });

                    

                    if (currentDistance > elementTop+20 && scrollBottom < containerHeight) {
                        stickyNav.addClass('sticky').removeClass('relative');
                    }
                    else  {
                        stickyNav.addClass('relative').removeClass('sticky')
                    }
                }
            });
        }
    }, 50);

    var navbar = $('.js-sticky-expander-nav');
    if (navbar.length !== 0) {
        $(document).on('scroll.primaryTreatmentStickyButton', debouncedEventHandler);
    } else {
        $(document).off('primaryTreatmentStickyButton');
    }
}

$.fn.isInViewPort = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

window.primaryTreatmentStickyButton = primaryTreatmentStickyButton;