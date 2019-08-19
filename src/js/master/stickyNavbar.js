function stickyNavbar() {

    var navbar = $('.js-header-sticky');

    if (navbar.length !== 0 && navbar.is(':visible')) {

        function t(t) {
            t.stickyNavbar({
                activeClass: 'current',
                sectionSelector: 'js-scrollto',
                animDuration: 250,
                startAt: 0,
                easing: 'linear',
                jqueryEffects: !1,
                jqueryAnim: 'slideDown',
                selector: 'a',
                mobile: !0,
                mobileWidth: 480,
                zindex: 9999,
                stickyModeClass: 'sticky',
                unstickyModeClass: 'js-unsticky',
                navOffset: 100
            });
        }

        function n() {
            $('html, body').animate({scrollTop: 0}, 'fast');
        }

        t(navbar),
            $('.js-scroll-to-top').click(this, function () {
                n();
            });

        $('.m_page-menu .contact-link, .m_page-menu .nav-item').click(function () {
            $($(this).attr('href'))
                .attr('tabindex', -1)
                .focus();
        });
    }
}

window.stickyNavbar = stickyNavbar;