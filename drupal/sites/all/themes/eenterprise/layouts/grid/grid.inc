<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('Single column - grid'),
  'category' => t('Columns: 1'),
  'icon' => 'grid.png',
  'theme' => 'grid',
  'css' => 'grid.css',
  'regions' => array('middle' => t('Middle column')),
);
