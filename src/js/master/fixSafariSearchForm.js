// #fixSafariSearchForm ==========================================================================================
//Fix for issues with Safari and search forms where keyboard triggers selection of language menu instead of search
function fixSafariSearchForm() {
    if (!inDesignMode()) {
        if ($('.js-language ul').length) {
            var attrs = {};
            $.each(
                $('.page-header-content .m_search-box')[0].attributes,
                function(idx, attr) {
                    attrs[attr.nodeName] = attr.nodeValue;
                }
            );
            $('.page-header-content .m_search-box').replaceWith(function() {
                return $('<form />', attrs).append($(this).contents());
            });
            $('form.m_search-box')
                .attr('action', '.')
                .attr('onsubmit', 'return false;');
        }
    }
}

window.fixSafariSearchForm = fixSafariSearchForm;
