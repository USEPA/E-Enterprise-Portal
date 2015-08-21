(function ($) {
  "use strict";

  Drupal.behaviors.suggestionBox = {
    attach: function(context, settings) {

      // focus modal
      var form = $('div.ctools-modal-content button,div.ctools-modal-content select,div.ctools-modal-content input:enabled')[0];
      if (form) {
        form.focus();
      }

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
