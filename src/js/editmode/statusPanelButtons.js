// #statusPanelButtons =====================================================
// Makes buttons in status panel clickable and shows / hides panels
function statusPanelButtons() {
    $('.m_status-panel .tasks li').click(function(e) {
        if ($('.m_status-panel .task-list .fields').is(':visible')) {
            $('.m_status-panel .task-list .fields').hide();
            $('.m_status-panel .task-list').removeClass('expanded');
            $(e.target)
                .closest('li')
                .removeClass('disabled');
        } else {
            $('.m_status-panel .task-list .fields').hide();
            $('.m_status-panel .task-list li.disabled').removeClass('disabled');
            var selected = $(e.target)
                .closest('li')
                .attr('data-title');
            $(e.target)
                .closest('li')
                .addClass('disabled');
            $('.m_status-panel .fields#' + selected).show();
            $('.m_status-panel .task-list').addClass('expanded');
        }
    });
    $('.m_status-panel .fields').hide();
}

window.statusPanelButtons = statusPanelButtons;
