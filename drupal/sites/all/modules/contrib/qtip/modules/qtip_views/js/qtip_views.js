(function ($) {
  Drupal.behaviors.qtipViewsLabelTooltip = {
    attach: function(context) {
      if (Drupal.settings.qtipViewsLabelTooltip) {
        $.each(Drupal.settings.qtipViewsLabelTooltip, function(view, displays) {
          $.each(displays, function(display, settings) {
            $.each(settings.tooltips, function(field, tooltip) {
              $('.view-id-' + view + '.view-display-id-' + display + ' .qtip-views-field-' + field + '-label')
                .once('qtip-views-element-label')
                .append(tooltip)
                .children(':first-child')
                .wrap('<span class="qtip-link qtip-views-link"></span>');
            });
          });
        });
      }
    },
  };

  Drupal.behaviors.qtipViewsTooltip = {
    attach: function(context) {
      if (Drupal.settings.qtipViewsTooltip) {
        $.each(Drupal.settings.qtipViewsTooltip, function(view, displays) {
          $.each(displays, function(display, settings) {
            $.each(settings.tooltips, function(row, tooltip) {
              $.each(tooltip, function(field, content) {
                $('.view-id-' + view + '.view-display-id-' + display + ' .qtip-views-field-' + field + ':eq(' + row + ')')
                  .once('qtip-views-element')
                  .wrapInner('<span class="qtip-link"></span>')
                  .append(content);
              });
            });
          });
        });
      }
    },
  };
})(jQuery);
