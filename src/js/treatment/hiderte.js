$(document).ready(function() {
    // Hide RTE controls if there is no content inside
    $('.treatmentsection').each(function() {
        var contentdiv = $(this).find('.ms-rtestate-field').find('[id*=_content]');
        if(contentdiv.length > 0){
            var rteContentLength = $(this).find('.ms-rtestate-field').find('[id*=_content]').html().length;
            var rteAdditionalContentLength = $(this).find('.ms-rtestate-field').find('[id*=vid_]').next().length;
            if(rteContentLength > 0 || rteAdditionalContentLength > 0){
                $(this).show();
            } else {
                $(this).hide();
            }
        }        
    });
});
