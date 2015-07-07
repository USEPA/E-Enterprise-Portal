<?php

/**
* Implements hook_field_default_field_bases_alter().
*/
function multifield_field_default_field_bases_alter(&$fields) {
  foreach ($fields as $field_name => $field) {
    if ($field['module'] == 'multifield') {
      // Prevent errors if a multifield is exported via features but its
      // subfields have not yet been created. Ideally core should not be
      // storing the schema indexes and foreign keys in the field definition
      // since these are both fetched from hook_field_schema().
      $fields[$field_name]['indexes'] = array();
      $fields[$field_name]['foreign keys'] = array();
    }
  }
}

/**
* Implements hook_features_pipe_COMPONENT_alter().
*/
function multifield_features_pipe_field_base_alter(&$pipe, $data, $export) {
  foreach ($data as $field_name) {
    // Export a multifield's subfields along with the field base.
    $field = field_info_field($field_name);
    if ($machine_name = multifield_extract_multifield_machine_name($field)) {
      foreach (multifield_type_get_subfields($machine_name) as $subfield_name) {
        $pipe['field_instance'][] = "multifield-{$machine_name}-{$subfield_name}";
      }
    }
  }
}
