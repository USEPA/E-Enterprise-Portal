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

drupal_add_css("sites/all/libraries/jqueryui/themes/base/minified/jquery.ui.tabs.min.css", ['scope'=>'footer', 'preprocess'=>true, 'group'=>CSS_DEFAULT]);
drupal_add_css("//cdn.jsdelivr.net/leaflet/0.7.3/leaflet.css", "external");
drupal_add_css(drupal_get_path('module', 'my_air_quality_chart_view') ."/css/air_now_styles.css", ['preprocess'=>true, 'group'=>CSS_DEFAULT]);

// If needed, install jQuery Tabs JS
//drupal_add_js("sites/all/libraries/jqueryui/ui/minified/jquery.ui.tabs.min.js", ['scope'=>'footer', 'preprocess'=>true, 'group'=>JS_THEME, 'type'=>'file', 'cache'=>true, 'requires_jquery'=>true]);
drupal_add_js("sites/all/libraries/d3/3.5.5/d3.min.js", ['scope'=>'footer', 'preprocess'=>true, 'group'=>JS_LIBRARY, 'type'=>'file', 'cache'=>true, 'requires_jquery'=>true]);

drupal_add_js("sites/all/libraries/leaflet/0.7.3/leaflet.js", ['scope'=>'footer', 'preprocess'=>true, 'group'=>JS_LIBRARY, 'type'=>'file', 'cache'=>true, 'requires_jquery'=>true]);

/*
drupal_add_js("//cdn.jsdelivr.net/leaflet.esri/1.0.0/esri-leaflet.js", "file");
*/
drupal_add_js(drupal_get_path('module', 'my_air_quality_chart_view') ."/js/air_now_js.js", ['scope'=>'footer', 'preprocess'=>true, 'group'=>JS_LIBRARY, 'type'=>'file', 'cache'=>true, 'requires_jquery'=>true]);
drupal_add_js(drupal_get_path('module', 'my_air_quality_chart_view') ."/js/esri.leaflet.1.0.0.customCGI.js", ['scope'=>'footer', 'preprocess'=>true, 'group'=>JS_LIBRARY, 'type'=>'file', 'cache'=>true, 'requires_jquery'=>true]);

?>

<div class="view-content">
  <div id="my-air-quality-chart-tabs">
    <ul>
      <li><a class="favorites-ignore" href="#my-air-quality-index">Air Quality Index</a></li>
      <li><a class="favorites-ignore" href="#my-air-quality-air-now-maps">AirNow Maps</a></li>
    </ul>
    <div id="my-air-quality-index" style="padding:0">
      <p class="widget-note aqi-source">Source: <a target="_blank" href="http://airnow.gov/" rel="external">AirNow.gov</a></p>
      <p class="widget-note sr-options"><a href="javascript:void(0)" id="sr-aqi-data-toggle" class="favorites-ignore">View chart description</a><a href="javascript:void(0)" id="aqi-explained-toggle" class="favorites-ignore">Learn more about AQI categories and ranges</a></p>
      <div id="sr-aqi-data"></div>
      <div id="my-air-quality-chart">
      </div>
      <div id="aqi-explained"></div>
    </div>
    <div id="my-air-quality-air-now-maps" style="padding:0">
      <p class="aqi-source">Source: <a target="_blank" href="http://airnow.gov/" rel="external">AirNow.gov</a></p>
      <div id="my-air-quality-air-now-map-container"></div>
      <p>Today's AQI Forecast</p>
      <ul class="list-inline small">
        <li>
          <svg class="my-air-quality-map-legend-icon">
            <rect width="100" height="100" class="section-good" />
          </svg>
          Good
        </li>
        <li>
          <svg class="my-air-quality-map-legend-icon">
            <rect width="100" height="100" class="section-moderate" />
          </svg>
          Moderate
        </li>
        <li>
          <svg class="my-air-quality-map-legend-icon">
            <rect width="100" height="100" class="section-unhealthy-for-sensitive" />
          </svg>
          Unhealthy for Sensitive Groups
        </li>
        <li>
          <svg class="my-air-quality-map-legend-icon">
            <rect width="100" height="100" class="section-unhealthy" />
          </svg>
          Unhealthy
        </li>
        <li>
          <svg class="my-air-quality-map-legend-icon">
            <rect width="100" height="100" class="section-very-unhealthy" />
          </svg>
          Very Unhealthy
        </li>
        <li>
          <svg class="my-air-quality-map-legend-icon">
            <rect width="100" height="100" class="section-hazardous" />
          </svg>
          Hazardous
        </li>
      </ul>
    </div>
  </div>
</div>
