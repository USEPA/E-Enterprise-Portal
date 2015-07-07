(function ($) {
  Drupal.behaviors.entityboxes = {
    attach: function(context, settings) {
      // Trigger the upload button automatically when a file of image is chosen.
      $('.field-type-image input.form-file:not(.auto_upload-processed)', context).addClass('auto_upload-processed').change(function() {
        $(this).parent().find('input.form-submit').mousedown();
      });
      $('.field-type-file input.form-file:not(.auto_upload-processed)', context).addClass('auto_upload-processed').change(function() {
        $(this).parent().find('input.form-submit').mousedown();
      });
      
      // Display field collections forms.
      var LinkCollection = $('.open-form');
      LinkCollection.unbind();
      LinkCollection.click(function(event)
      {
        var nameLink = $(this).attr('class');
        var reg= new RegExp('[ ]+','g');
        var tableau=nameLink.split(reg);
        var e = document.getElementById(tableau[1]);
        var link = document.getElementById('open-form'+tableau[1])
        e.style.display = 'block';
        link.style.display = 'none';
        $('a.cancel-'+tableau[1]).show();
      })
    }
  };
})(jQuery);
