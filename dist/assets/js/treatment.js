/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/config/js/jstreatment.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/js/jstreatment.js":
/*!**************************************!*\
  !*** ./src/config/js/jstreatment.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../js/treatment/stickyNavbar */ "./src/js/treatment/stickyNavbar.js");
__webpack_require__(/*! ../../js/treatment/primaryTreatmentStickyButton */ "./src/js/treatment/primaryTreatmentStickyButton.js");
__webpack_require__(/*! ../../js/treatment/hiderte */ "./src/js/treatment/hiderte.js");
__webpack_require__(/*! ../../js/treatment/primaryTreatment */ "./src/js/treatment/primaryTreatment.js");

/***/ }),

/***/ "./src/js/treatment/hiderte.js":
/*!*************************************!*\
  !*** ./src/js/treatment/hiderte.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿$(document).ready(function() {
    // Hide RTE controls if there is no content inside
    $('.treatmentsection').each(function() {
        var contentdiv = $(this).find('.ms-rtestate-field').find('[id*=_content]');
        if(contentdiv.length > 0){
            var rteContentLength = $(this).find('.ms-rtestate-field').find('[id*=_content]').html().length;
            var rteAdditionalContentLength = $(this).find('.ms-rtestate-field').find('[id*=vid_]').next().length;
            if(rteContentLength > 0 || rteAdditionalContentLength > 0){
                $(this).show();
            } else {
                $(this).hide();
            }
        }        
    });
});


/***/ }),

/***/ "./src/js/treatment/primaryTreatment.js":
/*!**********************************************!*\
  !*** ./src/js/treatment/primaryTreatment.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./src/js/treatment/primaryTreatmentStickyButton.js":
/*!**********************************************************!*\
  !*** ./src/js/treatment/primaryTreatmentStickyButton.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/treatment/stickyNavbar.js":
/*!******************************************!*\
  !*** ./src/js/treatment/stickyNavbar.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function stickyNavbar() {
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
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    t($('.js-header-sticky')),
        $('.js-scroll-to-top').click(this, function() {
            n();
        });

    $('.m_page-menu .contact-link, .m_page-menu .nav-item').click(function() {
        $($(this).attr('href'))
            .attr('tabindex', -1)
            .focus();
    });
}

window.stickyNavbar = stickyNavbar;


/***/ })

/******/ });
//# sourceMappingURL=treatment.js.map