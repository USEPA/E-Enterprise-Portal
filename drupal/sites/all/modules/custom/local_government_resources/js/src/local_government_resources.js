var favorite_local_resources_table, all_local_resources_table;
var pane_class = ".pane-views-recommended-resources-block";

function clearResources() {
    $children = jQuery('.facet-topic-container:visible a').trigger('click');
}

(function ($) {

        function showFocusedTopicView($lgc_topic_elem) {
            $lgc_topic_elem.addClass('selected');
            $(pane_class).find('.pane-title').hide();
            $(pane_class).find('.ui-tabs-nav').hide();
            var id = $lgc_topic_elem.attr('id');
            var title = $lgc_topic_elem.text();
            var tid_array = id.split('-');
            var tid = tid_array[tid_array.length - 1];
            $('.lgc-header').text(title);
            $('.back-to-lgc-widget').show();
            $('.unfollow-lgc-topic').attr('id', 'unfollow-lgc-' + tid).show();
            favorite_local_resources_table.filterTopics(title);
        }

        var $body = $('body');
        all_local_resources_table =
            new LocalResourcesTable($("#all-local-resources"),
                Drupal.settings.local_government_resources.all_resources,
                'all');
        // Guest user can only view all the content, so they do not have tabs
        if (!Drupal.settings.is_guest) {
            var $tabs = $("#local-resources-tabs");
            $tabs.tabs();
            $tabs.find('.ui-corner-top').on('click', function (ev) {
                $(this).focus();
            });
        }
        // Initialize Manage My Topics view
        $('#manage-my-topics-wrapper')
            .html(Drupal.settings.local_government_resources.manage_my_topics_html);

        $body.on('click', '#user-lgc-topics-small-view label', function () {
            showFocusedTopicView($(this));
        });

    

        $body.on('click', '#restrict-to-local-resources-button', function () {
          if (!favorite_local_resources_table)
            favorite_local_resources_table =
            new LocalResourcesTable($("#user-local-resources"),
              Drupal.settings.local_government_resources.user_resources,
              'my');
            favorite_local_resources_table.showTable();
            updateDropdown($('#user-lgc-topics-small-view'));
        });

        // Toggle sidebar expanded / collapsed view
        $body.on('click', '#local-resources-tabs .faceted-filters .toggle a', function (ev) {
            ev.preventDefault();
            var $localResources = $(this).parents('.local.resources');
            $localResources.find('.faceted-filters').toggle();
            $localResources.toggleClass('toggle-open toggle-closed');
        });

        // Toggle facet expanded / collapsed view
        $body.on('click', '#local-resources-tabs h3 a', function (ev) {
            ev.preventDefault();
            var $h3 = $(this).parents('h3');
            $h3.next().toggle();
            $h3.find('span').toggleClass('on off');
        });

        // Prevent dom from focusing on hidden label and scrolling the widget out of view
        $body.on('click', '.multiselect-to-checkboxes label', function (ev) {
            var input_id = $(this).attr('for');
            $('#' + input_id).trigger('click');
            ev.preventDefault();
        });

        var lgcExplainedOriginalHTML = $('#resources-lgc-about').html();

        $body.on('click', '#resources-lgc-help', function (e) {
            e.stopPropagation();
            var lgcExplained = lgcExplainedOriginalHTML;
            dialogDiv = '#resources-lgc-about';
            dialogTitle = 'Resources for Local Communities Widget';
            openLGCDialog(dialogDiv, dialogTitle, lgcExplained);
        });

        function openLGCDialog(dialogDiv, dialogTitle, dialogContents) {
            $('body').addClass('modal-open');
            $(dialogDiv).html(dialogContents);
            $(dialogDiv).dialog({
                title: dialogTitle,
                dialogClass: 'about-dialog',
                width: 500,
                maxHeight: 400,
                modal: true,
                resizable: false,
                open: function () {
                    $('#resources-lgc-about').parent().find('span.ui-dialog-title').prepend('<span class="modal-title-subtext">More on the </span>');
                },
                close: function () {
                    $('body').removeClass('modal-open');
                    $(dialogDiv).dialog('destroy');
                    $(dialogDiv).html('');
                }
            });
        }
    }
    (jQuery)
)
;
