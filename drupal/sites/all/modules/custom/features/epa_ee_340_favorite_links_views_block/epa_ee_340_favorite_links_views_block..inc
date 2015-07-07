<?php
/**
 * @file
 * epa_ee_340_favorite_links_views_block..inc
 */

/**
 * Implements hook_multifield_default_multifield().
 */
function epa_ee_340_favorite_links_views_block_multifield_default_multifield() {
  $export = array();

  $multifield = new stdClass();
  $multifield->disabled = FALSE; /* Edit this to true to make a default multifield disabled initially */
  $multifield->machine_name = 'field_profile_favourites';
  $multifield->label = 'field_profile_favourites';
  $multifield->description = '';
  $export['field_profile_favourites'] = $multifield;

  return $export;
}
