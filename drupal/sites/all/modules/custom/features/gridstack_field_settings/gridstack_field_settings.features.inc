<?php
/**
 * @file
 * gridstack_field_settings.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function gridstack_field_settings_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "multifield" && $api == "") {
    return array("version" => "");
  }
}
