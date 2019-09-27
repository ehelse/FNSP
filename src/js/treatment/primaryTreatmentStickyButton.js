function primaryTreatmentStickyButton() {
    var debouncedEventHandler = debounce(function() {
        var pt = $('.o_primary-treatment.expanded');
        if (pt && pt.length !== 0) {
            var stickyNav = pt.find('.js-sticky-expander-nav');
            var toTopButton = stickyNav.find('.scroll-exp');
            toTopButton.off('click.primaryTreatmentStickyButton');
            toTopButton.on('click.primaryTreatmentStickyButton', function() {
                $('html, body').animate({
                    scrollTop: pt.find('.js-scrolltoexp').offset().top - 80
                })
            })
            var scrollBottom = $(window).scrollTop() + $(window).height();
            var expandable = pt.find('.js-expandable');
            var currentDistance = $(document).scrollTop();
            var containerHeight = parseInt(expandable.height())+parseInt(pt.offset().top);
            if (currentDistance > pt.offset().top+20 && scrollBottom < containerHeight) {
                if (!stickyNav.hasClass('placedtop')) {
                    stickyNav.addClass('placedtop').removeClass('placedbottom closebutton');
                }
            }
            else  {
                if (!stickyNav.hasClass('placedbottom')) {
                    stickyNav.addClass('placedbottom').removeClass('placedtop closebutton')
                }
            }
        }
    }, 50);

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

    var navbar = $('.js-sticky-expander-nav');
    if (navbar.length !== 0) {
        $(document).on('scroll.primaryTreatmentStickyButton', debouncedEventHandler);
    } else {
        $(document).off('primaryTreatmentStickyButton');
    }
    
}

window.primaryTreatmentStickyButton = primaryTreatmentStickyButton;