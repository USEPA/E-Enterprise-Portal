<?php
/**
 * @file
 * first_time_user_profile_block.features.inc
 */

/**
 * Implements hook_views_api().
 */
function first_time_user_profile_block_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_menu().
 **/

function first_time_user_profile_block_menu() {
    $items =array();
    $items['save_first_time_user_preferences'] = array(
        'page callback' => 'save_first_time_user_preferences',
        'access callback' => TRUE,
    );
        $items['return_location_data'] = array(
        'page callback' => 'return_location_data',
        'access callback' => TRUE,
    );
    return $items;
}


/**
 * Implements hook_theme_registry_alter().
 */
function first_time_user_profile_block_theme_registry_alter(&$theme_registry) {
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

function save_first_time_user_preferences($skip, $zip_codes, $tids) {
    global $user;
    $user_data = user_load($user->uid);
    $user_first_time = $user_data->field_first_time_user;
    $user_first_time = 0;
    if (!$skip){
        foreach($zip_codes as $zip) { //Save locations
            $multifield_zip_obj = array(
                'field_field_zip_code_value' => 'title',
                'field_field_primary_format' => 0,
                'field_field_zip_code_value' => $zip,
                'field_field_zip_code_format' => null,
                'field_field_primary' => array(
                    LANGUAGE_NONE => array(
                        0 => array(
                            'value' => 0
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
        }
    }


    $edit = array(
        'field_zip_codes' => $user_zip_codes,
//        'field_interests2' => $user_interests,
    );
    user_save($user_data,  $edit);

}
//
function return_location_data() {
    if (isset($_POST['location'])) {
        $location = $_POST['location'];
    }
    else {
        exit();
    }
    // First check $location with postal code validation
    $validation = postal_code_validation_validate($location, 'US');
    if ($validation['error']) {
        //check city, state return
    }
    else {
        $zip_lookup = zip_code_lookup($validation['postal_code']);

        echo json_encode($zip_lookup);
    }

}

