var primaryTreatment = (function($) {
    function Part(partElm) {
        this.doNothingFlag = 0;

        //Multiple primary results
        if (partElm.find('.js-section-container').length === 0) {
            this.doNothingFlag = 1;
        }
        var that = this;

        var shouldResizeOnOpen = true;
        that.heading = partElm.find('.js-treatment-heading');
        that.content = partElm.find('.js-primary-treatment-content');
        that.viewBox = partElm.find('.js-primary-treatment-view-container');
        that.sections = partElm.find('.js-section-container');
        that.currentSection = that.sections.first();
        that.element = partElm;
        that.expandButtonArea = partElm.find('.js-expander');
        that.navigationTabs = partElm.find('.js-navigation-tabs');
        that.navigationPanel = partElm.find('.read-more-bottom-navigation');
        that.nextButton = that.navigationPanel.find('.js-next-section');
        that.initialized = false;

        var findTabButton = function(str) {
            return that.tabButtons.filter(
                '[data-target-section="' + str + '"]:first'
            );
        };

        var findSection = function(str) {
            return that.sections.filter(
                '[data-section-name="' + str + '"]:first'
            );
        };

        this.createNavigationTabs = function() {
            var tabs = that.navigationTabs.find('.tabs');
            that.tabButtons = tabs.find('.tab-button');
            that.tabButtons.click(function(e) {
                e.preventDefault();
                var sectionName = $(this).data('targetSection');
                var targetSection = findSection(sectionName);

                that.goToSection(targetSection, $(this));
            });
            return that;
        };

        var getNextSectionInCycle = function(section) {
            var nextSection = section.next();
            if (!nextSection || !nextSection.length)
                nextSection = section.siblings().first();
            return nextSection;
        };

        that.goToSection = function(section, tabButton) {
            that.currentSection = section;
            that.tabButtons.removeClass('selected');

            tabButton = tabButton || findTabButton(section.data('sectionName'));
            tabButton.addClass('selected');

            //Scroll til toppen av behandlingsbeskrivelsen hvis toppen av elementet ikke er synlig.
            if (that.initialized && !isScrolledIntoView()) {
                $('html, body').animate(
                    {
                        scrollTop: that.element.offset().top - 80
                    },
                    100
                );
            }
            setTextOnNextButton();
            that.viewBox.animate({
                height: that.currentSection.outerHeight(true),
                scrollTop:
                    that.currentSection.offset().top -
                    that.viewBox.offset().top +
                    that.viewBox.scrollTop()
            });
        };

        var isScrolledIntoView = function() {
            var elem = that.element;
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = elem.offset().top;
            return elemTop <= docViewBottom && elemTop >= docViewTop;
        };

        var goToNextSectionInCycle = function() {
            that.goToSection(getNextSectionInCycle(that.currentSection));
        };

        var setTextOnNextButton = function() {
            var next = getNextSectionInCycle(that.currentSection);
            var buttonText = next.data('section-button-text');
            that.nextButton.children('.text').text(buttonText);
        };

        that.createNavigationPanel = function() {
            setTextOnNextButton();
            that.nextButton.click(function() {
                goToNextSectionInCycle($(this));
            });
            that.navigationPanel
                .find('.close-section:first')
                .click(that.toggleExpand);
            return that;
        };

        that.resize = function() {
            if (!that.content.is(':visible')) {
                shouldResizeOnOpen = true;
                return;
            }
            that.setHeightOnViewBox();
            shouldResizeOnOpen = false;
        };

        that.setHeightOnViewBox = function() {
            if (that.doNothingFlag) {
                var selectedHeight = that.currentSection.outerHeight(true);
                that.viewBox.height(selectedHeight);
                return that;
            }
            selectedHeight = Math.max(
                that.currentSection.outerHeight(true),
                that.tabButtons.height()
            );
            that.viewBox.height(selectedHeight);
            return that;
        };

        that.toggleExpand = function(e) {
            if (e) {
                e.preventDefault();
            }
            if (shouldResizeOnOpen && !that.content.is(':visible')) {
                that.content.show(0);
                that.resize();
                that.content.hide();
            }
            that.element.toggleClass('expand');
            that.content.slideToggle();
        };

        that.makePartExpandingToggle = function() {
            that.content.hide();
            that.expandButtonArea.click(function() {
                that.toggleExpand();
            });
            return that;
        };
    }

    function initAllPrimaryTreatmentParts(parts) {
        parts.each(function() {
            var part = new Part($(this));

            if (part.doNothingFlag) {
                part.makePartExpandingToggle();
                $(window).resize(part.resize);
                return;
            }

            part.createNavigationPanel();
            part.createNavigationTabs();
            part.setHeightOnViewBox();
            part.goToSection(part.currentSection);
            part.makePartExpandingToggle();
            $(window).resize(part.resize);
            part.initialized = true;
        });
    }

    return function() {
        var sections = $('.js-primary-treatment');

        if (sections.length) {
            initAllPrimaryTreatmentParts(sections);
        }
    };
})($);

window.primaryTreatment = primaryTreatment;
