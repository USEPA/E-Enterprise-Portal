/**
 * Created by bmatkin on 11/15/2017.
 */
(function ($) {
  $('.publish-service').change(function() {
    // Handle publishing or unpublishing service
    var action = 'unpublish';
    if ($(this).prop('checked')) {
      action = 'publish';
    }
    $.post('/esmt/service_actions/' + action + '/' + $(this).data('rid'));
  })

})(jQuery);