// #printButtons() =====================================================
// Used to initialize print buttons from print panel
function printButtons() {
    // Toggle the print button initially
    togglePrintButton();
    
    // If clicked on "Velg alt", select all checkboxes
    $(".m_printdialog .print-panel input[name='chooseall']").click(function() {
        $('.m_printdialog .print-panel input:checkbox')
            .not(this)
            .prop('checked', this.checked);
    });

    var sectionsToPrint = $("[data-printsection!=''][data-printsection]");
    var printList = $('.print-panel .print-list');
    $.each(sectionsToPrint, function(i) {
        if ($(this).closest('.content-hidden-no-location').length === 1) {
            return;
        }

        var sectionName = $(this).attr('data-printsection');

        var li = $('<li/>')
            .addClass('element')
            .appendTo(printList);

        var label = $('<label/>')
            .appendTo(li)
            .text(sectionName)
            .attr('for', sectionName);

        var input = $('<input/>')
            .attr('type', 'checkbox')
            .attr('id', sectionName)
            .attr('name', sectionName)
            .attr('value', sectionName)
            .addClass('rootelement')
            .insertBefore(label);

        /* Removed generation of subsections for now
        
        var subsectionsToPrint = $("[data-printsection='" + $(this).attr("data-printsection") + "']").not(":has([data-printsection])").find("[data-printsubsection]");
        if (subsectionsToPrint) {
            var ul = $("<ul/>")
                .addClass("sub-elements")
                .appendTo(li)
            $.each(subsectionsToPrint, function (i) {
                var subsectionName = $(this).attr("data-printsubsection");

                var li = $("<li/>")
                        .addClass("element")
                        .appendTo(ul);

                var label = $("<label/>")
                          .appendTo(li)
                          .text(subsectionName)
                          .attr('for', subsectionName);

                var input = $("<input/>")
                      .attr("type", "checkbox")
                      .attr('id', subsectionName)
                      .attr("name", subsectionName)
                      .attr("value", subsectionName)
                      .addClass("subelement")
                      .insertBefore(label);

                input.after($(this).attr("data-printsubsection"))
            });
        }
        */
    });

    // Others
    // var otherPrintList = $('<ul/>').addClass('print-list');
    // var divider = $('<hr/>').insertAfter(printList);
    // otherPrintList.insertAfter(divider);
    // var li = $('<li/>')
    //         .addClass('element')
    //         .appendTo(otherPrintList);

    //     var label = $('<label/>')
    //         .appendTo(li)
    //         .text('Inkluder lenker')
    //         .attr('for', 'lenke-fjerner');

    //     var input = $('<input/>')
    //         .attr('type', 'checkbox')
    //         .attr('id', 'lenke-fjerner')
    //         .attr('name', 'lenke-fjerner')
    //         .attr('value', 'Inkluder lenker')
    //         .addClass('rootelement')
    //         .insertBefore(label);

    $('#print-dialog :checkbox').change(function() {
        // if($(this).val() === 'Inkluder lenker') {
        //     linkPrintToggle();
        // }
        //Root elements
        if ($(this).is(':checked') && $(this).is('.rootelement')) {
            togglePrintButton();
            //For root elements with sub elements, check checkbox and add printclass
            if (
                $(this)
                    .closest('.element')
                    .has('.sub-elements')
            ) {
                var elements = $(this)
                    .parent()
                    .parent()
                    .find('.subelement');
                $.each(elements, function() {
                    $(this).prop('checked', true);
                    $("[data-printsubsection='" + $(this).val() + "']")
                        .addClass('should-print')
                        .removeClass('should-not-print');
                });
            }
            // Choose all checkbox
            if ($(this).val() === 'Velg alt') {
                $('[data-printsection]')
                    .removeClass('should-not-print')
                    .addClass('should-print');
                // linkPrintToggle();
            } else {
                var unCheckedElements = $(
                    '#print-dialog :checkbox:not(:checked)'
                ).not('[name=chooseall]');
                $.each(unCheckedElements, function() {
                    $("[data-printsection='" + $(this).val() + "']")
                        .addClass('should-not-print')
                        .removeClass('should-print');
                    $("[data-printsubsection='" + $(this).val() + "']")
                        .addClass('should-not-print')
                        .removeClass('should-print');
                });
                $("[data-printsection='" + $(this).val() + "']")
                    .addClass('should-print')
                    .removeClass('should-not-print');
            }
        }
        //Sub elements
        else if ($(this).is(':checked') && $(this).is('.subelement')) {
            var unCheckedElements = $(
                '#print-dialog :checkbox:not(:checked)'
            ).not('[name=chooseall]');
            $.each(unCheckedElements, function() {
                $("[data-printsection='" + $(this).val() + "']")
                    .addClass('should-not-print')
                    .removeClass('should-print');
                $("[data-printsubsection='" + $(this).val() + "']")
                    .addClass('should-not-print')
                    .removeClass('should-print');
            });
            $("[data-printsubsection='" + $(this).val() + "']")
                .addClass('should-print')
                .removeClass('should-not-print');
        } else if ($(this).is(':not(:checked)') && $(this).is('.subelement')) {
            $("[data-printsubsection='" + $(this).val() + "']")
                .addClass('should-not-print')
                .removeClass('should-print');
        }

        // Unchecking, could maybe be removed
        else {
            if (
                $(this)
                    .closest('.element')
                    .has('.sub-elements')
            ) {
                var elements = $(this)
                    .parent()
                    .parent()
                    .find('.subelement');
                $.each(elements, function() {
                    $(this).prop('checked', false);
                    $("[data-printsubsection='" + $(this).val() + "']")
                        .addClass('should-not-print')
                        .removeClass('should-print');
                });
            }

            if ($(this).val() === 'Velg alt') {
                // linkPrintToggle();
                $('[data-printsection]')
                    .addClass('should-not-print')
                    .removeClass('should-print');
            } else {
                $("[data-printsection='" + $(this).val() + "']")
                    .removeClass('should-print')
                    .addClass('should-not-print');
            }
            togglePrintButton();
        }
    });


    function togglePrintButton() {
        if ($('.m_printdialog .print-panel input:checkbox:checked').not('#lenke-fjerner').length > 0) {
            $('.m_printdialog .print-button button').prop('disabled', false);
        }
        else {
            $('.m_printdialog .print-button button').prop('disabled', true);

        }
    }
    function linkPrintToggle() {
        var chk = $('#lenke-fjerner').is(':checked');
        if (chk) $('a').addClass('include-print-link');
        else $('a').removeClass('include-print-link');
    }
}

window.printButtons = printButtons;
