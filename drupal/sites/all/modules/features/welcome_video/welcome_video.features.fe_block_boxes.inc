<?php
/**
 * @file
 * welcome_video.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function welcome_video_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'User login (New Bridge)';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'ee_bridge_login';
  $fe_block_boxes->body = '<div style="float:right"><a class="usa-button favorite-ignore" href="/guest_bye" id="guest-login">Log in</a></div>';

  $export['ee_bridge_login'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Login link from Guest Page';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'login_from_guest_page';
  $fe_block_boxes->body = '<div><a href="/faqs" id="faqs-link">FAQs</a><a class="usa-button favorite-ignore" href="/guest_bye" id="guest-login">Log in</a></div>';

  $export['login_from_guest_page'] = $fe_block_boxes;

  return $export;
}
