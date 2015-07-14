<?php

/**
 * Implements hook_views_data_alter().
 */
function qtip_views_views_data_alter(&$data) {
  $path = drupal_get_path('module', 'qtip_views') . '/views/handlers';
  $data['views']['qtip_views_field'] = array(
    'title' => t('qTip'),
    'help'  => t('Displays a field with a qTip tooltip.'),
    'path'  => $path,
    'field' => array(
      'handler' => 'qtip_views_handler_field_tooltip',
    ),
  );
}

/**
 * Implements hook_views_plugins().
 */
function qtip_views_views_plugins() {
  $path = drupal_get_path('module', 'qtip_views') . '/views';
  $plugins = array();
  $plugins['display_extender']['qtip_views'] = array(
    'title'   => t('qTip Views'),
    'path'    => $path,
    'handler' => 'qtip_views_plugin_display_extender',
  );

  return $plugins;
}
