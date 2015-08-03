(function ($) {
  "use strict";

  Drupal.behaviors.suggestionBox = {
    attach: function(context, settings) {
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
