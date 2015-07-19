<?php

/**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
drupal_add_js("sites/all/libraries/jqueryui/ui/jquery.ui.tabs.js", "file");
drupal_add_js("//cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js", "file");
drupal_add_js("sites/all/libraries/globalassets/scripts/assets.core.js");
drupal_add_js(drupal_get_path('module', 'my_air_quality_chart_view') ."/js/air_now_js.js", "file");

drupal_add_css("sites/all/libraries/jqueryui/themes/base/jquery.ui.tabs.css", "file");
drupal_add_css(drupal_get_path('module', 'my_air_quality_chart_view') ."/css/air_now_styles.css", "file");
?>
<div class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <?php print $title; ?>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($header): ?>
    <div class="view-header">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <?php if ($exposed): ?>
    <div class="view-filters">
      <?php print $exposed; ?>
    </div>
  <?php endif; ?>

  <?php if ($attachment_before): ?>
    <div class="attachment attachment-before">
      <?php print $attachment_before; ?>
    </div>
  <?php endif; ?>

  <?php if ($rows): ?>
    <div class="view-content">
      <div id="my-air-quality-chart-tabs">
        <ul>
          <li><a href="#my-air-quality-chart">Air Quality</a></li>
          <li><a href="#tabs-2">AirNow Maps</a></li>
        </ul>
        <div id="my-air-quality-chart">
        </div>
        <div id="tabs-2">
        </div>
      </div>
      <?php //print $rows; ?>
    </div>
  <?php elseif ($empty): ?>
    <div class="view-empty">
      <?php print $empty; ?>
    </div>
  <?php endif; ?>

  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>

  <?php if ($attachment_after): ?>
    <div class="attachment attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  <?php if ($footer): ?>
    <div class="view-footer">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

  <?php if ($feed_icon): ?>
    <div class="feed-icon">
      <?php print $feed_icon; ?>
    </div>
  <?php endif; ?>

</div><?php /* class view */ ?>