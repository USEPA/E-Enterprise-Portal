<?php
/**
 * @file
 * village_green_block.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function village_green_block_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Village Green';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'village_green';
  $fe_block_boxes->body = '<iframe src="http://villagegreen.airnowtech.org/query?siteID=24293" style="width:35%;height:400px;"></iframe>
';

  $export['village_green'] = $fe_block_boxes;

  return $export;
}
