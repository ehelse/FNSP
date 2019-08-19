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
