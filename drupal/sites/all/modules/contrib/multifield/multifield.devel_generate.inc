<?php

/**
 * @file
 * Devel Generate integration for Multifield module.
 */

/**
 * Implements hook_devel_generate().
 */
function multifield_devel_generate($object, $field, $instance, $bundle) {
  $item = array();
  $subbundle = $field['type'];
  $subfield_instances = field_info_instances('multifield', $subbundle);
  $subobject = _multifield_field_item_to_entity($subbundle, $item);

  foreach ($subfield_instances as $subfield_name => $subfield_instance) {
    $subfield = field_info_field($subfield_name);
    $module = $subfield['module'];

    // Include any support file that might exist for this field.
    if (in_array($module, array('file', 'image', 'taxonomy', 'number', 'text', 'comment', 'list'))) {
      // devel_generate implements on behalf of core and special friends.
      module_load_include('inc', 'devel_generate', "$module.devel_generate");
    }
    else {
      module_load_include('inc', $module, "$module.devel_generate");
    }

    if ($result = module_invoke($module, 'devel_generate', $subobject, $subfield, $subfield_instance, $subbundle)) {
      if (field_behaviors_widget('multiple values', $subfield_instance) == FIELD_BEHAVIOR_CUSTOM) {
        // Fields that handle their own multiples will add their own deltas.
        $item[$subfield_name][LANGUAGE_NONE] = $result;
      }
      else {
        // When multiples are handled by the content module, add a delta for each result.
        $item[$subfield_name][LANGUAGE_NONE][0] = $result;
      }
    }
  }

  return $item;
}
