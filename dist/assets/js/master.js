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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/config/js/jsmaster.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config/js/jsmaster.js":
/*!***********************************!*\
  !*** ./src/config/js/jsmaster.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../js/master/plugins.js */ "./src/js/master/plugins.js");
__webpack_require__(/*! ../../js/master/layoutQ.js */ "./src/js/master/layoutQ.js");
__webpack_require__(/*! ../../js/master/debounce.js */ "./src/js/master/debounce.js");
__webpack_require__(/*! ../../js/master/allowFullscreenIframe.js */ "./src/js/master/allowFullscreenIframe.js");
__webpack_require__(/*! ../../js/master/chooseImageRendition.js */ "./src/js/master/chooseImageRendition.js");
__webpack_require__(/*! ../../js/master/editorControlledExpandingSections.js */ "./src/js/master/editorControlledExpandingSections.js");
__webpack_require__(/*! ../../js/master/equalHeightChildren.js */ "./src/js/master/equalHeightChildren.js");
__webpack_require__(/*! ../../js/master/expandableBlocks.js */ "./src/js/master/expandableBlocks.js");
__webpack_require__(/*! ../../js/master/expandToFullWidth.js */ "./src/js/master/expandToFullWidth.js");
__webpack_require__(/*! ../../js/master/feedback.js */ "./src/js/master/feedback.js");
__webpack_require__(/*! ../../js/master/feedbackModule.js */ "./src/js/master/feedbackModule.js");
__webpack_require__(/*! ../../js/master/fixSafariSearchForm.js */ "./src/js/master/fixSafariSearchForm.js");
__webpack_require__(/*! ../../js/master/fixTelLinks.js */ "./src/js/master/fixTelLinks.js");
__webpack_require__(/*! ../../js/master/inDesignMode.js */ "./src/js/master/inDesignMode.js");
__webpack_require__(/*! ../../js/master/layoutOrder.js */ "./src/js/master/layoutOrder.js");
__webpack_require__(/*! ../../js/master/main.js */ "./src/js/master/main.js");
__webpack_require__(/*! ../../js/master/moveExpandableClassUp.js */ "./src/js/master/moveExpandableClassUp.js");
__webpack_require__(/*! ../../js/master/noJS.js */ "./src/js/master/noJS.js");
__webpack_require__(/*! ../../js/master/pollyfillArray.js */ "./src/js/master/pollyfillArray.js");
__webpack_require__(/*! ../../js/master/printButtons.js */ "./src/js/master/printButtons.js");
__webpack_require__(/*! ../../js/master/pseudoLinkBoxes.js */ "./src/js/master/pseudoLinkBoxes.js");
__webpack_require__(/*! ../../js/master/pulldown.js */ "./src/js/master/pulldown.js");
__webpack_require__(/*! ../../js/master/removeZeroHeightSections.js */ "./src/js/master/removeZeroHeightSections.js");
__webpack_require__(/*! ../../js/master/resizeIframe.js */ "./src/js/master/resizeIframe.js");
__webpack_require__(/*! ../../js/master/responsiveExpandableBlocks.js */ "./src/js/master/responsiveExpandableBlocks.js");
__webpack_require__(/*! ../../js/master/sortExpandableSections.js */ "./src/js/master/sortExpandableSections.js");
__webpack_require__(/*! ../../js/master/searchExpander.js */ "./src/js/master/searchExpander.js");
__webpack_require__(/*! ../../js/master/stickyNavbar */ "./src/js/master/stickyNavbar.js");
__webpack_require__(/*! ../../js/master/textSizeExpander.js */ "./src/js/master/textSizeExpander.js");
__webpack_require__(/*! ../../js/master/triggerGAEvent.js */ "./src/js/master/triggerGAEvent.js");
__webpack_require__(/*! ../../js/master/unhideMenu.js */ "./src/js/master/unhideMenu.js");
__webpack_require__(/*! ../../js/master/entrancePopup.js */ "./src/js/master/entrancePopup.js");
__webpack_require__(/*! ../../js/master/tileGroupFocus.js */ "./src/js/master/tileGroupFocus.js");


/***/ }),

/***/ "./src/js/master/allowFullscreenIframe.js":
/*!************************************************!*\
  !*** ./src/js/master/allowFullscreenIframe.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿// #allowFullscreenIframe ================================================
//Fix for allowfullscreen attribute that SP strips away from YouTube links
function allowFullscreenIframe() {
    if (!inDesignMode()) {
        $("main iframe[src*='youtube.com']").each(function() {
            if (!$(this).attr('allowfullscreen'))
                $(this).attr('allowfullscreen', 'allowfullscreen');
        });
    }
}

window.allowFullscreenIframe = allowFullscreenIframe;


/***/ }),

/***/ "./src/js/master/chooseImageRendition.js":
/*!***********************************************!*\
  !*** ./src/js/master/chooseImageRendition.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #chooseImageRendition ===================================
// Chooses the correct size image based on the page layout.
function chooseImageRendition() {
    if ($('.js-image-renditions'.length)) {
        var img = $('.js-image-renditions img'),
            url = img.attr('data-imgsrc');

        if (img.length !== 0) {
            var renditionURL = url + '?RenditionID=' + layoutQ().number[0];
            img.attr('src', renditionURL);
        }
    }
}

window.chooseImageRendition = chooseImageRendition;


/***/ }),

/***/ "./src/js/master/debounce.js":
/*!***********************************!*\
  !*** ./src/js/master/debounce.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #debounce ==================================================
// Handles variation in browser resize behavior

function debounce(fn, interval) {
    var timeout = null;
    return function () {
        var args = arguments,
            context = this;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            fn.apply(context, args);
        }, interval);
    };
}

window.debounce = debounce;

/***/ }),

/***/ "./src/js/master/editorControlledExpandingSections.js":
/*!************************************************************!*\
  !*** ./src/js/master/editorControlledExpandingSections.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #editorControlledExpandingSections =========================
// Converts the layout of editor-controlled expandable sections into
// the accordion markup so it gets the proper style.
function editorControlledExpandingSections() {
    if (!inDesignMode()) {
        $('.stop-expandable').hide();
        //Fix selector to not include already set up expanders in preview html (not('.js-expander'))
        var expanderHeadings = $('.ms-rteElement-expandable, .ms-rteElement-H1B, .ms-rteElement-H2B, .ms-rteElement-H3B').not('.js-expander');
        if (expanderHeadings.length) {

            expanderHeadings.each(function () {
                var heading = $(this),
                    content = heading.nextUntil('.stop-expandable, h1, h2, h3'),
                    expandSection,
                    expandableContent;

                // Create the expanding section.
                heading.before('<section class="js-expand m_subtle-expander">');
                expandSection = heading.prev();

                // Create the expandable content block.
                heading.after(
                    '<div class="js-expandable" tabindex="-1"></div></div>'
                );
                expandableContent = heading.next();

                // Place the content inside the expandable content block.
                expandableContent.append(content);

                // Place the expander and the expandable content inside the expanding section.
                expandSection.prepend(heading);
                expandSection.append(expandableContent);

                // Adapt the heading markup to make it an expander.
                heading.addClass('js-expander');
                heading.wrapInner('<span class="item-title"></span>');

            });
        }
    }

}

window.editorControlledExpandingSections = editorControlledExpandingSections;

/***/ }),

/***/ "./src/js/master/entrancePopup.js":
/*!****************************************!*\
  !*** ./src/js/master/entrancePopup.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/master/equalHeightChildren.js":
/*!**********************************************!*\
  !*** ./src/js/master/equalHeightChildren.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function equalHeightChildren() {
    var parents = $('.js-equal-height-children');

    // If there are equal height blocks
    if (parents.length) {
        // If the layout is only one column
        if (layoutQ().number[0] === 1) {
            // Remove the set height attribute of the equalized blocks.
            parents.children().removeAttr('style');
        } else {
            // The layout is not one column.  Set equal height.
            parents.each(function() {
                var children = $(this).children(),
                    row = [],
                    cur_top = 0;

                // Remove the previous style
                children.removeAttr('style');

                children.each(function() {
                    if ($(this).offset().top === cur_top) {
                        row.push($(this));
                    } else {
                        setEqualHeight(row);
                        row = [$(this)];
                        cur_top = $(this).offset().top;
                    }
                });
            });
        }
    }
}

var getMaxHeight = function(elements) {
    var maxHeight = 0;
    elements.forEach(function(e) {
        maxHeight = Math.max(e.height(), maxHeight);
    });
    return maxHeight;
};

var setEqualHeight = function(elements) {
    if (elements.length === 0) return;
    var maxHeight = getMaxHeight(elements);
    elements.forEach(function(e) {
        e.height(maxHeight);
    });
};

window.equalHeightChildren = equalHeightChildren;


/***/ }),

/***/ "./src/js/master/expandToFullWidth.js":
/*!********************************************!*\
  !*** ./src/js/master/expandToFullWidth.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function expandToFullWidthElements() {
    var elementsToExpand = $(
        '.js-expand-to-full-width, .container .o_promoted-content, .container .o_horizontal-section, .container .o_primary-treatment:not(.three)'
    );

    if (elementsToExpand.length !== 0) {
        elementsToExpand.each(function() {
            var element = $(this);
            element.css('left', '0');
            var leftMargin = element.offset().left;
            var width = $('main').width();
            element.width(width);
            element.css('position', 'relative');
            element.css('left', -leftMargin + 'px');
        });
    }
}

window.expandToFullWidthElements = expandToFullWidthElements;


/***/ }),

/***/ "./src/js/master/expandableBlocks.js":
/*!*******************************************!*\
  !*** ./src/js/master/expandableBlocks.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #expandableBlocks =======================================
// Adds collapsing/expanding functionality to non-responsive expandable blocks.
function expandableBlocks() {
    var expandableBlocks = $('.js-expand').getExpandableBlocks();

    expandableBlocks.addExpandability();

    expandableBlocks.expandBlockFromHash();
}

window.expandableBlocks = expandableBlocks;

function elementExpand(elementQuery) {
    $("[name='" + elementQuery + "']")
        .removeClass('collapsed')
        .addClass('expanded');
    if ($("[name='" + elementQuery + "'] .js-responsive-expander")) {
        if (
            $("[name='" + elementQuery + "'] .js-responsive-expander").attr(
                'aria-expanded'
            ) === 'false'
        ) {
            $("[name='" + elementQuery + "'] .js-responsive-expander").attr(
                'aria-expanded',
                'true'
            );
        }
    }
}

window.elementExpand = elementExpand;


/***/ }),

/***/ "./src/js/master/feedback.js":
/*!***********************************!*\
  !*** ./src/js/master/feedback.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #feedback =====================================================
// Adds the page URL to the subject line of feedback links.
function feedback() {
    if ($('.js-feedback').length) {
        function updateSubject() {
            return encodeURI(
                'Tilbakemelding pÃ¥ siden "' +
                    $('title')
                        .text()
                        .trim() +
                    ' - ( ' +
                    window.location.href +
                    ' )'
            );
        }

        function getEmails() {
            return $('.js-feedback')
                .attr('href')
                .match(/mailto:([^\?]*)/)[1];
        }

        var feedback = $('.js-feedback').attr(
            'href',
            'mailto:' + getEmails() + '?subject=' + updateSubject() + '"'
        );
    }
}

window.feedback = feedback;


/***/ }),

/***/ "./src/js/master/feedbackModule.js":
/*!*****************************************!*\
  !*** ./src/js/master/feedbackModule.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿// #feedbackModule =====================================================
// Attaches events to feedback module
function feedbackModule() {
    if ($('.m_feedback') && typeof FNSP !== 'undefined') {
        var feedbackThanksInHash = window.location.hash.indexOf('takk-for-tilbakemelding') > -1;
        if (feedbackThanksInHash) {
            $('.m_feedback fieldset').remove();
            $('.m_feedback .feedbackresponse').removeClass('hidden');
            return;
        }
        FNSP.FeedbackErrorMessage = $('.m_feedback #error-message').text();
        FNSP.ChoiceTimestamp;
        $('.m_feedback button[id*="FeedbackIs"]').on('click keypress', function (e) {
            if (e.which === 13 || e.which === 32 || e.type === 'click') {
                e.preventDefault();
                var target = e.currentTarget.id;
                FNSP.ChoiceTimestamp = Date.now();
                if (target.indexOf('Positive') > -1) {
                    $('.m_feedback #FeedbackIsPositiveChoice').prop('checked', true);
                    $('.m_feedback #FeedbackIsNegativeChoice').prop('checked', false);
                }
                else {
                    $('.m_feedback #FeedbackIsNegativeChoice').prop('checked', true);
                    $('.m_feedback #FeedbackIsPositiveChoice').prop('checked', false);
                }

                $('.m_feedback input[id*="NumberOfCols"]').val(layoutQ().number[0]);
                $('.m_feedback button[id*="FeedbackIs"]').not(document.getElementById(target)).removeClass('selected').removeAttr('data-selected');

                $(this).addClass('selected').attr('data-selected', 'true');

                var placeholder = $('#feedback_' + $(this).attr('id').slice(8)).text();

                $('.m_feedback .feedbackformcontrols textarea[id*="FeedbackMessage"]')
                    .keyup(function () {
                        var left = 255 - $(this).val().length;
                        if (left < 255) {
                            $('.m_feedback .feedbackformcontrols .error').text('');
                            $('.m_feedback .feedbackformcontrols textarea[id$="FeedbackMessage"]').removeClass('has-error');
                        }
                        if (left >= 0) {
                            $('[id$="feedbackcounter"]').text(left);
                        }
                            
                        if (FNSP.PBSubmit) {
                            if (($('.m_feedback textarea').val().length > 0 &&
                                $('#FeedbackIsPositive').attr('data-selected') === 'true') ||
                                $('#FeedbackIsNegative').attr('data-selected') === 'true') {
                                $('.m_feedback input[id*="SubmitFeedback"]').removeAttr('disabled').removeClass('aspNetDisabled');
                            }
                            else {
                                $('.m_feedback input[id*="SubmitFeedback"]').attr('disabled', 'disabled');
                            }
                        }
                    });
                $('.m_feedback label[id*="FeedbackLabel"]').text(placeholder);
                $('.m_feedback .feedbackformcontrols.hidden').slideUp(0, function () {
                        $(this).removeClass('visuallyhidden hidden').slideDown(500);
                    }
                );
            }
        });
        FNSP.SubmitFeedBack = function () {
            var FirstToPhoneyFieldValue = $('.m_feedback #FirstToPhoneyField').val();
            var submittedTimestamp = Date.now();
            var serviceUri = _spPageContextInfo.webAbsoluteUrl + '/_vti_bin/FNSP/JsonRpc.svc/Call';
            var submittedChoice = $('.m_feedback button[id*="FeedbackIsPositive"]').attr('data-selected') === 'true';
            var feedbackMessage = $('.m_feedback .feedbackformcontrols textarea[id$="FeedbackMessage"]').val().replace(/\r\n|\r|\n/g, ' ');
            if (feedbackMessage.replace(/[^a-z0-9-]/gi,'').length < 1) {
                $('.m_feedback .feedbackformcontrols textarea[id$="FeedbackMessage"]').addClass('has-error');
                $('.m_feedback .feedbackformcontrols textarea[id$="FeedbackMessage"]').focus();
                var feedbackMessage = $('.m_feedback .feedbackformcontrols .error').text(FNSP.FeedbackErrorMessage);
                return;
            }

            var deviceNumber = layoutQ().number[0];
            var pageUrl = window.location.href;

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: serviceUri,
                dataType: 'json',
                data: JSON.stringify({
                    method: 'feedback',
                    params: [
                        submittedChoice,
                        feedbackMessage,
                        FirstToPhoneyFieldValue,
                        pageUrl,
                        FNSP.Current.UserPreferredLCID,
                        deviceNumber,
                        FNSP.ChoiceTimestamp,
                        submittedTimestamp
                    ]
                }),
                success: function (response) {
                    if (!response.error) {
                        $('.m_feedback .feedbackresponse').text(JSON.parse(response.result));
                        $('.m_feedback fieldset').remove();
                        $('.m_feedback .feedbackresponse').removeClass('hidden');
                    } else {
                        $('.m_feedback fieldset').remove();
                    }
                },
                error: function (jqXHR, txtStatus, errorThrown) {
                    console.error(txtStatus + ' - ' + errorThrown);
                }
            });
            return false;
        };
    }
}

window.feedbackModule = feedbackModule;


/***/ }),

/***/ "./src/js/master/fixSafariSearchForm.js":
/*!**********************************************!*\
  !*** ./src/js/master/fixSafariSearchForm.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿// #fixSafariSearchForm ==========================================================================================
//Fix for issues with Safari and search forms where keyboard triggers selection of language menu instead of search
function fixSafariSearchForm() {
    if (!inDesignMode()) {
        if ($('.js-language ul').length) {
            var attrs = {};
            $.each(
                $('.page-header-content .m_search-box')[0].attributes,
                function(idx, attr) {
                    attrs[attr.nodeName] = attr.nodeValue;
                }
            );
            $('.page-header-content .m_search-box').replaceWith(function() {
                return $('<form />', attrs).append($(this).contents());
            });
            $('form.m_search-box')
                .attr('action', '.')
                .attr('onsubmit', 'return false;');
        }
    }
}

window.fixSafariSearchForm = fixSafariSearchForm;


/***/ }),

/***/ "./src/js/master/fixTelLinks.js":
/*!**************************************!*\
  !*** ./src/js/master/fixTelLinks.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #fixtellinks =====================================================
// Strips http:// to give editors support for tel:-links in RTE
function fixtellinks() {
    if (!inDesignMode()) {
        $('main .ms-rtestate-field a').each(function() {
            var thisTarget = $(this).attr('href');
            if (thisTarget && thisTarget.startsWith('http://tel:'))
            {
                var hrefLink = thisTarget.split('http://')[1];
                // Sometimes SP adds a / in the end
                if (hrefLink.match('/$')) {
                    hrefLink = hrefLink.substring(0, hrefLink.length - 1);
                }
                $(this).attr('href', hrefLink);
            }
        });
    }
}

window.fixtellinks = fixtellinks;


/***/ }),

/***/ "./src/js/master/inDesignMode.js":
/*!***************************************!*\
  !*** ./src/js/master/inDesignMode.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #designmode =====================================================
// Checks if page is in design mode
function inDesignMode() {
    var result =
        window.MSOWebPartPageFormName !== undefined &&
        ((document.forms[window.MSOWebPartPageFormName] &&
            document.forms[window.MSOWebPartPageFormName]
                .MSOLayout_InDesignMode &&
            '1' ===
                document.forms[window.MSOWebPartPageFormName]
                    .MSOLayout_InDesignMode.value) ||
            (document.forms[window.MSOWebPartPageFormName] &&
                document.forms[window.MSOWebPartPageFormName]._wikiPageMode &&
                'Edit' ===
                    document.forms[window.MSOWebPartPageFormName]._wikiPageMode
                        .value));
    return result || false;
}

window.inDesignMode = inDesignMode;


/***/ }),

/***/ "./src/js/master/layoutOrder.js":
/*!**************************************!*\
  !*** ./src/js/master/layoutOrder.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #layoutOrder ===============================================
// Changes the DOM order of the blocks on the front page
// and the framework search field to match the visual order.
function layoutOrder() {
    var promotedNavBlock = $('.js-tab-order .js-dynamic-order'),
        siteSearch = $('.js-site-search').first(),
        siteSettings = $('.js-site-settings'),
        menuButton = $('.js-menu-button');

    // For the promoted nav
    if (promotedNavBlock.length !== 0) {
        if (layoutQ().number[0] >= 3) {
            promotedNavBlock.closest('.js-tab-order').append(promotedNavBlock);
        }
        if (layoutQ().number[0] < 3) {
            promotedNavBlock.closest('.js-tab-order').prepend(promotedNavBlock);
        }
    }

    if ($('.js-site-search').length !== 0 && $('#header-site-search').length !== 0) {
        // For the header.
        //In 3- and 4-col layout, put the search before the menu button.
        if (siteSearch.length !== 0 && layoutQ().number[0] <= 2) {
            siteSearch.appendTo($('.search-menu .site-functions .container'));
            if ($('main.WelcomePage:not(.nasjonal)').length) {
                $('#header-search-toggle').addClass('hidden');
            }
            else {
                $('#header-search-toggle').removeClass('hidden');
            }
        } else {
            menuButton.before(siteSearch);

            // Remove the search box from the header on the front page in 3- and 4- col layouts
            if ($('main.WelcomePage:not(.nasjonal)').length) {
                siteSearch.addClass('hidden');
            } else {
                siteSearch.removeClass('hidden');
            }
        }
    }
}

window.layoutOrder = layoutOrder;


/***/ }),

/***/ "./src/js/master/layoutQ.js":
/*!**********************************!*\
  !*** ./src/js/master/layoutQ.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Creates a queue to give info about whether the layout has changed
// and which layout we're in.

var layoutQ = makeLayoutQ();

function makeLayoutQ() {
    // Initializing the queue (on page load). The value 0
    // indicates first page load.
    // "true" is just a default value.
    var Q = { number: [0, 0], changed: true };

    return function() {
        Q.changed = false;

        try {
            // Get the layout (the title z-index set in a
            // CSS media query.) To check the layout, call the function you get by calling makeLayout
            var layout = parseInt($('title').css('z-index'));
        } catch (e) {
            console.log(e);
        }

        // If the previous layout is not equal to the new layout,
        // the layout has changed.  Add the new layout to the queue.
        if (Q.number[0] !== layout) {
            Q.number.unshift(layout);
        }

        // If the layout queue is longer than two, that means
        // another layout has been added to the queue, therefore
        // the layout has changed. We hack off the oldest layout
        // in the queue, since we only want to know the previous and
        // the current layout.
        if (Q.number.length > 2) {
            Q.changed = true;
            Q.number.pop();
        }

        if (Q.changed) {
            $(document).trigger('layoutchange');
        }

        if (Q.number[0] === 1) {
            $(document).trigger('conditionalresize');
        }

        return Q;
    };
}

window.layoutQ = layoutQ;
window.makeLayoutQ = makeLayoutQ;


/***/ }),

/***/ "./src/js/master/main.js":
/*!*******************************!*\
  !*** ./src/js/master/main.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿// console.log("start - master/main.js");

// "ready" triggers as soon as the dom is in place.  Use this for things
// that are not affected by a change in layout or window size.
$(function() {
    
    //console.log('ready - master/main.js');
    allowFullscreenIframe();
    layoutQ();
    noJS();
    feedback();
    fixtellinks();
    printButtons();
    entrancePopup();
    stickyNavbar();
    primaryTreatmentStickyButton();
});

// "load" triggers when all the content on the page has finished loading.
// Use this for things that need to have their content fully loaded in
// order to work correctly, e.g. stuff affected by height.
$(window).on('load', function() {
    //console.log('load - master/main.js');
    feedbackModule();
    unhideMenu();
    expandToFullWidthElements();
    
    // These exist to deal with SP generating markup
    // that messes up the collapsing sections in 1-col layout.
    //    moveExpandableClassUp();
    //     sortExpandableSections();
    
    editorControlledExpandingSections();
    responsiveExpandableBlocks();
    expandableBlocks();
    textSizeExpander();
    removeZeroHeightSections();
    resizeIframe();
    pseudoLinkBoxes();
});

// "layoutchange" triggers only when the layout changes, as opposed to
// triggering on every resize.  Since the layout also changes on document
// ready--we're going from no layout to one layout--you don't have to call
// the function on document ready when you call it here.
$(window).on('layoutchange', function() {
    //console.log("layoutchange - master/main.js");
    pulldown();
    searchExpander();
    chooseImageRendition();
    layoutOrder();
    responsiveExpandableBlocks();
    resizeIframe();
});

// "conditionalresize" does stuff does stuff on debounced resize when the layout is 1-col.
$(window).on(
    'conditionalresize',
    debounce(function() {
        //console.log("conditionalresize - master/main.js");
        resizeIframe();
    }, 25)
);

// "resize orientationchange" triggers every time the browser window resizes
// or the device's orientation changes. You almost certainly want to put your
// function call in "layoutchange" or "conditionalresize" and not here.
$(window).on(
    'resize orientationchange',
    debounce(function() {
        // console.log("resize orientationchange - master/main.js");

        layoutQ();
        expandToFullWidthElements();
    }, 25)
);


/***/ }),

/***/ "./src/js/master/moveExpandableClassUp.js":
/*!************************************************!*\
  !*** ./src/js/master/moveExpandableClassUp.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #moveExpandableClassUp
// Handles situations in which a web part that's a horizontal section is not
// a direct child of main.  These should be fixed in SP!
function moveExpandableClassUp() {
    // get responsive sections that are not a child of main and not a child of a responsive section

    var responsiveExpandableSectionToMove = $('main .js-responsive-expand')
        .not('.js-responsive-expand .js-responsive-expand')
        .not('main > .js-responsive-expand')
        .not('.searchblock');

    responsiveExpandableSectionToMove.each(function() {
        // $(this).removeClass("o_horizontal-section js-responsive-expand collapsed");
        // $(this).closest("main > *").addClass("o_horizontal-section js-responsive-expand");

        $(this).addClass('moveExpandableClassUp');
    });
}

window.moveExpandableClassUp = moveExpandableClassUp;


/***/ }),

/***/ "./src/js/master/noJS.js":
/*!*******************************!*\
  !*** ./src/js/master/noJS.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #nojs =============================================
// Removes the "nojs" class in order to activate the js-styles
function noJS() {
    $('.nojs').removeClass('nojs');
}

window.noJS = noJS;


/***/ }),

/***/ "./src/js/master/plugins.js":
/*!**********************************!*\
  !*** ./src/js/master/plugins.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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



/***/ }),

/***/ "./src/js/master/pollyfillArray.js":
/*!*****************************************!*\
  !*** ./src/js/master/pollyfillArray.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function(predicate) {
            'use strict';
            if (this == null) {
                throw new TypeError(
                    'Array.prototype.find called on null or undefined'
                );
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        }
    });
}


/***/ }),

/***/ "./src/js/master/printButtons.js":
/*!***************************************!*\
  !*** ./src/js/master/printButtons.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #printButtons() =====================================================
// Used to initialize print buttons from print panel
function printButtons() {
    // Toggle the print button initially
    togglePrintButton();
    
    // If clicked on "Velg alt", select all checkboxes
    $(".m_printdialog .print-panel input[name='chooseall']").click(function() {
        $('.m_printdialog .print-panel input:checkbox')
            .not(this)
            .prop('checked', this.checked);
    });

    var sectionsToPrint = $("[data-printsection!=''][data-printsection]");
    var printList = $('.print-panel .print-list');
    $.each(sectionsToPrint, function(i) {
        if ($(this).closest('.content-hidden-no-location').length === 1) {
            return;
        }

        var sectionName = $(this).attr('data-printsection');

        var li = $('<li/>')
            .addClass('element')
            .appendTo(printList);

        var label = $('<label/>')
            .appendTo(li)
            .text(sectionName)
            .attr('for', sectionName);

        var input = $('<input/>')
            .attr('type', 'checkbox')
            .attr('id', sectionName)
            .attr('name', sectionName)
            .attr('value', sectionName)
            .addClass('rootelement')
            .insertBefore(label);

        /* Removed generation of subsections for now
        
        var subsectionsToPrint = $("[data-printsection='" + $(this).attr("data-printsection") + "']").not(":has([data-printsection])").find("[data-printsubsection]");
        if (subsectionsToPrint) {
            var ul = $("<ul/>")
                .addClass("sub-elements")
                .appendTo(li)
            $.each(subsectionsToPrint, function (i) {
                var subsectionName = $(this).attr("data-printsubsection");

                var li = $("<li/>")
                        .addClass("element")
                        .appendTo(ul);

                var label = $("<label/>")
                          .appendTo(li)
                          .text(subsectionName)
                          .attr('for', subsectionName);

                var input = $("<input/>")
                      .attr("type", "checkbox")
                      .attr('id', subsectionName)
                      .attr("name", subsectionName)
                      .attr("value", subsectionName)
                      .addClass("subelement")
                      .insertBefore(label);

                input.after($(this).attr("data-printsubsection"))
            });
        }
        */
    });

    // Others
    // var otherPrintList = $('<ul/>').addClass('print-list');
    // var divider = $('<hr/>').insertAfter(printList);
    // otherPrintList.insertAfter(divider);
    // var li = $('<li/>')
    //         .addClass('element')
    //         .appendTo(otherPrintList);

    //     var label = $('<label/>')
    //         .appendTo(li)
    //         .text('Inkluder lenker')
    //         .attr('for', 'lenke-fjerner');

    //     var input = $('<input/>')
    //         .attr('type', 'checkbox')
    //         .attr('id', 'lenke-fjerner')
    //         .attr('name', 'lenke-fjerner')
    //         .attr('value', 'Inkluder lenker')
    //         .addClass('rootelement')
    //         .insertBefore(label);

    $('#print-dialog :checkbox').change(function() {
        // if($(this).val() === 'Inkluder lenker') {
        //     linkPrintToggle();
        // }
        //Root elements
        if ($(this).is(':checked') && $(this).is('.rootelement')) {
            togglePrintButton();
            //For root elements with sub elements, check checkbox and add printclass
            if (
                $(this)
                    .closest('.element')
                    .has('.sub-elements')
            ) {
                var elements = $(this)
                    .parent()
                    .parent()
                    .find('.subelement');
                $.each(elements, function() {
                    $(this).prop('checked', true);
                    $("[data-printsubsection='" + $(this).val() + "']")
                        .addClass('should-print')
                        .removeClass('should-not-print');
                });
            }
            // Choose all checkbox
            if ($(this).val() === 'Velg alt') {
                $('[data-printsection]')
                    .removeClass('should-not-print')
                    .addClass('should-print');
                // linkPrintToggle();
            } else {
                var unCheckedElements = $(
                    '#print-dialog :checkbox:not(:checked)'
                ).not('[name=chooseall]');
                $.each(unCheckedElements, function() {
                    $("[data-printsection='" + $(this).val() + "']")
                        .addClass('should-not-print')
                        .removeClass('should-print');
                    $("[data-printsubsection='" + $(this).val() + "']")
                        .addClass('should-not-print')
                        .removeClass('should-print');
                });
                $("[data-printsection='" + $(this).val() + "']")
                    .addClass('should-print')
                    .removeClass('should-not-print');
            }
        }
        //Sub elements
        else if ($(this).is(':checked') && $(this).is('.subelement')) {
            var unCheckedElements = $(
                '#print-dialog :checkbox:not(:checked)'
            ).not('[name=chooseall]');
            $.each(unCheckedElements, function() {
                $("[data-printsection='" + $(this).val() + "']")
                    .addClass('should-not-print')
                    .removeClass('should-print');
                $("[data-printsubsection='" + $(this).val() + "']")
                    .addClass('should-not-print')
                    .removeClass('should-print');
            });
            $("[data-printsubsection='" + $(this).val() + "']")
                .addClass('should-print')
                .removeClass('should-not-print');
        } else if ($(this).is(':not(:checked)') && $(this).is('.subelement')) {
            $("[data-printsubsection='" + $(this).val() + "']")
                .addClass('should-not-print')
                .removeClass('should-print');
        }

        // Unchecking, could maybe be removed
        else {
            if (
                $(this)
                    .closest('.element')
                    .has('.sub-elements')
            ) {
                var elements = $(this)
                    .parent()
                    .parent()
                    .find('.subelement');
                $.each(elements, function() {
                    $(this).prop('checked', false);
                    $("[data-printsubsection='" + $(this).val() + "']")
                        .addClass('should-not-print')
                        .removeClass('should-print');
                });
            }

            if ($(this).val() === 'Velg alt') {
                // linkPrintToggle();
                $('[data-printsection]')
                    .addClass('should-not-print')
                    .removeClass('should-print');
            } else {
                $("[data-printsection='" + $(this).val() + "']")
                    .removeClass('should-print')
                    .addClass('should-not-print');
            }
            togglePrintButton();
        }
    });


    function togglePrintButton() {
        if ($('.m_printdialog .print-panel input:checkbox:checked').not('#lenke-fjerner').length > 0) {
            $('.m_printdialog .print-button button').prop('disabled', false);
        }
        else {
            $('.m_printdialog .print-button button').prop('disabled', true);

        }
    }
    function linkPrintToggle() {
        var chk = $('#lenke-fjerner').is(':checked');
        if (chk) $('a').addClass('include-print-link');
        else $('a').removeClass('include-print-link');
    }
}

window.printButtons = printButtons;


/***/ }),

/***/ "./src/js/master/pseudoLinkBoxes.js":
/*!******************************************!*\
  !*** ./src/js/master/pseudoLinkBoxes.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// For components where we have to make something act like a link when it actually isn't

function pseudoLinkBoxes() {

    var pseudoLinkBoxes = $('.js-pseudo-link-box');

    if (!inDesignMode() && pseudoLinkBoxes.length !== 0) {

        pseudoLinkBoxes.each(function () {

            var linkBox = $(this),
                link = linkBox.find('a, button').first(),
                pseudoLink = linkBox.find('.js-pseudo-link').addBack('.js-pseudo-link'),
                hoverElements = link.add(pseudoLink);

            hoverElements.each(function () {


                hoverElements.addClass('pseudo-link');

                hoverElements.on('mouseenter', function () {
                    hoverElements.addClass('hover');
                });

                hoverElements.on('mouseleave', function () {
                    hoverElements.removeClass('hover');
                });
            });

            link.on('click', function (event) {
                if (link.is('button')) {
                    event.stopPropagation();
                }
            });

            pseudoLink.on('click', function (event) {
                console.log(pseudoLink);
                event.preventDefault();
                event.stopPropagation();

                if (link.is('a')) {
                    window.location = linkBox.find('.js-pseudo-link-source').attr('href');
                } else if (link.is('button')) {
                    console.log(link);
                    link.click();
                }
            });
        });
    }
}

window.pseudoLinkBoxes = pseudoLinkBoxes;

/***/ }),

/***/ "./src/js/master/pulldown.js":
/*!***********************************!*\
  !*** ./src/js/master/pulldown.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function pulldown() {
    var pulldowns = $('.js-pulldown-expand');

    if (pulldowns.length) {
        pulldowns.each(function() {
            var pulldown = $(this),
                tiles = pulldown.find('.js-pulldown-tile'),
                rbViewSelection = pulldown.attr('data-rbview'),
                pulldownExpandableBlocks = pulldown.getExpandableBlocks(),
                pulldownExpand = $(pulldownExpandableBlocks[0].expand),
                pulldownExpandable = $(pulldownExpandableBlocks[0].expandable),
                pulldownExpander = $(pulldownExpandableBlocks[0].expander),
                pulldownFooter = pulldownExpand.find('.js-pulldown-footer'),
                movedTiles = pulldown.find(
                    '.js-pulldown-top .js-pulldown-tile'
                ),
                tileGroup = pulldownExpandable.find('.o_tile-group'),
                
                tilesPerRow;
            
            if(tileGroup.length === 0) {
                tileGroup = pulldownExpandable.find('.js-pulldown-links');
            }
            console.log(tileGroup);
            var tileGroupClasses = tileGroup.attr('class');

            // Clicking or focusing on a tile link adds a
            // class that makes it look like the whole tile is focused
            tiles.each(function() {
                var tileLink = $(this).find('a'),
                    focusedTile = tileLink.closest('li');

                tileLink.on('focusout.pulldown', function() {
                    $('.focused').removeClass('focused');
                });

                tileLink.on('focusin.pulldown', function() {
                    focusedTile.addClass('focused');
                });
            });

            // For regular tiles, set the number of tiles per row to the layout number.
            // For event tiles, set the number of tiles to one or two.
            //For locations, set the number of tiles to 2X the layout number
            if(tileGroup.hasClass('links')) {
                tilesPerRow = layoutQ().number[0]*2;
            }

            else if (tileGroup.hasClass('events')) {
                if (layoutQ().number[0] <= 2) {
                    tilesPerRow = 2;
                } else {
                    tilesPerRow = 4;
                }
            } else {
                tilesPerRow = layoutQ().number[0];
            }

            // Reset the pulldown -----------------------------
            pulldownExpandableBlocks.removeExpandability();
            if(tileGroup.hasClass('links')) {
                pulldownExpandable.find('.links').prepend(movedTiles);
            }
            else {
                pulldownExpandable.find('.o_tile-group').prepend(movedTiles);
            }
            
            pulldown.find('.js-pulldown-top').remove();

            // Show the footer if it has been hidden.
            if (pulldownFooter.length !== 0) {
                pulldownFooter.show();
            }

            // Set max visible tiles from data-rbview
            var maxVisibleTiles;
            switch(rbViewSelection) {
                case '0':
                    maxVisibleTiles = 4;
                    break;
                case '1':
                    maxVisibleTiles = tilesPerRow;
                    break;
                case '2':
                    maxVisibleTiles = tilesPerRow;
                    break;
                case '3':
                    maxVisibleTiles = 8;
                    break;
                default:
                    maxVisibleTiles = tilesPerRow;
            }

            // Set up the pulldown -----------------------------
            if (tiles.length > maxVisibleTiles) {
                pulldownExpandableBlocks.addExpandability();
                if(tileGroup.hasClass('links')) {
                    pulldownExpandable.before(
                        '<ul class="links js-pulldown-top"></ul>'
                    );
                }
                else {
                    pulldownExpandable.before(
                        '<ul class="o_tile-group js-pulldown-top"></ul>'
                    );
                }

                

                var visibleTiles = tiles.slice(0, maxVisibleTiles),
                    topRow = pulldown.find('.js-pulldown-top');

                topRow.prepend(visibleTiles);
                topRow.addClass(tileGroupClasses);

                // When expanding the pulldown with the keyboard,
                // move focus to the first tile in the expanded section.
                var firstExpandedTile = pulldownExpandable
                    .find('.js-pulldown-tile a')
                    .first();
                pulldownExpander.on('keyup', function(e) {
                    var pressedKey = e.which;
                    if (pressedKey === 13 || pressedKey === 32) {
                        if (pulldownExpand.hasClass('expanded')) {
                            firstExpandedTile.focus();
                        }
                    }
                });

                // TODO: Handle focus change when the focus would be hidden inside the pulldown when the layout changes

                // Set the button text
                var hiddenTilesSpan = pulldownExpander.find('span'),
                    numberOfHiddenTiles = tiles.length - visibleTiles.length;
                    
                hiddenTilesSpan.attr('data-hidden-tiles', numberOfHiddenTiles);
            } else {
                // All the tiles can be shown

                // If the footer does not contain a "see all" link it's an expander,
                // But since all tiles are visible, there is no need to show
                // the expander button.

                if (pulldownFooter.find($('.button-link')).length === 0) {
                    // Remove the footer from the DOM
                    pulldownFooter.hide();
                }
            }
        });
    }
}

window.pulldown = pulldown;


/***/ }),

/***/ "./src/js/master/removeZeroHeightSections.js":
/*!***************************************************!*\
  !*** ./src/js/master/removeZeroHeightSections.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #removeZeroHeightSections
// Checks the height of expandable sections and adds
// a class to nix the margin if so.
function removeZeroHeightSections() {
    var firstLevelHorizontalSections = $('main .o_horizontal-section');

    firstLevelHorizontalSections.each(function() {
        if ($(this).innerHeight() === 0) {
            $(this).addClass('zeroHeightHorizontalSection');
            $(this).addClass('empty');
        }
    });
}

window.removeZeroHeightSections = removeZeroHeightSections;


/***/ }),

/***/ "./src/js/master/resizeIframe.js":
/*!***************************************!*\
  !*** ./src/js/master/resizeIframe.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function resizeIframe() {
    var iframes = initResponsiveIframes();

    function initResponsiveIframes() {
        iframes = $(
            "iframe[src*='vimeo'], iframe[src*='youtu'], .js-responsive-iframe"
        );

        iframes.each(function() {
            if (!$(this).attr('data-AR')) {
                var dataAR = $(this).innerHeight() / $(this).innerWidth();

                $(this)
                    .attr('allowfullscreen', '')
                    .attr('height', '')
                    .attr('data-AR', dataAR)
                    .attr({ width: '100%', frameborder: 'no' });

                $(this)
                    .closest('.ms-rte-embedil')
                    .css('display', 'block');
                $(this)
                    .closest('.ms-webpart-zone')
                    .css('display', 'block');
            }
        });

        responsiveIframes(iframes);

        return iframes;
    }

    function responsiveIframes(iframes) {
        iframes.each(function() {
            var newHeight = Math.round(
                $(this).width() * $(this).attr('data-AR')
            );

            $(this).attr({
                height: newHeight
            });
        });
    }
}

window.resizeIframe = resizeIframe;


/***/ }),

/***/ "./src/js/master/responsiveExpandableBlocks.js":
/*!*****************************************************!*\
  !*** ./src/js/master/responsiveExpandableBlocks.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// // #responsiveExpandableBlocks =======================================
// // Add collapsing/expanding functionality to responsive expanding blocks in 1-col.
//
function responsiveExpandableBlocks() {
    var responsiveExpandableBlocks = $('.js-responsive-expand')
        .not('.js-responsive-expandable .js-responsive-expand')
        .not('.js-responsive-keep-open')
        .getExpandableBlocks();

    if (layoutQ().number[0] !== 1) {
        responsiveExpandableBlocks.removeExpandability();
    } else {
        responsiveExpandableBlocks.addExpandability();
    }
}

window.responsiveExpandableBlocks = responsiveExpandableBlocks;


/***/ }),

/***/ "./src/js/master/searchExpander.js":
/*!*****************************************!*\
  !*** ./src/js/master/searchExpander.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Handles keyboard nav in the header search field and makes sure that the field stays open if it has content.
function searchExpander() {

    if ($('.js-site-search').length !== 0 && $('#header-site-search').length !== 0) {
        var siteSearch = $('.js-site-search');
        var searchButton = $('#header-search-button');
        var searchInput = $('#header-search-input');
        var menuButton = $('#menuButton');
        var header = $('.o_framework-header .container');
        var searchToggle = $('#header-search-toggle');
        var searchMenu = $('.search-menu');
        var previouslyFocused = $();

        searchToggle.off('.searchExpander');
        searchInput.off('.searchExpander');
        searchButton.off('.searchExpander');
        menuButton.off('.searchExpander');
        
        if (layoutQ().number[0] >= 3) {
            searchToggle.removeClass('expanded').addClass('collapsed');
            searchMenu.removeClass('expanded').addClass('collapsed');

            // header.keyup(function(e) {
            //     var code = e.keyCode || e.which;
            //     var currentFocus = $(':focus');
            //     if(code === 9) {
            //         if (!searchInput.val() && currentFocus.is(searchButton)) {
            //             if (previouslyFocused.is(menuButton)) {
            //                 searchInput.focus();
            //                 previouslyFocused = searchInput;
            //             }
            //             else if (previouslyFocused.is(searchInput)) {
            //                 menuButton.focus();
            //                 previouslyFocused = menuButton;
            //             }
            //         }
            //         else {
            //             previouslyFocused = currentFocus;
            //         }
            //     }
            // });

            searchInput.on('focus.searchExpander', function(e){
                e.stopPropagation();
                siteSearch.addClass('expanded');
            });

            searchInput.on('blur.searchExpander', function(e){
                e.stopPropagation();
                if(!searchInput.val()){
                    siteSearch.removeClass('expanded');
                }
            });
            searchButton.on('click.searchExpander', function(e){
                return PageSearch();
            });
            searchInput.on('keypress.searchExpander', function(e) {
                var code = e.keyCode || e.which;
                if(code === 13) return PageSearch();
            });
            

        }
        if (layoutQ().number[0] <= 2) {
            searchToggle.on('click.searchExpander', function(e) {
                if ($(this).hasClass('expanded')) { CollapseSearchMenu(); }
                else { ExpandSearchMenu(); }
            });

            searchButton.on('click.searchExpander', function(e){
                return PageSearch();
            });

            searchInput.on('keypress.searchExpander', function(e) {
                var code = e.keyCode || e.which;
                if(code === 13) return PageSearch();
            });

            menuButton.on('click.searchExpander', function(e) {
                if(searchToggle.hasClass('expanded')) {
                    CollapseSearchMenu();
                }
            });
        }

        function PageSearch(){
            GoToPage('/sok?k=' + escapeProperly(searchInput.val()));
            return false;
        }

        function ExpandSearchMenu() {
            $('header.o_framework-header').removeClass('expanded').addClass('collapsed');
            menuButton.attr('aria-expanded', false);
            searchToggle.removeClass('collapsed').addClass('expanded').attr('aria-expanded', true);
            searchMenu.removeClass('collapsed').addClass('expanded').attr('aria-expanded', true);
        }

        function CollapseSearchMenu() {
            searchToggle.removeClass('expanded').addClass('collapsed').attr('aria-expanded', false);
            searchMenu.removeClass('expanded').addClass('collapsed').attr('aria-expanded', false);
        }
    }
    
}

window.searchExpander = searchExpander;


/***/ }),

/***/ "./src/js/master/sortExpandableSections.js":
/*!*************************************************!*\
  !*** ./src/js/master/sortExpandableSections.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// #sortExpandableSections
// If content isn't in an expandable section, move it into the nearest expandable section

function sortExpandableSections() {
    if (!inDesignMode()) {
        var firstLevelExpandSections = $('main .js-responsive-expander')
                .not('.js-responsive-expandable .js-responsive-expander')
                .closest('.js-responsive-expand')
                .closest('main > *'),
            nonExpandSections = firstLevelExpandSections
                .first()
                .nextAll()
                .not(firstLevelExpandSections)
                .not($('footer'))
                .not('.o_promoted-content');

        nonExpandSections.each(function() {
            var orphanSection = $(this),
                closestExpandSection = orphanSection
                    .prevAll()
                    .filter(firstLevelExpandSections)
                    .first(),
                closestExpandableSection = closestExpandSection.find(
                    '.js-responsive-expandable'
                );

            if ($.inArray(closestExpandableSection, nonExpandSections)) {
                var contentToMove = orphanSection.find(
                    '.js-responsive-expandable > .container'
                );
                if (contentToMove.length > 0) {
                    closestExpandableSection.append(contentToMove);
                    contentToMove.addClass('sortExpandableSections');
                    orphanSection.remove();
                }
            }
        });
    }
}

window.sortExpandableSections = sortExpandableSections;


/***/ }),

/***/ "./src/js/master/stickyNavbar.js":
/*!***************************************!*\
  !*** ./src/js/master/stickyNavbar.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/master/textSizeExpander.js":
/*!*******************************************!*\
  !*** ./src/js/master/textSizeExpander.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿// #textSizeExpander =============================================================
// Used to fix issues with expand/collapse on text size button when using keyboard
function textSizeExpander() {
    $('.text-size button').focusout(function() {
        $(this).click();
    });
}

window.textSizeExpander = textSizeExpander;


/***/ }),

/***/ "./src/js/master/tileGroupFocus.js":
/*!*****************************************!*\
  !*** ./src/js/master/tileGroupFocus.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//Fix missing .focused class for tile groups in /arrangementer
function tileGroupFocus () {
    var tileGroups = $('.o_tile-group.events');
    if(tileGroups.length) {
        tileGroups.each(function(){
            var tiles = $(this).find('.tile');

            // Clicking or focusing on a tile link adds a
            // class that makes it look like the whole tile is focused
            tiles.each(function() {
                var tileLink = $(this).find('a'),
                    focusedTile = tileLink.closest('li');

                tileLink.on('focusout.tilegroup', function() {
                    $('.focused').removeClass('focused');
                });

                tileLink.on('focusin.tilegroup', function() {
                    focusedTile.addClass('focused');
                });
            });
        })
    }
}

window.tileGroupFocus = tileGroupFocus;

/***/ }),

/***/ "./src/js/master/triggerGAEvent.js":
/*!*****************************************!*\
  !*** ./src/js/master/triggerGAEvent.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

﻿function triggerGAEvent(event) {
    var srcElement = $(this).data('event-source')
            ? this
            : $(this)
                  .parents('[data-event-source]')
                  .get(0),
        typeElement = $(this).data('event-type')
            ? this
            : $(this)
                  .parents('[data-event-type]')
                  .get(0);

    if (!(srcElement && typeElement)) return true;

    var src = $(srcElement).data('event-source'),
        type = $(typeElement).data('event-type') || '',
        value =
            $(this).data('event-value') ||
            $(typeElement)
                .children('[data-event-value]')
                .data('event-value') ||
            '';

    if (src && ga) {
        ga(
            'send',
            'event',
            src + ' - ' + document.location.hostname,
            type,
            value
        );
        ga(
            'system.send',
            'event',
            src + ' - ' + document.location.hostname,
            type,
            value
        );
    }
    return true;
}

window.triggerGAEvent = triggerGAEvent;


/***/ }),

/***/ "./src/js/master/unhideMenu.js":
/*!*************************************!*\
  !*** ./src/js/master/unhideMenu.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function unhideMenu() {
    $('.js-hide-menu').remove();
}

window.unhideMenu = unhideMenu;

/***/ })

/******/ });
//# sourceMappingURL=master.js.map