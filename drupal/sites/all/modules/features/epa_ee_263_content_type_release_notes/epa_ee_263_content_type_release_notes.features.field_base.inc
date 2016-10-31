<?php
/**
 * @file
 * epa_ee_263_content_type_release_notes.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function epa_ee_263_content_type_release_notes_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_release_status'
  $field_bases['field_release_status'] = array(
    'active' => 1,
    'cardinality' => 1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_release_status',
    'indexes' => array(
      'tid' => array(
        0 => 'tid',
      ),
    ),
    'locked' => 0,
    'module' => 'taxonomy',
    'settings' => array(
      'allowed_values' => array(
        0 => array(
          'vocabulary' => 'epa_release_status',
          'parent' => 0,
        ),
      ),
    ),
    'translatable' => 0,
    'type' => 'taxonomy_term_reference',
  );

  return $field_bases;
}
