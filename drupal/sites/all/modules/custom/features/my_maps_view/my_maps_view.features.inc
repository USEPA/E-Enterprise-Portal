<?php
/**
 * @file
 * my_maps_view.features.inc
 */

// function my_maps_view_init() {
  
//   global $user;

//   $account = user_load(array('uid'=>$user->uid));
//   $zip = $account->field_zip_code['und'][0]['value'];
//   $my_variables = array('field_zip_code' => $zip);
  
//   drupal_add_js(array('my_maps_view' => $my_variables), 'setting');
// }

/**
 * Implements hook_views_api().
 */
function my_maps_view_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_menu().
 */
// function my_maps_view_menu() {
//   $items = array();

//   $items['my_maps_view/api/forecast/zipCode'] = array(
//     'title' => 'AirNow Forecast By Zip Code', 
//     'page callback' => 'my_maps_view_forecast_zipcode',
//     'access callback' => 'user_is_logged_in',
//     'type' => MENU_CALLBACK,
//   );

//   return $items;
// }

/**
 * Menu callback: Term Lookup Get Terms Request
 */
// function my_maps_view_forecast_zipcode() {

//   $_GET['API_KEY'] = 'C79940FE-7DE3-4388-9A75-F2CAF2940FCD'; // put this in a config field
//   $_GET['format'] = 'application/json';

//   $url = 'http://www.airnowapi.org/aq/forecast/zipCode/?'.http_build_query($_GET);

//   $ch = curl_init();
//   curl_setopt($ch, CURLOPT_HEADER, false); 
//   curl_setopt($ch, CURLINFO_HEADER_OUT, false);
//   curl_setopt($ch, CURLOPT_VERBOSE, false);
//   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//   curl_setopt($ch, CURLOPT_URL, $url);

//   $response = curl_exec($ch);

//   curl_close($ch);

//   print $response;
//   exit;
// }