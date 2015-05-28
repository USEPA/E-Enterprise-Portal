<?php
/**
 * @file
 * eep_profile_fields_feature.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function eep_profile_fields_feature_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_profile_favourites'
  $field_bases['field_profile_favourites'] = array(
    'active' => 1,
    'cardinality' => -1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_profile_favourites',
    'indexes' => array(
      'format' => array(
        0 => 'format',
      ),
    ),
    'locked' => 0,
    'module' => 'text',
    'settings' => array(
      'max_length' => 255,
      'profile2_private' => FALSE,
    ),
    'translatable' => 0,
    'type' => 'text',
  );

  // Exported field_base: 'field_profile_first_name'
  $field_bases['field_profile_first_name'] = array(
    'active' => 1,
    'cardinality' => 1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_profile_first_name',
    'indexes' => array(
      'format' => array(
        0 => 'format',
      ),
    ),
    'locked' => 0,
    'module' => 'text',
    'settings' => array(
      'max_length' => 255,
      'profile2_private' => FALSE,
    ),
    'translatable' => 0,
    'type' => 'text',
  );

  // Exported field_base: 'field_profile_interests'
  $field_bases['field_profile_interests'] = array(
    'active' => 1,
    'cardinality' => -1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_profile_interests',
    'indexes' => array(
      'value' => array(
        0 => 'value',
      ),
    ),
    'locked' => 0,
    'module' => 'list',
    'settings' => array(
      'allowed_values' => array(
        'MDA' => 'Agriculture',
        'MDB' => 'Air',
        'MDC' => 'Climate',
        'MDD' => 'Energy',
        'MDE' => 'Hazardous Waste',
        'MDF' => 'Radiation',
        'MDG' => 'Water',
        'TPA' => 'Awards and Recognition',
        'TPB' => 'BP Spill',
        'TPC' => 'Compliance and Enforcement',
        'TPD' => 'Emergency Response',
        'TPE' => 'Faith-Based Neighborhood Partnerships',
        'TPF' => 'Grants',
        'TPG' => 'International',
        'TPH' => 'Partnerships and Stewardship',
        'TPI' => 'Pesticides and Toxic Chemicals',
        'TPJ' => 'Recovery Act',
        'TPK' => 'Research',
        'TPL' => 'Superfund and Brownfields',
        'TPM' => 'Trash and Recycling',
        'TPN' => 'Underground Storage Tanks',
        'TPO' => 'Other',
        'RGA' => 'Region 1',
        'RGB' => 'Region 2',
        'RGC' => 'Region 3',
        'RGD' => 'Region 4',
        'RGE' => 'Region 5',
        'RGF' => 'Region 6',
        'RGG' => 'Region 7',
        'RGH' => 'Region 8',
        'RGI' => 'Region 9',
        'RGJ' => 'Region 10',
      ),
      'allowed_values_function' => '',
      'profile2_private' => FALSE,
    ),
    'translatable' => 0,
    'type' => 'list_text',
  );

  // Exported field_base: 'field_profile_last_name'
  $field_bases['field_profile_last_name'] = array(
    'active' => 1,
    'cardinality' => 1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_profile_last_name',
    'indexes' => array(
      'format' => array(
        0 => 'format',
      ),
    ),
    'locked' => 0,
    'module' => 'text',
    'settings' => array(
      'max_length' => 255,
      'profile2_private' => FALSE,
    ),
    'translatable' => 0,
    'type' => 'text',
  );

  // Exported field_base: 'field_zip_code'
  $field_bases['field_zip_code'] = array(
    'active' => 1,
    'cardinality' => -1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_zip_code',
    'indexes' => array(
      'format' => array(
        0 => 'format',
      ),
    ),
    'locked' => 0,
    'module' => 'text',
    'settings' => array(
      'max_length' => 255,
      'profile2_private' => FALSE,
    ),
    'translatable' => 0,
    'type' => 'text',
  );

  return $field_bases;
}
