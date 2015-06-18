<?php

/**
 * Provides the fancyBox jQuery plugin, a tool that offers a nice and elegant
 * way to add zooming functionality for images, html content and multi-media
 * on your webpages, and an extensive settings page for configuring fancyBox
 * settings and how fancyBox interacts with your Drupal website.
 *
 * Commercial websites must obtain at least a single domain license in order
 * to use the fancyBox plugin legally. (http://fancyapps.com/fancybox/#license).
 *
 * If you find this module useful and would like to donate towards further
 * development and maintenance, please consider donating to the module
 * maintainer(s):
 *  - Daniel Imhoff (d.o: dwieeb, email: dwieeb@gmail.com)
 *    http://www.danielimhoff.com/donations/
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under:
 *  - Creative Commons Attribution-NonCommercial 3.0
 *    http://creativecommons.org/licenses/by-nc/3.0/
 *
 * == END LICENSE ==
 *
 * @file
 * Drush integration for the fancyBox module.
 */

/**
 * Implements hook_drush_command().
 */
function fancybox_drush_command() {
  $items['fancybox-download'] = array(
    'callback' => 'fancybox_drush_download',
    'description' => dt('Downloads the required fancyBox jQuery plugin from Github.'),
    'arguments' => array(
      'path' => dt('Optional. The path to the download folder. If omitted, Drush will use the default location (sites/all/libraries/fancybox).'),
    ),
  );

  return $items;
}

/**
 * Callback to the fancybox-download Drush command.
 */
function fancybox_drush_download() {
  $args = func_get_args();

  $path = $args[0] ? $args[0] : drush_get_context('DRUSH_DRUPAL_ROOT') . '/sites/all/libraries/fancybox';
  $cmd = 'git clone https://github.com/fancyapps/fancyBox.git ' . $path;

  if (drush_shell_exec($cmd)) {
    drush_log(dt('fancyBox was download to !path.', array('!path' => $path)), 'success');
  }
  else {
    drush_log(dt('Drush was unable to download fancyBox to !path.', array('!path' => $path)) . "\n" . dt('Attempted command: !cmd.', array('!cmd' => $cmd)), 'error');
  }
}

/**
 * Implements drush_MODULE_post_COMMAND().
 */
function drush_fancybox_post_pm_enable() {
  $modules = func_get_args();

  if (in_array('fancybox', $modules)) {
    fancybox_drush_download();
  }
}
