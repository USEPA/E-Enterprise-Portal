(function ($) {
  $('body').on('change', 'input[type="file"]', function () {
    // Check size is less than 2 MB
    var file_size_limit = Drupal.settings.be_well_informed.file_limit || 2;
    if (this.files[0] && this.files[0].size >= file_size_limit * 1024 * 1024) {
      // Reset the file upload field
      this.value = "";
      alert('Upload must not exceed ' + file_size_limit + ' MB in size');
    }
  });
})(jQuery);