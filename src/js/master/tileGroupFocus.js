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