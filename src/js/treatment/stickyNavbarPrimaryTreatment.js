function stickyNavbarPrimaryTreatment() {
    // var navbar = $('.js-sticky-expander-nav');
    // console.log('navbar length: ', navbar.length);
    // console.log('navbar visible: ', navbar.is(':visible'));
    // if (navbar.length !== 0 && navbar.is(':visible')) {
    //     console.log('visible found nav')

    //     function t(t) {
    //         t.stickyNavbar({
    //             activeClass: 'current',
    //             sectionSelector: 'js-scrolltoexp',
    //             animDuration: 250,
    //             startAt: $('.js-scrolltoexp').offset().top,
    //             easing: 'linear',
    //             jqueryEffects: !1,
    //             jqueryAnim: 'slideDown',
    //             selector: 'a',
    //             mobile: !0,
    //             mobileWidth: 480,
    //             zindex: 9999,
    //             stickyModeClass: 'stickyexp',
    //             unstickyModeClass: 'js-unstickyexp',
    //             navOffset: 100
    //         });
    //     }

    //     function n() {
    //         $('html, body').animate($('.js-scrolltoexp').offset().top-100, 'fast');
    //     }

    //     t(navbar);
    //         // $('.scroll-exp').click(this, function () {
    //         //     n();
    //         // });

    // }
    var navbar = $('.js-sticky-expander-nav');
    if (navbar.length !== 0) {

        $(document).on('scroll.stickyNavbarScroll', function() {
            var pt = $('.o_primary-treatment.expanded');
            if (pt && pt.length !== 0) {
                var stickyNav = pt.find('.js-sticky-expander-nav');
                var toTopButton = stickyNav.find('.scroll-exp');
                toTopButton.attr('href', '#'+pt.find('.js-expander[data-title]').attr('data-title'));
                toTopButton.off('click.stickyNavbarScroll');
                toTopButton.on('click.stickyNavbarScroll', function() {
                    // console.log('scrolltoexp top: ', pt.find('.js-scrolltoexp').offset().top);
                    // console.log('pt offsettop: ', pt.offset().top);
                    $('html, body').animate({
                        scrollTop: pt.find('.js-scrolltoexp').offset().top - 80
                    })
                })
                var scrollBottom = $(window).scrollTop() + $(window).height();
                var expandable = pt.find('.js-expandable');
                // console.log('expandable height: ', expandable.height());
                var cd = $(document).scrollTop();
                // console.log('cd: ', cd);
                var longest = parseInt(expandable.height())+parseInt(pt.offset().top);
                // console.log('longest: ', longest);
                // console.log('scrollBottom: ', scrollBottom)
                if (cd > pt.offset().top+20 && scrollBottom < longest) {
                    if (!stickyNav.hasClass('placedtop')) {
                        stickyNav.addClass('placedtop').removeClass('placedbottom');
                    }
                }
                else  {
                    var placement = stickyNav.parent();
                    // console.log('placement: ', placement)
                    if (!stickyNav.hasClass('placedbottom')) {
                        stickyNav.addClass('placedbottom').removeClass('placedtop')
                        // stickyNav.appendTo(placement);
                    }
                }
            }
        })
    } else {
        $(document).off('stickyNavbarScroll');
    }
}

window.stickyNavbarPrimaryTreatment = stickyNavbarPrimaryTreatment;