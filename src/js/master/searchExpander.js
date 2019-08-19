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
