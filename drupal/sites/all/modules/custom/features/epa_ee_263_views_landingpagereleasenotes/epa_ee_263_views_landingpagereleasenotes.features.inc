<?php
/**
 * @file
 * epa_ee_263_views_landingpagereleasenotes.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function epa_ee_263_views_landingpagereleasenotes_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "panels_mini" && $api == "panels_default") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function epa_ee_263_views_landingpagereleasenotes_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}
