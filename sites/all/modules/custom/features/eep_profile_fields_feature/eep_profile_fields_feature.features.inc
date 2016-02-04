<?php
/**
 * @file
 * eep_profile_fields_feature.features.inc
 */

/**
 * Implements hook_default_profile2_type().
 */
function eep_profile_fields_feature_default_profile2_type() {
  $items = array();
  $items['eeportal_profile'] = entity_import('profile2_type', '{
    "userCategory" : true,
    "userView" : true,
    "type" : "eeportal_profile",
    "label" : "EEPortal Profile",
    "weight" : "0",
    "data" : { "registration" : 0 },
    "rdf_mapping" : []
  }');
  return $items;
}
