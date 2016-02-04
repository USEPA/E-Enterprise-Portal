(function ($) {
  Drupal.settings.magnific_popup = Drupal.settings.magnific_popup || {};
  Drupal.settings.magnific_popup_api = Drupal.settings.magnific_popup_api || {};
  Drupal.settings.magnific_popup.common_options = {
    disableOn: 300,
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: 'auto'
  };
  Drupal.settings.magnific_popup.common_options_iframe = {
    type: 'iframe',
    iframe: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" id="mfp-iframe" frameborder="0" seamless="seamless" allowfullscreen="allowfullscreen"></iframe></div>',
      patterns: {}
    }
  };
  Drupal.behaviors.magnific_popup = {
		attach: function (context, settings) {
      settings.magnific_popup = settings.magnific_popup || { common_options: {}, common_options_iframe: {}};
      var common_options = settings.magnific_popup.common_options || {};
      var common_options_iframe = settings.magnific_popup.common_options_iframe || {};
      // Allow modules to extend the set of patterns we support via iframe.
      if (settings.magnific_popup_api.iframe_patterns) {
        jQuery.extend(settings.magnific_popup.common_options_iframe.iframe.patterns, settings.magnific_popup_api.iframe_patterns);
        // There are some bugs around the delete operator, so make sure we never
        // double-up on iframe patterns.
        settings.magnific_popup_api.iframe_patterns = {};
        // Attempt to delete the iframe patterns from our settings object.
        delete settings.magnific_popup_api.iframe_patterns;
      }
      var common_options_image = {
        type: 'image',
        image: {
          titleSrc: function(item) {
            return $('img.mfp-thumbnail', item.el).attr('title') || '';
          }
        }
      };
      var common_options_gallery = {
        gallery: {enabled: true},
        delegate: 'a'
      };
      // Instantiate no-gallery, images.
      var options = {};
      $.extend(options, common_options, common_options_image);
      $('.mfp-nogallery-image .mfp-item', context).once('magnific_popup').magnificPopup(options);
      // Instantiate no-gallery, iframes.
      options = {}
      $.extend(options, common_options, common_options_iframe);
      $('.mfp-nogallery-iframe .mfp-item', context).once('magnific_popup').magnificPopup(options);
      // Instantiate galleries, images.
      options = {};
      $.extend(options, common_options, common_options_image, common_options_gallery);
      $('.mfp-gallery-image', context).once('magnific_popup').each(function(el, i) {
        $(this).magnificPopup(options);
      });
      // Instantiate galleries, iframes.
      options = {};
      $.extend(options, common_options, common_options_iframe, common_options_gallery);
      $('.mfp-gallery-iframe', context).once('magnific_popup').each(function(el, i) {
        $(this).magnificPopup(options);
      });
    }
  };
})(jQuery);
