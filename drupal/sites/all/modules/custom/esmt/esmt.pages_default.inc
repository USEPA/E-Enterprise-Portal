<?php
/**
 * Created by PhpStorm.
 * User: smolinsk
 * Date: 10/26/2017
 * Time: 1:15 PM
 */


/**
 * Implements hook_default_page_manager_pages().
 */
function esmt_default_page_manager_pages() {
  $pages = [];
  $files = file_scan_directory(drupal_get_path('module', 'esmt'). '/pages', '/.*\.page.inc$/');
  foreach ($files as $filepath => $file) {
    $page = null;
    require $filepath;
    if (isset($page)) {
      $pages[$page->name] = $page;
    }
  }
  return $pages;
}