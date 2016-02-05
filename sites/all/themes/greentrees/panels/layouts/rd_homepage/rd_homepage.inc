<?php
/**
 * @file
 * rd_homepage.inc
 */

/**
 * Implements hook_panels_layouts().
 */
function epa_rd_homepage_panels_layouts() {
  $items['rd_homepage'] = array(
    'title' => t('RD home page'),
    'category' => t('EPA'),
    'icon' => 'rd_homepage.png',
    'theme' => 'rd_homepage',
    'admin css' => '../grid.css',
    'regions' => array(
      'main_col' => t('Main column'),
      'rda1' => t('A1'),
      'rda2' => t('A2'),
      'rdb1' => t('B1'),
      'rdb2' => t('B2'),
      'rdc1' => t('C1'),
      'rdc2' => t('C2'),
      'bottom' => t('Bottom content'),
      'sidebar' => t('Sidebar'),
    ),
  );

  return $items;
}
