(function ($) {
  $('body').on('change', 'input[type="file"]', function () {
    // Check size is less than 2 MB
    if (this.files[0] && this.files[0].size >= 2 * 1000000) {
      // Reset the file upload field
      this.value = "";
      alert('Upload must not exceed 2 MB in size');
    }
  });

})(jQuery);