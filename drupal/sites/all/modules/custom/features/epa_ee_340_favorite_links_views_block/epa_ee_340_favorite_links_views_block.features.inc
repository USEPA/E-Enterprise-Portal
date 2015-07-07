<?php
/**
 * @file
 * epa_ee_340_favorite_links_views_block.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function epa_ee_340_favorite_links_views_block_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "multifield" && $api == "") {
    return array("version" => "");
  }
}
