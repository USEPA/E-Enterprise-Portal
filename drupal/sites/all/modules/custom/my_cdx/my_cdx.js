console.log(Drupal.settings.basePath + 'my-cdx/json');

(function ($) {
  $(document).ready(function() {
    $('#my-cdx').find('table').DataTable({
      "ajax": Drupal.settings.basePath + 'my-cdx/json'
    });
  });
})(jQuery);
