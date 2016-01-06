<?php

/**
 * @file
 * Datatables view hooks
 */

/**
 * Implements hook_views_plugins().
 */
function datatables_views_plugins() {
  $path = drupal_get_path('module', 'datatables') . '/views';
  return array(
    'module' => 'datatables',
    'style' => array(
      'datatables' => array(
        'title' => t('DataTables'),
        'help' => t('Displays rows in a jQuery table.'),
        'path' => $path,
        'theme path' => $path,
        'handler' => 'datatables_style_plugin',
        'parent' => 'table',
        'theme' => 'datatables_view',
        'uses row plugin' => FALSE,
        'uses row class' => TRUE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
      ),
    ),
  );
}
