(function ($) {
    $.fn.getExpandableBlocks = function () {
        var expandBlocks = [];

        $(this).each(function () {
            var expand = $(this),
                expander,
                expandable,
                expandBlock;

            if (expand.hasClass('js-responsive-expand')) {
                expander = expand.find($('.js-responsive-expander')).first();
                expandable = expand.find($('.js-responsive-expandable')).first();
            } else if (expand.hasClass('js-expand')) {
                expander = expand.find($('.js-expander')).first();
                expandable = expand.find($('.js-expandable')).first();
            } else if (expand.hasClass('js-pulldown-expand')) {
                expander = expand.find($('.js-pulldown-expander')).first();
                expandable = expand.find($('.js-pulldown-expandable')).first();
            }

            function ExpandBlock(expand, expander, expandable) {
                this.expand = expand[0];
                this.expander = expander[0];
                this.expandable = expandable[0];
            }

            expandBlock = new ExpandBlock(expand, expander, expandable);

            expandBlocks.push(expandBlock);
        });

        return $(expandBlocks);
    };

    $.fn.addExpandability = function () {
        var historyApi = !!(window.history && history.replaceState);

        var isScrolledIntoView = function (elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = elem.offset().top;
            return elemTop <= docViewBottom && elemTop >= docViewTop;
        };

        $(this).each(function () {
            $(this).removeExpandability();

            var expand = $(this.expand),
                expander = $(this.expander),
                expandable = $(this.expandable);

            // Clicking or focusing on an expander or its children adds a
            // class that makes it look like the whole block is focused
            expand.on('focusout.addExpandability', function () {
                $('.focused').removeClass('focused');
            });

            expand.on('focusin.addExpandability', function () {
                expand.addClass('focused');
            });

            // Initializes the block
            expand.addClass('initial expand collapsed');
            expander.addClass('expander');
            expander.attr('aria-expanded', 'false');

            //Hash expand functionality, not for menu button or pulldowns
            if (!(expander.is('button') || expander.hasClass('search-expander')) 
                && (expander.hasClass('js-expander') || expander.hasClass('js-responsive-expander'))) {
                var anchor = furlifySegment(expander.text());
                expander.attr('data-title', anchor);
            }

            expandable.addClass('expandable');

            // Make non-button expanders work with enter key
            if (!expander.is('button')) {
                expander.attr('role', 'button');
                expander.attr('tabindex', '0');
                expander.on('keypress.addExpandability', function (e) {
                    var pressedKey = e.which;
                    if (pressedKey === 13 || pressedKey === 32) {
                        e.preventDefault();
                        $(this).click();
                    }
                });
            }

            expander.on('click.addExpandability', function (e) {
                e.preventDefault();
                if (expander.attr('aria-expanded') === 'false') {
                    // Expand the block
                    expander.attr('aria-expanded', 'true');
                    expand.addClass('expanded').removeClass('collapsed');

                    // Set label on print button
                    var printButtonAttributeClose = expander.attr('data-close-text');
                    if (typeof printButtonAttributeClose !== typeof undefined && printButtonAttributeClose !== false) {
                        expander.attr('aria-label', printButtonAttributeClose);
                    }



                    if (expander.hasClass('js-overlap-button')) {
                        var amountToOverlap = expander.outerHeight();
                        expandable.css('margin-top', -amountToOverlap + 'px');
                        // expandable.css("padding-top", amountToOverlap + "px");
                    }

                    if (!(expander.is('button') || expander.hasClass('search-expander')) 
                        && (expander.hasClass('js-expander') || expander.hasClass('js-responsive-expander'))) {
                        if (historyApi) {
                            history.replaceState('', document.title, '#' + expander.attr('data-title'));
                        }
                            
                        else {
                            window.location.hash = '#' + expander.attr('data-title');
                        }
                            
                    }
                } else if (expander.attr('aria-expanded') === 'true') {
                    // Collapse the block
                    expander.attr('aria-expanded', 'false');

                    // Set label on print button
                    var printButtonAttributeOpen = expander.attr('data-print-text');
                    if (typeof printButtonAttributeOpen !== typeof undefined && printButtonAttributeOpen !== false) {
                        expander.attr('aria-label', printButtonAttributeOpen);
                    }

                    expand.addClass('collapsed').removeClass('expanded');

                    if (expander.hasClass('js-overlap-button')) {
                        expandable.css('margin-top', '');
                        expandable.css('padding-top', '');
                    }

                    //Hash expand functionality, not for menu button or pulldowns
                    if (!(expander.is('button') || expander.hasClass('search-expander')) 
                        && (expander.hasClass('js-expander') || expander.hasClass('js-responsive-expander'))) {
                        if (historyApi) {
                            history.replaceState({}, document.title, window.location.href.split('#')[0]);
                        }
                            
                        else {
                            window.location.hash = '';
                        } 
                    }
                    //Scroll back up again.
                    var scrollTarget = expandable.siblings('.js-pulldown-top').length > 0 ? expandable.siblings('.js-pulldown-top').first() : expandable;

                    if (!isScrolledIntoView(scrollTarget)) {
                        $('html, body').animate(
                            {
                                scrollTop: scrollTarget.offset().top - 80
                            },
                            100
                        );
                    }
                }

                expand.removeClass('initial');
            });
        });

        return $(this);
    };

    $.fn.removeExpandability = function () {
        $(this).each(function () {
            var expand = $(this.expand),
                expander = $(this.expander),
                expandable = $(this.expandable);

            expander.off('.addExpandability');
            expand.off('.addExpandability');
            expandable.off('.addExpandability');

            expand.removeClass('initial expand expanded collapsed focused');
            expander.removeAttr('aria-expanded tabindex role');
            expander.css('margin-bottom', '');
            expander.removeClass('expander');
            expandable.removeClass('expandable');
        });

        return $(this);
    };

    //Checks on window load if there is a hash, and searches the dom to expand, and scroll to, the element
    $.fn.expandBlockFromHash = function () {
        var expanderToOpen = location.hash;
        if (expanderToOpen !== '') {
            var $blockToExpand = $(document.querySelectorAll('[data-title=\'' + expanderToOpen.substring(1) + '\']'));
            if ($blockToExpand.length !== 0) {
                var $closestResponsiveExpander = $blockToExpand
                    .closest('.js-responsive-expand')
                    .find('.js-responsive-expander')
                    .first();
                var $parentExpandable = $blockToExpand
                    .parents('.js-expandable')
                    .prev('.js-expander');
                if ($parentExpandable.length === 0) {
                    $parentExpandable = $blockToExpand
                        .parents('.m_highlighted-expander')
                        .find('.js-expander')
                        .first();
                }
                if ($parentExpandable.length === 1) {
                    if ($parentExpandable.attr('aria-expanded') === 'false') {
                        $parentExpandable.trigger('click', [
                            { triggeredByHash: true }
                        ]);
                    }
                }

                if ($closestResponsiveExpander.length === 1) {
                    if (
                        $closestResponsiveExpander.attr('aria-expanded') ===
                        'false'
                    ) {
                        $closestResponsiveExpander.trigger('click', [
                            { triggeredByHash: true }
                        ]);
                    }
                }

                if ($blockToExpand.attr('aria-expanded') === 'false') {
                    $blockToExpand.trigger('click', [
                        { triggeredByHash: true }
                    ]);
                }
                $blockToExpand.focus();
                $('html, body').animate({
                    scrollTop: $blockToExpand.offset().top - 80
                    }, 100);
            }
        }
    };

    $.fn.focusWithoutScrolling = function () {
        var x = window.scrollX, y = window.scrollY;
        this.focus();
        window.scrollTo(x, y);
    };

})(jQuery);

function furlifySegment(segment) {
    segment = segment
        .trim()
        .toLowerCase()
        .replace(/\u200B/g, '')  // Zero-width space
        .replace(/\u00a0/g, '-') // Non-breaking space
        .replace(/\s+/g, '-')    // Other space characters
        .replace(new RegExp('ø', 'g'), 'o')
        .replace(new RegExp('å', 'g'), 'a')
        .replace(new RegExp('æ', 'g'), 'ae')
        .replace(new RegExp('ž', 'g'), 'z')
        .replace(new RegExp('ŧ', 'g'), 't')
        .replace(new RegExp('š', 'g'), 's')
        .replace(new RegExp('ŋ', 'g'), 'n')
        .replace(new RegExp('đ', 'g'), 'd')
        .replace(new RegExp('č', 'g'), 'c')
        .replace(new RegExp('á', 'g'), 'a')
        .replace(/[^a-z0-9-]/gi,'');
    return segment;
}

