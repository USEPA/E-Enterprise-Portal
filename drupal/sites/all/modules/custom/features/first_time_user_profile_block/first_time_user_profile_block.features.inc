<?php
/**
 * @file
 * first_time_user_profile_block.features.inc
 */

/**
 * Implements hook_views_api().
 */
function first_time_user_profile_block_views_api($module = NULL, $api = NULL)
{
    return array("api" => "3.0");
}


/**
 * Implements hook_menu().
 **/

function first_time_user_profile_block_menu()
{
    $items = array();
    $items['save_first_time_user_preferences'] = array(
        'page callback' => 'save_first_time_user_preferences',
        'access callback' => TRUE,
    );
    $items['return_location_data'] = array(
        'page callback' => 'return_location_data',
        'access callback' => TRUE,
    );
    $items['return_location_data_lat_long'] = array(
        'page callback' => 'return_location_data_lat_long',
        'access callback' => TRUE,
    );
    $items['high_level_taxonomy_checkboxes'] = array(
        'page callback' => 'high_level_taxonomy_checkboxes',
        'access callback' => TRUE,
    );
    $items['frs_zip_code_to_city_state'] = array(
        'page callback' => 'frs_zip_code_to_city_state',
        'access callback' => TRUE,
    );
    return $items;
}


/**
 * Implements hook_theme_registry_alter().
 */
function first_time_user_profile_block_theme_registry_alter(&$theme_registry)
{
    // Defined path to the current module.
    $module_path = drupal_get_path('module', 'first_time_user_profile_block');
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
 * Params: array of zip codes, array of taxonomy ids for interests, skip boolean
 * Changes user's first_time_user to false
 * If skip boolean, only first_time_user is set to false
 */

function save_first_time_user_preferences()
{
    global $user;
    $user_data = user_load($user->uid);

    $skip = $_GET['skip'];
    $zip = $_GET['zip'];
    $term_names = $_GET['term_names'];
    $geolocation_used = $_GET['geolocation_used'];
    $geolocation_zip = $_GET['geolocation_zip'];

    $user_zip_codes = $user_data->field_zip_code;
    unset($user_zip_codes);
    $first_time_user = $user_data->field_first_time_user;
    $user_interests = $user_data->field_interests2;

    if (!$skip) {
//        foreach($zip_codes as $zip) { //Save locations
        $multifield_zip_obj = array(
            'field_field_primary_value' => 1,
            'field_field_primary_format' => null,
            'field_field_zip_code_value' => $zip,
            'field_field_zip_code_format' => null,
            'field_field_primary' => array(
                LANGUAGE_NONE => array(
                    0 => array(
                        'value' => 1
                    ),
                ),
            ),
            'field_field_zip_code' => array(
                LANGUAGE_NONE => array(
                    0 => array(
                        'value' => $zip
                    ),
                ),
            ),
        );
        $user_zip_codes[LANGUAGE_NONE][] = $multifield_zip_obj;

        foreach ($term_names as $term_name) { //Save interests
            $term_array = taxonomy_get_term_by_name($term_name);
            $term = reset($term_array); # get the first element of the array which is our term object
            $tid = $term->tid;
            $interest_obj = array(
                'target_id' => (string)$tid,
            );
            $user_interests[LANGUAGE_NONE][] = $interest_obj;
        }
    }

    // Set first_time_user boolean to false
    $first_time_user[LANGUAGE_NONE][0] = array('value' => '0');

    $edit = array(
        'field_zip_code' => $user_zip_codes,
        'field_first_time_user' => $first_time_user,
        'field_interests2' => $user_interests,
    );

    $return_msg = array();

    try {
        $_SESSION['geolocation_used'] = $geolocation_used;
        $_SESSION['geolocation_zip'] = $geolocation_zip;
        user_save($user_data, $edit);
    } catch (Exception $e) {
        $return_msg['error_msg'] = $e;
        $return_msg['success'] = false;
        print json_encode($e);
        exit();
    }
    $return_msg['success'] = true;
    print json_encode($return_msg);

}

function return_location_data_lat_long()
{
    $results = array();
    if (isset($_GET['longitude']) && isset($_GET['latitude'])) {
        $longitude = $_GET['longitude'];
        $latitude = $_GET['latitude'];
        $results = frs_lat_long_to_zip_code($latitude, $longitude);
        $results['error'] = false;
    } else {
        $results['error'] = true;
    }
    print json_encode($results);
}


//
function return_location_data()
{
    if (isset($_POST['location'])) {
        $location = $_POST['location'];
    } else if (isset($_GET['location'])) {
        $location = $_GET['location'];
    } else {
        exit();
    }
    // First check $location with postal code validation
    $validation = postal_code_validation_validate($location, 'US');
    if ($validation['error']) {
        // Make location upper case for FRS
        $location = strtoupper($location);
        //check city, state return
        $location = trim($location);
        $location_array = explode(',', $location);
        $city = trim($location_array[0]);
        $state = trim($location_array[1]);
        $zips = frs_city_state_to_zip_code($city, $state);
        $zips['name_city_state'] = false;
        echo json_encode($zips);
    } else {
        $zip_lookup = zip_code_lookup($validation['postal_code']);
        $zip_lookup['name_city_state'] = true;

        echo json_encode($zip_lookup);
    }

}


function high_level_taxonomy_checkboxes()
{
    $high_level_taxonomy_names = array(
        'Air',
        'Energy', 'Endangered Species', 'Environmental Justice',
        'Compliance & Enforcement',
        'Health Effects',
        'Pollution Prevention & Control', 'Regulated Facilities', 'Services for Citizens',
        'Soils & Land', 'Water',
    );
    foreach ($high_level_taxonomy_names as $term_name) {
        //    $tid = taxonomy_get_term_by_name($term_name);
        print '<label class="ck-button"><input class="term-name-checkboxes" type="checkbox"  name="' . $term_name . '" value="' . $term_name . '"/><span>' . $term_name . '</span></label>';
    }

}


// http://epadev.induscorp.com/enviro/html/fii/api/frs_api_services.html#LOOKUP4.15
function frs_lat_long_to_zip_code($lat, $long)
{
    $test_domain = "http://dev.epacdx.net/FrsServicesTestHarness/ServiceProxy/Get?url=";
    $base_url = 'http://epadev.induscorp.com/fiicdx/FRS_API_LOOKUP_SERVICES.get_spatial_data_by_latlong84?p_ip_address=1&p_token=1&p_latitude=' . $lat .
        '&p_longitude=' . $long;
//    echo $base_url . '<br />';
//    $base_url = 'http://epadev.induscorp.com/fiicdx/FRS_API_LOOKUP_SERVICES.get_spatial_data_by_latlong84?p_token=1&p_ip_address=1&p_latitude=42.916952&p_longitude=-71.37567';
//    echo $base_url . '<br />';
    $encoded_base_url = urlencode($base_url);
    $request_url = $test_domain . $encoded_base_url;
//    $data = array(
//        'p_token' => 1,
//        'p_ip_address' => 1,
//        'p_latitude' => $lat,
//        'p_longitude' => $long,
//    );
//    $data = drupal_json_encode($data);
    $options = array(
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'method' => 'GET',
//        'data' => $data
    );
    $response = drupal_http_request($request_url, $options);
    $data = json_decode($response->data);
    $results = $data->Results;
    $formatted_city = ucwords(strtolower($results->derivedCity));

    $return = array(
        'zip' => $results->derivedZip,
        'city' => $formatted_city,
        'state' => $results->derivedState,
    );
    return $return;
}

// http://epadev.induscorp.com/enviro/html/fii/api/frs_api_services.html#LOOKUP4.14
function frs_city_state_to_zip_code($city, $state)
{
    $test_domain = "http://dev.epacdx.net/FrsServicesTestHarness/ServiceProxy/Get?url=";
    $base_url = 'http://epadev.induscorp.com/fiicdx/FRS_API_LOOKUP_SERVICES.get_zip_by_city_state?p_ip_address=1&p_token=1&p_city_name='
        . $city . '&p_state_abbr=' . $state;
//    $base_url = 'http://epadev.induscorp.com/fiicdx/FRS_API_LOOKUP_SERVICES.get_zip_by_city_state?p_token=1&p_ip_address=1&p_city_name=FALLS CHURCH&p_state_abbr=VA';
//    echo $base_url . '<br />';
    $encoded_base_url = urlencode($base_url);
    $request_url = $test_domain . $encoded_base_url;
//    $data = array(
//        'p_token' => 1,
//        'p_ip_address' => 1,
//        'p_postal_code' => $zip,
//    );
//    $data = array( 'url' => $encoded_base_url);
//    $data = drupal_json_encode($data);
    $options = array(
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'method' => 'GET',
//        'data' => $data
    );
    $response = drupal_http_request($request_url, $options);
//
//    $data = array(
//        'p_token' => 1,
//        'p_ip_address' => 1,
//        'p_city_name' => $city,
//        'p_state_abbr' => $state,
//    );
//    $data = drupal_json_encode($data);
//    $options = array(
//        'headers' => array(
//            'Content-Type' => 'application/json',
//        ),
//        'method' => 'GET',
//        'data' => $data
//    );
//    $response = drupal_http_request($base_url, $options);
    $results = json_decode($response->data);
    $formatted_city = ucwords(strtolower($city));

    $return = array(
        'zip_array' => $results->postalCodes,
        'state' => $state,
        'city' => $formatted_city,
    );
    return $return;
}

// http://epadev.induscorp.com/enviro/html/fii/api/frs_api_services.html#LOOKUP4.13
function frs_zip_code_to_city_state($zip)
{
    /// TESTING:
//    $zip = $_GET['zip'];
    $test_domain = "http://dev.epacdx.net/FrsServicesTestHarness/ServiceProxy/Get?url=";
    $base_url = 'http://epadev.induscorp.com/fiicdx/FRS_API_LOOKUP_SERVICES.get_city_state_by_zip?p_ip_address=1&p_postal_code=' . $zip . '&p_token=1';
    $encoded_base_url = urlencode($base_url);
    $request_url = $test_domain . $encoded_base_url;
//    $data = array(
//        'p_token' => 1,
//        'p_ip_address' => 1,
//        'p_postal_code' => $zip,
//    );
//    $data = array( 'url' => $encoded_base_url);
//    $data = drupal_json_encode($data);
    $options = array(
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'method' => 'GET',
//        'data' => $data
    );
    $response = drupal_http_request($request_url, $options);
    $data = json_decode($response->data);
    $results = $data->Results;
    $formatted_city = ucwords(strtolower($results->cityName));
    if ($formatted_city != '') {
        $error = false;
    } else {
        $error = true;
    }
    $return = array(
        'city' => $results->cityName,
        'state' => $results->stateCode,
        'error' => $error,
    );
    return $return;
}