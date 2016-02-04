<?php
/**
 * @file
 * twocol_page.inc
 */

/**
 * Implements hook_panels_layouts().
 */
function epa_twocol_page_panels_layouts() {
  $items['twocol_page'] = array(
    'title' => t('Basic two column'),
    'category' => t('EPA'),
    'icon' => 'twocol_page.png',
    'theme' => 'twocol_page',
    'admin css' => '../grid.css',
    'regions' => array(
      'main_col' => t('Main column'),
      'sidebar' => t('Sidebar'),
    ),
  );

  return $items;
}
