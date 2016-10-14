<?php
/**
 * @file
 * gridstack_field_settings..inc
 */

/**
 * Implements hook_multifield_default_multifield().
 */
function gridstack_field_settings_multifield_default_multifield() {
  $export = array();

  $multifield = new stdClass();
  $multifield->disabled = FALSE; /* Edit this to true to make a default multifield disabled initially */
  $multifield->machine_name = 'field_gridstack_settings';
  $multifield->label = 'field_gridstack_settings';
  $multifield->description = '';
  $export['field_gridstack_settings'] = $multifield;

  return $export;
}
