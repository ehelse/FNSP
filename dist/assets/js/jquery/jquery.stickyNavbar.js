/* The semi-colon before function invocation is a safety net against concatenated
   scripts and/or other plugins which may not be closed properly. */
;
(function ($, window, document) {

    'use strict';

    $.fn.stickyNavbar = function (prop) {

        var getOffset = function (elm) {
            var prev = elm.prev();
            return prev.position().top + prev.outerHeight(true);
        };
        // Set default values
        var options = $.extend({
            activeClass: "active", // Class to be added to highlight nav elements
            sectionSelector: "scrollto", // Class of the section that is interconnected with nav links
            animDuration: 350, // Duration of jQuery animation as well as jQuery scrolling duration
            startAt: 0, // Stick the menu at XXXpx from the top of the this() (nav container)
            easing: "swing", // Easing type if jqueryEffects = true, use jQuery Easing plugin to extend easing types - gsgd.co.uk/sandbox/jquery/easing
            jqueryEffects: false, // jQuery animation on/off
            jqueryAnim: "slideDown", // jQuery animation type: fadeIn, show or slideDown
            selector: "a", // Selector to which activeClass will be added, either "a" or "li"
            mobile: false, // If false, nav will not stick under viewport width of 480px (default) or user defined mobileWidth
            mobileWidth: 480, // The viewport width (without scrollbar) under which stickyNavbar will not be applied (due user usability on mobile)
            zindex: 9999, // The zindex value to apply to the element: default 9999, other option is "auto"
            stickyModeClass: "sticky", // Class that will be applied to 'this' in sticky mode
            unstickyModeClass: "unsticky", // Class that will be applied to 'this' in non-sticky mode
            withMargin: true //Count margin as part of element
        }, prop),
            section = $('.' + options.sectionSelector);


        function setActiveClass (menuItems, thisHeight, windowPosition, $self) {
            menuItems.removeClass(options.activeClass);

            /* Add activeClass to the div that is passing the top of the window */
            section.each(function () {
                var margin = ((options.withMargin) ? parseInt($(this).css('marginTop'), 10) : 0);
                var top = $(this).offset().top - thisHeight - margin,
                    bottom = $(this).height() + top + margin;

                if ((windowPosition >= top) && (windowPosition <= bottom)) {
                    if (options.selector === "a") {
                        $self.find('li a[href~="#' + this.id + '"]').addClass(options.activeClass);
                    } else {
                        $self.find('li[href~="#' + this.id + '"]').addClass(options.activeClass);
                    }
                }
            });
        }

        function unstick ($self, thisHeight, $selfZindex, $selfPosition, $topOffset) {
            if (!!$self.filler) {
                $self.filler.remove();
                $self.filler = null;
            }
            thisHeight = $self.outerHeight(true);
            /* v.1.1.0: sticky/unsticky class */
            /* Add 'sticky' class to this as soon as 'this' is in sticky mode */
            $self.css({
                'position': options.$selfPosition,
                "zIndex": $selfZindex
            }).removeClass(options.stickyModeClass).addClass(' ' + options.unstickyModeClass);
            $self.css({
                'position': $selfPosition,
                'top': $topOffset
            }).stop().animate({
                top: $topOffset
            }, options.animDuration, options.easing);
            return thisHeight;
        }

        function stick ($self) {
            if (!$self.filler) {
                $self.filler = $self.before('<div class="js-filler" style="height: ' + $self.height() + 'px;" ></div>').prev();
            }

            $self.removeClass(options.unstickyModeClass).addClass(' ' + options.stickyModeClass);

            $self.css({
                'position': 'fixed',
                "zIndex": options.zindex
            }).stop();
        }

        return this.each(function () {

            /* Cache variables */
            var $self = $(this),
                $selfPosition = $self.css("position"), // Initial position of this,
                $selfZindex = $self.css("zIndex"), // Z-index of this
                thisHeight = $self.outerHeight(true),// Height of navigation wrapper,
                innerHeight = $self.height(),
                $topOffset = $self.css("top") === 'auto' ? 0 : $self.css("top"), // Top property of this: if not set = 0
                menuItems = options.selector === "a" ? $self.find('li a') : $self.find('li'), // Navigation lists or links
                menuItemsHref = $self.find('li a[href*="#"]'), // href attributes of navigation links.
                windowPosition = $(window).scrollTop();

            menuItems.click(function(e) {
                var href = $(this).attr("href");
                if (href.substring(0, 4) === 'http' || href.substring(0, 7) === 'mailto:') {
                    return true;
                }

                windowPosition = $(window).scrollTop();

                /* Get index of clicked nav link */
                var index = menuItems.index(this),
                    section = href, // Get href attr of clicked nav link
                    scrollTo = 0;

                if (index != 0) {
                    scrollTo = $(section).offset().top - innerHeight + 2 - ((options.withMargin) ? parseInt($(section).css('marginTop'), 10) : 0);
                }

                e.preventDefault();

                $("html, body").stop().animate({

                scrollTop: scrollTo + 'px'
                }, {
                    duration: options.animDuration,
                    easing: options.easing
                });
            }); // menuItems.click(function(e) END


            /* v1.1.0: Main function, then on bottom called window.scroll, ready and resize */

            var mainFunc = function() {

                var win = $(window),
                    windowPosition = win.scrollTop(),
                    windowWidth = win.width();

                if ($self.is(':hidden') || !options.mobile && windowWidth < options.mobileWidth) {
                    $self.css('position', $selfPosition);
                    return;
                }

                setActiveClass(menuItems, thisHeight, windowPosition, $self);

                if (windowPosition >= ((!!$self.filler) ? getOffset($self.filler) : getOffset($self)) + options.startAt) {
                    stick($self);
                } else {
                    thisHeight = unstick($self, thisHeight, $selfZindex, $selfPosition, $topOffset);
                }

            };

            $(window).scroll(mainFunc); // scroll fn end
            $(window).ready(mainFunc);
            $(window).resize(mainFunc);

        }); // return this.each end
    }; // $.fn.stickyNavbar end
})(jQuery, window, document); // document ready end