/**
 * Created by bmatkin on 4/13/2016.
 */


(function ($) {

  /**
   * Handles error  in saving or deleting topic
   * @param {string} error_message
   */
  function handleError(error_message) {
    console.log(error_message);
  }

  /**
   * Handle addition of topic after db has been updated
   * @param $checkbox
   */
  function savedTopic($checkbox) {
    $checkbox.parent().find('.check-mark').show();
  }

  /**
   * Handle removal of checkbox after database has been updated
   * @param $checkbox
   */
  function removedTopic($checkbox) {
    $checkbox.parent().find('.check-mark').hide();
  }

  /**
   * Send tid from checkbox elem to db for saving new topic
   * @param $checkbox
   */
  function saveTopic($checkbox) {
    var tid = $checkbox.val();

    $.ajax({
      url: 'manage_my_topics/save_topic',
      data: {tid: tid},
      method: 'POST',
      beforeSend: function () {

      },
      success: function (response) {
        response = $.parseJSON(response);
        var error = response.error;
        if (!error) {
          savedTopic($checkbox);
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
   * @param $checkbox
   */
  function removeTopic($checkbox) {
    var tid = $checkbox.val();

    $.ajax({
      url: 'manage_my_topics/remove_topic',
      data: {tid: tid},
      method: 'POST',
      beforeSend: function () {

      },
      success: function (response) {
        response = $.parseJSON(response);
        var error = response.error;
        if (!error) {
          removedTopic($checkbox);
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


  $(document).ready(function () {
    var $checkboxes = $('#manage-my-topics .term-name-checkboxes');
    $checkboxes.click(function () {
      var $checkbox = $(this);
      if ($checkbox.prop('checked')) // Check if user checked the topic
        saveTopic($checkbox);
      else
        removeTopic($checkbox);
    });

  });


})(jQuery);