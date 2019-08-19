// #textSizeExpander =============================================================
// Used to fix issues with expand/collapse on text size button when using keyboard
function textSizeExpander() {
    $('.text-size button').focusout(function() {
        $(this).click();
    });
}

window.textSizeExpander = textSizeExpander;
