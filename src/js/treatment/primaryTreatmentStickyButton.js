function primaryTreatmentStickyButton() {
    var debouncedEventHandler = debounce(function() {
        var treatmentExpander = $('.o_primary-treatment.expanded');
        
        if (treatmentExpander && treatmentExpander.length !== 0) {
            var scrollBottom = $(window).scrollTop() + $(window).height();
            var currentDistance = $(document).scrollTop();
            treatmentExpander.each(function() {
                var currentElement = $(this);
                var stickyNav = currentElement.find('.js-sticky-treatment-nav');

                if (!currentElement.isInViewPort() && stickyNav.hasClass('relative')) {
                    return;
                }
                else {
                    var expandable = currentElement.find('.js-expandable');
                    var elementTop = currentElement.offset().top;
                    var containerHeight = parseInt(expandable.height())+parseInt(elementTop);

                    var toTopButton = stickyNav.find('.scroll-expander-top');
                    toTopButton.off('click.primaryTreatmentStickyButton');
                    toTopButton.on('click.primaryTreatmentStickyButton', function() {
                        $('html, body').animate({
                            scrollTop: currentElement.find('.js-scrolltoexp').offset().top - 175
                        });
                    });

                    
                    if (currentDistance > elementTop+20 && scrollBottom < containerHeight-100) {
                        if (currentElement.find('.js-sb-filler').length === 0) {
                            stickyNav.before('<div class="js-sb-filler" style="height: ' + stickyNav.height() + 'px; margin: 2rem 0;" ></div>').prev();
                        }
                        stickyNav.addClass('sticky').removeClass('relative');
                    }
                    else  {
                        $('.js-sb-filler').remove();
                        stickyNav.addClass('relative').removeClass('sticky')
                    }
                }
            });
        }
    }, 0);

    var navbar = $('.js-sticky-treatment-nav');
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