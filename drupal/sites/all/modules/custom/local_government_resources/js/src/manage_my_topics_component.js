/**
 * Created by bmatkin on 4/13/2016.
 */


// Text of Back anchor, for simplicity if we change the text down the line.
var anchor_text = "Back";
var update_anchor_text = "Saving changes";
// Count to track topics that are still saving changes
var still_updating = 0;
var changes_made = false;
var manage_components_title = "Manage My Profile Topics";

function updatingUserTopics() {
    still_updating++;
    var $anchor = jQuery('.back-to-lgc-widget a');
    if ($anchor.text() != update_anchor_text) {
        $anchor.addClass('disabled').html(update_anchor_text + '  <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
    }
}

/**
 * Handles error  in saving or deleting topic
 * @param {string} error_message
 */
function handleError(error_message) {
    console.log(error_message);
}

/**
 * Send tid from checkbox elem to db for saving new topic
 * @param $checkbox
 */
function saveTopic($checkbox) {
    var tid = $checkbox.val();
    var title = $checkbox.prop('name');
    var $anchor = jQuery('.back-to-lgc-widget a');

    jQuery.ajax({
        url: 'manage_my_topics/save_topic',
        data: {tid: tid},
        method: 'POST',
        beforeSend: function () {
            updatingUserTopics();
        },
        success: function (response) {
            changes_made = true;
            if (Drupal.settings.recommended_resources && Drupal.settings.recommended_resources.user_lgc_topics) {
                Drupal.settings.recommended_resources.user_lgc_topics[tid] = title;
            }
            still_updating--;
            response = jQuery.parseJSON(response);
            var error = response.error;
            if (!error && still_updating == 0) {
                $anchor.removeClass('disabled').text(anchor_text);
            }
            else {
                handleError(response.msg);
            }
        },
        failure: function (response) {
            handleError(response);
        }
    });
}

/**
 * Send tid from checkbox elem to db for removing prev saved topic
 * from_unfollow means the $checbkbox value is a tid, not a dom element
 * @param $checkbox
 */
function removeTopic($checkbox, from_unfollow) {
    var tid;
    var title = $checkbox.prop('name');
    var $anchor = jQuery('.back-to-lgc-widget a');

    if (from_unfollow) {
        tid = $checkbox;
    } else {
        tid = $checkbox.val();
    }

    jQuery.ajax({
        url: 'manage_my_topics/remove_topic',
        data: {tid: tid},
        method: 'POST',
        dataType: 'JSON',
        beforeSend: function () {
            updatingUserTopics();
        },
        success: function (response) {
            changes_made = true;
            if (Drupal.settings.recommended_resources && Drupal.settings.recommended_resources.user_lgc_topics) {
                delete Drupal.settings.recommended_resources.user_lgc_topics[tid];
            }
            still_updating--;
            var error = response.error;
            if (!error && still_updating == 0) {
                $anchor.removeClass('disabled').text(anchor_text);
            }
            else {
                handleError(response.msg);
            }
        },
        failure: function (response) {
            handleError(response);
        }
    });
}

function showLGCResourcesView() {
    var $ = jQuery;
    $('#user-lgc-topics-small-view').find('label').removeClass('selected');
    favorite_local_resources_table.showTable();
    $('#manage-my-topics-wrapper').hide();
    $('.lgc-header').text('');
    $('.back-to-lgc-widget').hide();
    $('.unfollow-lgc-topic').hide();
    $('#local-resources-tabs').show();
    $(pane_class).find('.pane-title').show();
    $(pane_class).find('.ui-tabs-nav').show();
}

function reloadUserTable() {
    var $ = jQuery;
    if (changes_made) {
        var $anchor = jQuery('.back-to-lgc-widget a');
        $anchor.html("Loading User Table " + '  <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
        $.ajax({
            url: 'lgc/user_table_datatable_json',
            dataType: 'JSON',
            success: function (lgc_user_data) {
                var $localResourcesTabs = $('#local-resources-tabs');
                Drupal.settings.local_government_resources.user_topics = lgc_user_data.topics;
                // Clear previous content
                $("#user-local-resources").find('table').DataTable().destroy();
                $("#user-local-resources").html('<table id="lgc-user-table"></table>')
                favorite_local_resources_table = new LocalResourcesTable($("#user-local-resources"),
                    lgc_user_data.datatable_json,
                    'my');
                showLGCResourcesView();
                $anchor.html('Back');
            }
        })
    } else {
        showLGCResourcesView();
    }
}

/**
 * Loads manage topics view via an ajax request
 */
function loadManageTopicsView() {
    var $ = jQuery;
    changes_made = false;
    var $localResourcesTabs = $('#local-resources-tabs');
    $localResourcesTabs.hide();
    $(pane_class).find('.pane-title').hide();
    $('.unfollow-lgc-topic').hide();
    $('.back-to-lgc-widget').show();
    $('.lgc-header').text(manage_components_title).show();
    $('#manage-my-topics-wrapper').show();
}


(function ($) {
    var $body = $('body');
    $body.on('click',
        '#manage-my-topics .term-name-checkboxes, #manage-my-topics-wrapper .term-name-checkboxes',
        function () {
            var $checkbox = $(this);
            if ($checkbox.prop('checked')) { // Check if user checked the topic
                saveTopic($checkbox);
            }
            else {
                removeTopic($checkbox);
            }
        });

    $body.on('click', '.back-to-lgc-widget a, .back-to-lgc-widget .left-arrow',
        function () {
            reloadUserTable();
        });

    $body.on('click', '.manage-my-topics-grid, #add-more-topics', function () {
        loadManageTopicsView();
    });

    // In case First Time User settings are changed- reload user topics
    $(document).on('ee:first_time_user_complete', function () {
        changes_made = true;
        reloadUserTable();
    });
})(jQuery);