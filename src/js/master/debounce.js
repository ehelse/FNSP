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