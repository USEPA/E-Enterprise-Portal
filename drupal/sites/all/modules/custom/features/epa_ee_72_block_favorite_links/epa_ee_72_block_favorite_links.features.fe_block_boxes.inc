<?php
/**
 * @file
 * epa_ee_72_block_favorite_links.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function epa_ee_72_block_favorite_links_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Favorite Links';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'eenterprise_favorite_links';
  $fe_block_boxes->body = '<div class="panel panel-default">
<div class="panel-body ">

<div id="load_links"></div>
<div id="load_more" style="display:none"><button class="btn btn-success" id="load_more_favorites">See More</button></div>
<div id="load_more" style="display:none"><button class="btn btn-success" id="load_less_favorites">See Less</button></div>

<div id="loading_list" style="display:none">Loading...</div>

</div>
</div>

';

  $export['eenterprise_favorite_links'] = $fe_block_boxes;

  return $export;
}
