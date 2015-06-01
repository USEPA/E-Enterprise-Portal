<?php
/**
 * @file
 * epa_ee_263_content_type_release_notes.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function epa_ee_263_content_type_release_notes_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'node-epa_release_notes-body'
  $field_instances['node-epa_release_notes-body'] = array(
    'bundle' => 'epa_release_notes',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => 'Include a bulleted list of items planned / completed in this sprint / release',
    'display' => array(
      'default' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(),
        'type' => 'text_default',
        'weight' => 0,
      ),
      'teaser' => array(
        'label' => 'hidden',
        'module' => 'text',
        'settings' => array(
          'trim_length' => 600,
        ),
        'type' => 'text_summary_or_trimmed',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'body',
    'label' => 'Release Items',
    'required' => 1,
    'settings' => array(
      'display_summary' => 1,
      'text_processing' => 1,
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'text',
      'settings' => array(
        'rows' => 20,
        'summary_rows' => 5,
      ),
      'type' => 'text_textarea_with_summary',
      'weight' => -4,
    ),
  );

  // Exported field_instance: 'node-epa_release_notes-field_release_status'
  $field_instances['node-epa_release_notes-field_release_status'] = array(
    'bundle' => 'epa_release_notes',
    'default_value' => NULL,
    'deleted' => 0,
    'description' => '',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'taxonomy',
        'settings' => array(),
        'type' => 'taxonomy_term_reference_link',
        'weight' => 1,
      ),
      'teaser' => array(
        'label' => 'above',
        'settings' => array(),
        'type' => 'hidden',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'node',
    'field_name' => 'field_release_status',
    'label' => 'Release status',
    'required' => FALSE,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'module' => 'options',
      'settings' => array(),
      'type' => 'options_select',
      'weight' => -3,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Include a bulleted list of items planned / completed in this sprint / release');
  t('Release Items');
  t('Release status');

  return $field_instances;
}
