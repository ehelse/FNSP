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
