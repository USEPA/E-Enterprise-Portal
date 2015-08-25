(function ($) {

  Drupal.behaviors.my = {
    attach: function(context, settings) {
      window.location.href = '/user/logout?bridge=1';
    }
  };
})(jQuery);