function triggerGAEvent(event) {
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
