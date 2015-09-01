(function ($) {
  "use strict";

  Drupal.behaviors.suggestionBox = {
    attach: function(context, settings) {

      // handle form submission to clear status messages on submit
      // this prevents duplicate status messages from appearing
      var $form = $('div.ctools-modal-content form');

      $form.submit(function(){
        $('div.messages--status').remove();
      });

      // focus modal
      var formInput = $('div.ctools-modal-content button,div.ctools-modal-content select,div.ctools-modal-content input:enabled')[0];
      if (formInput) {
        formInput.focus();
      }

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
    }
  }
})(jQuery);
