(function ($) {

/**
 * Provide the summary information for the qtip instance settings vertical tabs.
 */
Drupal.behaviors.qtip_admin = {
  attach: function (context) {
    // We need to make sure this behavior is processed only if drupalSetSummary is defined.
    if (typeof jQuery.fn.drupalSetSummary == 'undefined') {
      return;
    }

    $('fieldset#edit-style', context).drupalSetSummary(function (context) {
      var color_scheme = Drupal.t('Color scheme') + ": "  + $("#edit-style-classes option:selected", context).text();

      var vals = [];
      if ($('#edit-style-shadow', context).is(':checked')) {
        vals.push(Drupal.t('Shadow'));
      }
      if ($('#edit-style-rounded-corners', context).is(':checked')) {
        vals.push(Drupal.t('Rounded corners'));
      }
      if ($('#edit-style-tip-corner', context).is(':checked')) {
        vals.push(Drupal.t('Speech bubble'));
      }

      return color_scheme + '<br>' + vals.join(', ');
    });

    $('fieldset#edit-position', context).drupalSetSummary(function (context) {
      var vals = [];
      vals.push(Drupal.t('Position') + ": " + $("#edit-position-at option:selected", context).text());
      vals.push(Drupal.t('Placement') + ": " + $("#edit-position-my option:selected", context).text());

      return vals.join('<br>');
    });

    $('fieldset#edit-show', context).drupalSetSummary(function (context) {
      var events = [];
      var events_list = '';
      $('#edit-show-event input[type="checkbox"]:checked', context).each(function () {
        events.push($.trim($(this).next('label').text()));
      });
      if (events.length !== 0) {
        events_list = Drupal.t('Events') + ": " + events.join(', ');
      }

      var vals = [];
      if ($('#edit-show-solo', context).is(':checked')) {
        vals.push(Drupal.t('Show one at a time'));
      }

      if ($('#edit-show-ready', context).is(':checked')) {
        vals.push(Drupal.t('Show on load'));
      }

      if (events_list.length) {
        return events_list + "<br>" + vals.join(', ');
      }

      return vals.join(', ');
    });

    $('fieldset#edit-hide', context).drupalSetSummary(function (context) {
      var events = [];
      var events_list = '';
      $('#edit-hide-event input[type="checkbox"]:checked', context).each(function () {
        events.push($.trim($(this).next('label').text()));
      });
      if (events.length !== 0) {
        events_list = Drupal.t('Events') + ": " + events.join(', ');
      }

      var vals = [];
      if ($('#edit-hide-fixed', context).is(':checked')) {
        vals.push(Drupal.t('Keep visible when hovered'));
      }

      if (events_list.length) {
        return events_list + "<br>" + vals.join(', ');
      }

      return vals.join(', ');
    });

    $('fieldset#edit-miscellaneous', context).drupalSetSummary(function (context) {
      if ($('#edit-miscellaneous-button', context).is(':checked')) {
        return Drupal.t('Show close button');
      }
    });
  }
};

})(jQuery);
