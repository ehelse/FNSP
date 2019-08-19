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
