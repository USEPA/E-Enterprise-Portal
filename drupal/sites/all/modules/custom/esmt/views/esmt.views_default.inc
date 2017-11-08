<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/26/2017
 * Time: 1:15 PM
 */


/**
 * Implements hook_views_default_views().
 */
function esmt_views_default_views() {
  $views = [];
  $files = file_scan_directory(drupal_get_path('module', 'esmt'). '/views', '/.*\.view.inc$/');
  foreach ($files as $filepath => $file) {
    $view = null;
    require $filepath;
    if (isset($view)) {
      $views[$view->name] = $view;
    }
  }
  return $views;
}