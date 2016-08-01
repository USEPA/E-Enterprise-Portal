/**
 * Created by bmatkin on 4/13/2016.
 */


// Text of Back anchor, for simplicity if we change the text down the line.
var anchor_text = "Back";
var update_anchor_text = "Saving changes";
// Count to track topics that are still saving changes
var still_updating = 0;

function updatingUserTopics() {
  still_updating++;
  var $anchor = $('.back-to-lgc-widget a');
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
  var $anchor = $('.back-to-lgc-widget a');

  $.ajax({
    url: 'manage_my_topics/save_topic',
    data: {tid: tid},
    method: 'POST',
    beforeSend: function() {
      updatingUserTopics();
    },
    success: function(response) {
      still_updating--;
      response = $.parseJSON(response);
      var error = response.error;
      if (!error && still_updating == 0) {
        $anchor.removeClass('disabled').text(anchor_text);
      }
      else {
        handleError(response.msg);
      }
    },
    failure: function(response) {
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
  var $anchor = $('.back-to-lgc-widget a');

  if (from_unfollow) {
    tid = $checkbox;
  } else {
    tid = $checkbox.val();
  }

  $.ajax({
    url: 'manage_my_topics/remove_topic',
    data: {tid: tid},
    method: 'POST',
    beforeSend: function() {
      updatingUserTopics();
    },
    success: function(response) {
      still_updating--;
      response = $.parseJSON(response);
      var error = response.error;
      if (!error && still_updating == 0) {
        if (from_unfollow) {
          showLGCResourcesView();
          //favorite_local_resources_table.updateTopics([]);
        }
        $anchor.removeClass('disabled').text(anchor_text);
      }
      else {
        handleError(response.msg);
      }
    },
    failure: function(response) {
      handleError(response);
    }
  });
}

(function($) {


  $(document).ready(function() {
    $('body').on('click',
      '#manage-my-topics .term-name-checkboxes, #manage-my-topics-wrapper .term-name-checkboxes',
      function() {
        var $checkbox = $(this);
        if ($checkbox.prop('checked')) // Check if user checked the topic
          saveTopic($checkbox);
        else
          removeTopic($checkbox);
      });
  });


})(jQuery);