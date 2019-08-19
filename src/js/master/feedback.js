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
