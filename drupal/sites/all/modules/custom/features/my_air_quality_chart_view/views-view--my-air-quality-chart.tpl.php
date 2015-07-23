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

drupal_add_css("sites/all/libraries/jqueryui/themes/base/jquery.ui.tabs.css", "file");
drupal_add_css("//cdn.jsdelivr.net/leaflet/0.7.3/leaflet.css", "external");
drupal_add_css(drupal_get_path('module', 'my_air_quality_chart_view') ."/css/air_now_styles.css", "file");


drupal_add_js("sites/all/libraries/jqueryui/ui/jquery.ui.tabs.js", "file");
drupal_add_js("//cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js", "file");
drupal_add_js("sites/all/libraries/globalassets/scripts/assets.core.js");

drupal_add_js("//cdn.jsdelivr.net/leaflet/0.7.3/leaflet.js", "file");
drupal_add_js("//cdn.jsdelivr.net/leaflet.esri/1.0.0/esri-leaflet.js", "file");

drupal_add_js(drupal_get_path('module', 'my_air_quality_chart_view') ."/js/air_now_js.js", "file");
?>

<div class="view-content">
  <div id="my-air-quality-chart-tabs">
    <ul>
      <li><a class="favorites-ignore" href="#my-air-quality-chart">Air Quality</a></li>
      <li><a class="favorites-ignore" href="#my-air-quality-air-now-maps">AirNow Maps</a></li>
    </ul>
    <div id="my-air-quality-chart">
    </div>
    <div id="my-air-quality-air-now-maps" style="padding:0">
      <div id="my-air-quality-air-now-map-container"></div>
      <img src="<?php echo drupal_get_path('module', 'my_air_quality_chart_view') ."/css/airnow-map-legend.png"; ?>" alt="AirNow Maps Legend"/>
    </div>
  </div>
</div>