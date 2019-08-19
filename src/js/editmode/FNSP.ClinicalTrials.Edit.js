FNSP = FNSP || {};
FNSP.LoadInfoFromCristin = function() {
    $('#cristinInfoPanel').empty();
    var cristinId = $('[id*="CRIStin_input"]').val();
    if (cristinId) {
        var requestUrl = 'https://api.cristin.no/v2/projects/' + cristinId;
        $.ajax(requestUrl)
            .done(function(data) {
                var projectInfo = JSON.parse(JSON.stringify(data));
                console.log(projectInfo);
                var projectTitles = FNSP.GetValueFromCristinObject(
                    projectInfo.title
                );
                var projectSummaries = FNSP.GetValueFromCristinObject(
                    projectInfo.popular_scientific_summary
                );
                var participants = FNSP.GetValueFromCristinObject(
                    projectInfo.participants
                );
                var approvals = FNSP.GetValueFromCristinObject(
                    projectInfo.approvals
                );
                if (projectTitles.length > 0) {
                    $("textarea[title*='Vitenskapelig tittel']").val(
                        projectTitles[0]
                    );
                }
                if (projectTitles.length > 1) {
                    $('#cristinInfoPanel').append(
                        '<h4>Andre titler fra Cristin</h4>'
                    );
                    $('#cristinInfoPanel').append(
                        "<ul id='othercristintitles'></ul>"
                    );
                    for (var i = 1; i < projectTitles.length; i++) {
                        $('<li/>', {
                            text: projectTitles[i]
                        }).appendTo('#othercristintitles');
                    }
                }
                if (projectSummaries.length > 0) {
                    $('#cristinInfoPanel').append(
                        '<h4>Populærvitenskapelig sammendrag fra Cristin</h4>'
                    );
                    $('<p/>', {
                        text: projectSummaries[0]
                    }).appendTo('#cristinInfoPanel');
                } else {
                    $('#cristinInfoPanel').append(
                        '<h4>Kan ikke finne populærvitenskapelig sammendrag fra Cristin</h4>'
                    );
                }
                if (participants.length > 0) {
                    var projectManager = '';
                    for (var i = 0; i < participants.length; i++) {
                        var roles = participants[i].roles;
                        for (var j = 0; j < roles.length; j++) {
                            if (roles[j].role_code === 'PRO_MANAGER') {
                                projectManager +=
                                    participants[i].first_name +
                                    ' ' +
                                    participants[i].surname;
                            }
                        }
                    }
                    if (projectManager) {
                        $("input[title*='Prosjektleder']").val(projectManager);
                    }
                }
                if (approvals.length > 0) {
                    var rekId = '';
                    for (var i = 0; i < approvals.length; i++) {
                        if (approvals[i].approved_by === 'REK') {
                            rekId = approvals[i].approval_reference_id;
                        }
                    }
                    if (rekId) {
                        $("input[title*='REK-ID']").val(rekId);
                    }
                }
            })
            .fail(function() {
                $('#cristinInfoPanel').append(
                    '<p>Greide ikke hente info fra Cristin</p>'
                );
            });
    } else {
        $('#cristinInfoPanel').append('<p>Ingen Cristin-Id angitt</p>');
    }
};

FNSP.GetValueFromCristinObject = function(cristinData) {
    var values = [];
    if (!cristinData) return values;
    for (var key in cristinData) {
        if (cristinData.hasOwnProperty(key)) {
            values.push(cristinData[key]);
        }
    }
    return values;
};
