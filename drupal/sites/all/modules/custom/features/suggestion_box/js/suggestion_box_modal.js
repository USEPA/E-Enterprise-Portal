(function ($) {
  "use strict";

  Drupal.behaviors.suggestionBox = {
    attach: function(context, settings) {
      var email;
      var $emailInput = $('#suggestion-box-email');

      $('#suggestion-box-exclude-email').change(function() {
        if ($(this).is(':checked')) {
          email = $emailInput.val();
          $emailInput.val('');
        } else {
          $emailInput.val(email);
        }
      });
    }
  }
})(jQuery);
