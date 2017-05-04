<?php
/**
 * @file
 * linked_accounts_feature.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function linked_accounts_feature_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "page_manager" && $api == "pages_default") {
    return array("version" => "1");
  }
}
