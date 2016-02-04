(function ($) {

/**
 * Provide the summary information for the qtip instance settings vertical tabs.
 */
Drupal.behaviors.qtipSettingsForm = {
  attach: function (context) {
    // We need to make sure this behavior is processed only if drupalSetSummary is defined.
    if (typeof jQuery.fn.drupalSetSummary == 'undefined') {
      return;
    }

    $('fieldset#edit-cdn', context).drupalSetSummary(function (context) {
      var vals = [];
      vals.push(Drupal.t('CDN') + ": "  + $("#edit-qtip-cdn option:selected", context)
        .text()
        .replace(' (preferred)', '')
        .replace(' (custom build)', '')
      );

      if ($("#edit-qtip-cdn option:selected").text() != Drupal.t('None (custom build)')) {
        vals.push(Drupal.t('Version') + ": "  + $("#edit-qtip-cdn-version option:selected", context)
          .text()
          .replace(' (recommended)', '')
        );

        var settings = []
        settings.push($('input[name="qtip_cdn_features"]:checked', context)
          .next('label').text()
          .replace(' (no additional features or styles)', '')
        );
        settings.push($('input[name="qtip_cdn_compression"]:checked', context)
          .next('label').text()
          .replace(' (minified)', '')
          .replace(' (uncompressed)', '')
        );

        vals.push(settings.join(', '));
      }

      return vals.join('<br>');
    });

    $('fieldset#edit-pages', context).drupalSetSummary(function (context) {
      var visibility = $('input[name="qtip_pages_visibility"]:checked', context);

      return visibility.next('label').text();
    });

    $('fieldset#edit-jquery', context).drupalSetSummary(function (context) {
      var vals = [];
      vals.push(Drupal.t('CDN') + ": "  + $("#edit-qtip-jquery-cdn option:selected", context).text());
      vals.push(Drupal.t('Version') + ": "  + $("#edit-qtip-jquery-version option:selected", context).text());

      return vals.join('<br>');
    });

    $('fieldset#edit-miscellaneous', context).drupalSetSummary(function (context) {
      var vals = [];

      if ($("#edit-qtip-default-instance option:selected").text() != Drupal.t('- None -')) {
        vals.push(Drupal.t('Default instance') + ": "  + $("#edit-qtip-default-instance option:selected", context).text());
      }

      return vals.join('<br>');
    });

    $('fieldset#edit-debug', context).drupalSetSummary(function (context) {
      var vals = [];

      vals.push($('input[name="qtip_debug_leave_tooltip_elements"]:checked', context)
          .next('label').text());

      return vals.join(', ');
    });
  }
};

})(jQuery);
