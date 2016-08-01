(function($) {
  "use strict";

  Drupal.behaviors.suggestionBox = {
    attach: function(context, settings) {

      // handle form submission to clear status messages on submit
      // this prevents duplicate status messages from appearing
      var $form = $('div.ctools-modal-content form'),
        $body = $('body');

      $form.submit(function() {
        $('div.messages--status').remove();
        $body.removeClass('modal-open');
      });

      $("#modalContent").on("remove", function() {
        $body.removeClass('modal-open');
      });

      // focus modal
      $('.ctools-modal-content').focus();

      // if exclude email is checked, clear the value in the email input form
      // if unchecked, restore the value
      var email;
      var $emailInput = $('#suggestion-box-email');

      var $excludeEmailCheckbox = $('#suggestion-box-exclude-email');

      $excludeEmailCheckbox.change(function() {
        if ($(this).is(':checked')) {
          email = $emailInput.val();
          $emailInput.val('');
        } else if (email) {
          $emailInput.val(email);
        }
      });

      $excludeEmailCheckbox.trigger('change');

      var text_max = 800;
      $('#message-count').html(text_max + ' characters remaining');

      $('#edit-body').keyup(function() {
        var text_length = $('#edit-body').val().length;
        var text_remaining = text_max - text_length;
        $('#message-count').html(text_remaining + ' characters remaining');
      });
    }
  }
})(jQuery);
