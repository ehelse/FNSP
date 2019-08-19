// #feedbackModule =====================================================
// Attaches events to feedback module
function feedbackModule() {
    if ($('.m_feedback') && typeof FNSP !== 'undefined') {
        var feedbackThanksInHash = window.location.hash.indexOf('takk-for-tilbakemelding') > -1;
        if (feedbackThanksInHash) {
            $('.m_feedback fieldset').remove();
            $('.m_feedback .feedbackresponse').removeClass('hidden');
            return;
        }
        FNSP.FeedbackErrorMessage = $('.m_feedback #error-message').text();
        FNSP.ChoiceTimestamp;
        $('.m_feedback button[id*="FeedbackIs"]').on('click keypress', function (e) {
            if (e.which === 13 || e.which === 32 || e.type === 'click') {
                e.preventDefault();
                var target = e.currentTarget.id;
                FNSP.ChoiceTimestamp = Date.now();
                if (target.indexOf('Positive') > -1) {
                    $('.m_feedback #FeedbackIsPositiveChoice').prop('checked', true);
                    $('.m_feedback #FeedbackIsNegativeChoice').prop('checked', false);
                }
                else {
                    $('.m_feedback #FeedbackIsNegativeChoice').prop('checked', true);
                    $('.m_feedback #FeedbackIsPositiveChoice').prop('checked', false);
                }

                $('.m_feedback input[id*="NumberOfCols"]').val(layoutQ().number[0]);
                $('.m_feedback button[id*="FeedbackIs"]').not(document.getElementById(target)).removeClass('selected').removeAttr('data-selected');

                $(this).addClass('selected').attr('data-selected', 'true');

                var placeholder = $('#feedback_' + $(this).attr('id').slice(8)).text();

                $('.m_feedback .feedbackformcontrols textarea[id*="FeedbackMessage"]')
                    .keyup(function () {
                        var left = 255 - $(this).val().length;
                        if (left < 255) {
                            $('.m_feedback .feedbackformcontrols .error').text('');
                            $('.m_feedback .feedbackformcontrols textarea[id$="FeedbackMessage"]').removeClass('has-error');
                        }
                        if (left >= 0) {
                            $('[id$="feedbackcounter"]').text(left);
                        }
                            
                        if (FNSP.PBSubmit) {
                            if (($('.m_feedback textarea').val().length > 0 &&
                                $('#FeedbackIsPositive').attr('data-selected') === 'true') ||
                                $('#FeedbackIsNegative').attr('data-selected') === 'true') {
                                $('.m_feedback input[id*="SubmitFeedback"]').removeAttr('disabled').removeClass('aspNetDisabled');
                            }
                            else {
                                $('.m_feedback input[id*="SubmitFeedback"]').attr('disabled', 'disabled');
                            }
                        }
                    });
                $('.m_feedback label[id*="FeedbackLabel"]').text(placeholder);
                $('.m_feedback .feedbackformcontrols.hidden').slideUp(0, function () {
                        $(this).removeClass('visuallyhidden hidden').slideDown(500);
                    }
                );
            }
        });
        FNSP.SubmitFeedBack = function () {
            var FirstToPhoneyFieldValue = $('.m_feedback #FirstToPhoneyField').val();
            var submittedTimestamp = Date.now();
            var serviceUri = _spPageContextInfo.webAbsoluteUrl + '/_vti_bin/FNSP/JsonRpc.svc/Call';
            var submittedChoice = $('.m_feedback button[id*="FeedbackIsPositive"]').attr('data-selected') === 'true';
            var feedbackMessage = $('.m_feedback .feedbackformcontrols textarea[id$="FeedbackMessage"]').val().replace(/\r\n|\r|\n/g, ' ');
            if (feedbackMessage.replace(/[^a-z0-9-]/gi,'').length < 1) {
                $('.m_feedback .feedbackformcontrols textarea[id$="FeedbackMessage"]').addClass('has-error');
                $('.m_feedback .feedbackformcontrols textarea[id$="FeedbackMessage"]').focus();
                var feedbackMessage = $('.m_feedback .feedbackformcontrols .error').text(FNSP.FeedbackErrorMessage);
                return;
            }

            var deviceNumber = layoutQ().number[0];
            var pageUrl = window.location.href;

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: serviceUri,
                dataType: 'json',
                data: JSON.stringify({
                    method: 'feedback',
                    params: [
                        submittedChoice,
                        feedbackMessage,
                        FirstToPhoneyFieldValue,
                        pageUrl,
                        FNSP.Current.UserPreferredLCID,
                        deviceNumber,
                        FNSP.ChoiceTimestamp,
                        submittedTimestamp
                    ]
                }),
                success: function (response) {
                    if (!response.error) {
                        $('.m_feedback .feedbackresponse').text(JSON.parse(response.result));
                        $('.m_feedback fieldset').remove();
                        $('.m_feedback .feedbackresponse').removeClass('hidden');
                    } else {
                        $('.m_feedback fieldset').remove();
                    }
                },
                error: function (jqXHR, txtStatus, errorThrown) {
                    console.error(txtStatus + ' - ' + errorThrown);
                }
            });
            return false;
        };
    }
}

window.feedbackModule = feedbackModule;
