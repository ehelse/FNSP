// #nessagesModule =====================================================
// Attaches to messages module used on treatments

function messagesModule() {
    if (typeof FNSP !== 'undefined') {
        function getUser() {
            var deferred = $.Deferred();
            var context = new SP.ClientContext.get_current();
            var web = context.get_web();
            var currentUser = web.get_currentUser();
            var userObject = null;
            currentUser.retrieve();
            context.load(web);
            context.executeQueryAsync(
                Function.createDelegate(this, function() {
                    userObject = web.get_currentUser();
                    deferred.resolve(userObject);
                }),
                Function.createDelegate(this, function() {
                    deferred.reject(userObject);
                })
            );
            return deferred.promise();
        }

        FNSP.SubmitMessage = function(message) {
            var serviceUri =
                _spPageContextInfo.webAbsoluteUrl +
                '/_vti_bin/FNSP/JsonRpc.svc/Call';
            getUser()
                .done(function(user) {
                    var userName = user.get_loginName();
                    var termId = $(
                        ".m_commontextmessages div[id*='termid']"
                    ).text();
                    var termLabel = $(
                        ".m_commontextmessages div[id*='termvalue']"
                    ).text();
                    $.ajax({
                        type: 'POST',
                        contentType: 'application/json',
                        url: serviceUri,
                        dataType: 'json',
                        data: JSON.stringify({
                            method: 'commonmessages',
                            params: [message, termId, termLabel, userName]
                        }),
                        success: function(response) {
                            if (!response.error) {
                                FNSP.GetMessage();
                                $('#editpanel').hide('slow');
                                $('#messagecontrols a').show();
                            } else {
                                $('#viewpanel').html(
                                    'Feil ved innsending av melding'
                                );
                            }
                        },
                        error: function(jqXHR, txtStatus, errorThrown) {
                            console.log(txtStatus + ' - ' + errorThrown);
                        }
                    });
                })
                .fail(function() {
                    console.log('Get user failed');
                });

            return false;
        };

        FNSP.GetMessage = function() {
            var serviceUri =
                _spPageContextInfo.webAbsoluteUrl +
                '/_vti_bin/FNSP/JsonRpc.svc/Call';
            var termId = $(".m_commontextmessages div[id*='termid']").text();
            getUser().done(function(user) {
                var userName = user.get_loginName();
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: serviceUri,
                    dataType: 'json',
                    data: JSON.stringify({
                        method: 'commonmessages',
                        params: [termId, userName]
                    }),
                    success: function(response) {
                        if (!response.error) {
                            var result = response.result.replace(/\"/g, '');
                            if (
                                result !== '' ||
                                window.location.href.indexOf('fellesinnhold') >
                                    -1
                            ) {
                                $('.m_commontextmessages').show('fast');
                            }
                            $('#viewpanel').html(result);
                            if ($('#editpanel')) {
                                $('#editpanel textarea').val(result);
                            }
                        } else {
                            $('#viewpanel').html(
                                'Feil ved visning av meldinger'
                            );
                        }
                    },
                    error: function(jqXHR, txtStatus, errorThrown) {
                        console.log(txtStatus + ' - ' + errorThrown);
                    }
                });
            });
            return false;
        };

        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', FNSP.GetMessage);

        $(window).ready(function() {
            if ($('.m_commontextmessages')) {
                $('.m_commontextmessages').hide();
                $('#editpanel').hide();
                $('#editpanel .submit').click(function(e) {
                    e.preventDefault();
                    var message = $('#editpanel textarea').val();
                    FNSP.SubmitMessage(message);
                });
                $('#editpanel .cancel').click(function(e) {
                    e.preventDefault();
                    $('#editpanel').hide('slow');
                    $('#viewpanel').show();
                    $('#messagecontrols a').show();
                });

                $('#messagecontrols a').click(function(e) {
                    e.preventDefault();
                    $(this).hide();
                    $('#editpanel').show('slow');
                });
            }
        });
    }
}

window.messagesModule = messagesModule;
