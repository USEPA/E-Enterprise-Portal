<?php
/**
 * @file
 * my_air_quality_chart_view.features.inc
 */

/**
 * Implements hook_theme_registry_alter().
 */
function my_air_quality_chart_view_theme_registry_alter(&$theme_registry) {
    // Defined path to the current module.
    $module_path = drupal_get_path('module', 'my_air_quality_chart_view');
    // Find all .tpl.php files in this module's folder recursively.
    $template_file_objects = drupal_find_theme_templates($theme_registry, '.tpl.php', $module_path);
    // Iterate through all found template file objects.
    foreach ($template_file_objects as $key => $template_file_object) {
        // If the template has not already been overridden by a theme.
        if (!isset($theme_registry[$key]['theme path']) || !preg_match('#/themes/#', $theme_registry[$key]['theme path'])) {
            // Alter the theme path and template elements.
            $theme_registry[$key]['theme path'] = $module_path;
            $theme_registry[$key] = array_merge($theme_registry[$key], $template_file_object);
            $theme_registry[$key]['type'] = 'module';
        }
    }
}

/**
 * Implements hook_views_api().
 */
function my_air_quality_chart_view_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_menu().
 */
function my_air_quality_chart_view_menu() {
  $items = array();

  $items['my_air_quality_chart_view/api/forecast/zipCode'] = array(
    'title' => 'AirNow Forecast By Zip Code',
    'page callback' => 'my_air_quality_chart_view_forecast_zipcode',
    'access callback' => 'user_is_logged_in',
    'type' => MENU_CALLBACK,
  );

  $items['my_air_quality_map_view/api/current/latLong'] = array(
    'title' => 'AirNow Current Conditions By Lat/Long',
    'page callback' => 'my_air_quality_map_view_current_latlong',
    'access callback' => 'user_is_logged_in',
    'type' => MENU_CALLBACK,
  );

  return $items;
}

/**
 * Menu callback: View Forecast Zipcode
 */
function my_air_quality_chart_view_forecast_zipcode() {

  $_GET['API_KEY'] = 'C79940FE-7DE3-4388-9A75-F2CAF2940FCD'; // put this in a config field
  $_GET['format'] = 'application/json';

  $url = 'http://www.airnowapi.org/aq/forecast/zipCode/?'.http_build_query($_GET);

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_HEADER, false);
  curl_setopt($ch, CURLINFO_HEADER_OUT, false);
  curl_setopt($ch, CURLOPT_VERBOSE, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  curl_setopt($ch, CURLOPT_URL, $url);

  $response = curl_exec($ch);

  curl_close($ch);

  print $response;
  exit;
}


/**
 * Menu callback: View Current Conditions at Lat/Long from Air monitor location
 */
function my_air_quality_map_view_current_latlong() {

  $_GET['API_KEY'] = 'C79940FE-7DE3-4388-9A75-F2CAF2940FCD'; // put this in a config field
  $_GET['format'] = 'application/json';

  $url = 'http://www.airnowapi.org/aq/observation/latLong/current/?'.http_build_query($_GET);

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_HEADER, false);
  curl_setopt($ch, CURLINFO_HEADER_OUT, false);
  curl_setopt($ch, CURLOPT_VERBOSE, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  curl_setopt($ch, CURLOPT_URL, $url);

  $response = curl_exec($ch);

  curl_close($ch);

  print $response;
  exit;
}

