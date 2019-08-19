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
