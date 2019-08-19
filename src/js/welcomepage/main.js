$(document).ready(function() {
    fixSafariSearchForm();
    //Remove unused H1 for all sites except nasjonal
    if ($('main.WelcomePage:not(.nasjonal)').length) {
        $('.o_page-header h1').remove();
    }
    
});
