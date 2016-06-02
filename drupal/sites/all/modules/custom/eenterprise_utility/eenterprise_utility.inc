<?php

/**
 * Updates content User Location Preferences mapped to users zip codes saved
 * in their account.
 * Includes setting population and urban flags, and removing any duplicate zip codes.
 */
function update_user_location_preferences() {

// Load all users
  $users = entity_load('user');
  foreach ($users as $uid => $data) {
    $user_data = user_load($uid);

// Load previously saved zip and primary settings
    $zips = $user_data->field_zip_code;

// If user has not saved zips, skip
    if (count($zips) == 0) {
      continue;
    }

    $locations = array();
    $zip_name_mapping = array();

// Create array of location data for user
    foreach ($zips[LANGUAGE_NONE] as $index => $user_zip_data) {

// if no zip code is set continue
      if (count($user_zip_data['field_field_zip_code'][LANGUAGE_NONE]) === 0) {
        continue;
      }
      $zip = $user_zip_data['field_field_zip_code'][LANGUAGE_NONE][0]['safe_value'];

// If the primary value is not set default to 0
      if (count($user_zip_data['field_field_primary'][LANGUAGE_NONE]) > 0) {
        $primary = intval($user_zip_data['field_field_primary'][LANGUAGE_NONE][0]['value']);
      }
      else {
        $primary = 0;
      }

      $user_preferred_name = return_user_location_preference($uid, $zip);


      if ($user_preferred_name === "") {
        $zip_lookup = frs_zip_code_to_city_state($zip);
        $location_name = $zip_lookup['city'] . ', ' . $zip_lookup['state'];
      }
      else {
        $location_name = $user_preferred_name;
      }

// Check if name has been stored.
      if (isset($zip_name_mapping[$zip]) && $zip_name_mapping[$zip] === $location_name) {
        remove_zip_code_from_user($uid, $zip);
        continue;
      }
      else {
        $zip_name_mapping[$zip] = $location_name;
      }

      $location_stats = lookup_location_stats($zip, $location_name);
      $comm_size = $location_stats['comm_size'];
      $urban = $location_stats['urban'];
      $locations[] = array(
        "name" => $location_name,
        "zip" => $zip,
        "urban" => $urban,
        "comm_size" => $comm_size,
        "primary" => $primary
      );
    }

    clear_user_preferred_locations($uid);

    save_user_locations($uid, $locations);
  }

}


/**
 * @param $uid
 * @param $zip
 * @return string
 * Returns first found user preferred name for a zip code.
 */
function return_user_location_preference($uid, $zip) {
  $name = "";
// Check if they have a preferred name for that location
  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', 'user_location_preferences')
    ->propertyCondition('status', NODE_PUBLISHED)
    ->propertyCondition('uid', $uid)
    ->fieldCondition('field_user_zip_code', 'value', $zip, '=');
  $result = $query->execute();

// Load node information for preferred location if found
  if (isset($result['node'])) {
    $nid = key($result['node']);
    $node = node_load($nid);
    $name = $node->field_preferred_name[LANGUAGE_NONE][0]['value'];
  }

  return $name;
}

/**
 * @param $zip
 * @param $name
 * @return array
 *
 * Looks up population and urban setting for zip code and name. A zip code specific population
 * is overidden by city-name specific population if found.
 */
function lookup_location_stats($zip, $name) {
  $comm_size = "";
  $urban = "";
// Cut zip down to 5 digits
  $zip = substr($zip, 0, 5);
  $zip_pop_url = 'https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/ZipToCensusPlaceLookup_WFL/FeatureServer/1/query?';
  $zip_pop_url .= 'where=ZCTA%3D%27' . $zip . '%27&outFields=*&orderByFields=Place_Pop_2014_ACS2014&f=pjson';

  $json_file = file_get_contents($zip_pop_url);
  $result = json_decode($json_file);
// If Zip->Census Place had results:
  if (empty($result->features)) {
    return array("comm_size" => "", "urban" => "");
  }

// Loop through all Census Places for the specified zip

  foreach ($result->features as $feature) {
    if ($feature->attributes->ZCTA !== $zip) {
      continue;
    }
// Also record the zip code's population and urban/rural status
    $comm_size = $feature->attributes->Zip_Pop2014_ACS5;
    $urban = $feature->attributes->Urban;
    if ($urban === "Urban") {
      $urban = 1;
    }
    else {
      $urban = 0;
    }
    if (!empty($feature->attributes->NAME_LABEL) && $feature->attributes->NAME_LABEL === $name) {
// Overwrite population with city state
      $comm_size = $feature->attributes->Place_Pop_2014_ACS2014;
    }
// Found the stats, can exit loop
    break;
  }
  return array("comm_size" => $comm_size, "urban" => $urban);
}

/**
 * @param $uid
 * @param $locations
 *
 * Uses save_user_location defined in frs_location_services.module
 * to save each element in the $locations array
 */
function save_user_locations($uid, $locations) {
// Loop through user locations and save new content entity for each
  foreach ($locations as $location_array) {
    save_user_location(
      $location_array['zip'],
      $location_array['name'],
      $location_array['comm_size'],
      $location_array['urban'],
      $location_array['primary'],
      $uid);
  }
}

/**
 * @param $uid
 * @param $zip
 * @throws \Exception
 *
 * Removes zip code field from users collection of zip codes if it has already been
 * captured in the User Preferred Locations.
 */
function remove_zip_code_from_user($uid, $zip) {
  $user_data = user_load($uid);
  $user_zip_codes = $user_data->field_zip_code;
  $unset_delta = FALSE;
  foreach ($user_zip_codes[LANGUAGE_NONE] as $key => $data) {
    $parse_zip = $data['field_field_zip_code'][LANGUAGE_NONE][0]['value'];
    if ($parse_zip === $zip) {
      $unset_delta = $key;
      break;
    }
  }
  if ($unset_delta) {
    unset($user_zip_codes[LANGUAGE_NONE][$unset_delta]);
    $edit['field_zip_code'] = $user_zip_codes;
    user_save($user_data, $edit);
  }
}
