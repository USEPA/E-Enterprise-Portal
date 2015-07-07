<?php
/**
 * @file
 * flexgrid.inc
 */

/**
 * Implements hook_panels_layouts().
 */
function epa_flexgrid_panels_layouts() {
  $items['flexgrid'] = array(
    'title' => t('Flexible grid'),
    'category' => t('EPA'),
    'icon' => 'flexgrid.png',
    'theme' => 'flexgrid',
    'admin css' => '../grid.css',
    'regions' => array(
      'a1' => t('A1'),
      'a2' => t('A2'),
      'a3' => t('A3'),
      'a4' => t('A4'),
      'b1' => t('B1'),
      'b2' => t('B2'),
      'b3' => t('B3'),
      'b4' => t('B4'),
      'c1' => t('C1'),
      'c2' => t('C2'),
      'c3' => t('C3'),
      'c4' => t('C4'),
    ),
  );

  return $items;
}
