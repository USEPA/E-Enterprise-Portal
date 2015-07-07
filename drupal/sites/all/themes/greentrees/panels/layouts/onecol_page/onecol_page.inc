<?php
/**
 * @file
 * onecol_page.inc
 */

/**
 * Implements hook_panels_layouts().
 */
function epa_onecol_page_panels_layouts() {
  $items['onecol_page'] = array(
    'title' => t('Basic one column'),
    'category' => t('EPA'),
    'icon' => 'onecol_page.png',
    'theme' => 'onecol_page',
    'admin css' => '../grid.css',
    'regions' => array(
      'main_col' => t('Main column'),
    ),
  );

  return $items;
}
