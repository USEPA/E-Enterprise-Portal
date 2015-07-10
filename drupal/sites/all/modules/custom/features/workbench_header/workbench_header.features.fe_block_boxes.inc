<?php
/**
 * @file
 * workbench_header.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function workbench_header_default_fe_block_boxes() {
  $export = array();

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'EE Header Locations';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'ee_header_locations';
  $fe_block_boxes->body = '<?php
$header_variables = get_header_variables();
print "<div class=\'ee-workbench-header-locations\'>";
print "<div class=\'ee-workbench-header-block ee-workbench-header-setlocation\'>";
print "<label for=\'favorite-location\'>Set location</label>";
print "<select for=\'favorite-location\'>";
print "<option value=\'location1\'>".$header_variables[\'locations\'][\'primary_location\']."</option>";
print "<option value=\'location2\'>".$header_variables[\'locations\'][\'location2\']."</option>";
print "<option value=\'location3\'>".$header_variables[\'locations\'][\'location3\']."</option>";
print "</select>";
print "<a href=\'/\'>View all favorite cities</a>";
print "</div>";
?>
</div>';

  $export['ee_header_locations'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'EE Social Media - Spread the Word';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'ee_social_media';
  $fe_block_boxes->body = '<ul class="ee-social-media"><li><img alt="Facebook" src="/images/facebook-white.png"></li><li><img alt="Twitter" src="/images/twitter-white.png"></li></ul>';

  $export['ee_social_media'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Green Trees - EE Header (e-enterprise for the environment)';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'greentrees_ee_header';
  $fe_block_boxes->body = '<p><span class="ee-header-line1"><strong>e-enterprise</strong> for the&nbsp;</span><span class="ee-header-line2">environment</span></p>';

  $export['greentrees_ee_header'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Header for all Workbenchs';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'workbenchheader';
  $fe_block_boxes->body = '<div class="accordion">
<a data-toggle="collapse" data-parent="#accordion" href="#workbenchheader" id="workbench-toggle" aria-expanded="true"><span class="element-invisible" id="toggle-label">Collapse statistics</span><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></a>
<div class="row ee-workbench-top-header collapse in" id="workbenchheader" aria-expanded="true">
<?php
$header_variables = get_header_variables();
print "<h3 id=\'ee-stats-header\'>".$header_variables[\'header_text\']."</h3><ul aria-labelledby=\'ee-stats-header\'>";
if($header_variables[\'activities\'] > 1)
    print "<li class=\'ee-workbench-activities\'><span class=\'stats-count\'>".$header_variables[\'activities\']."</span> <span class=\'stats-label\'>Activities</span></li>";
else
    print "<li class=\'ee-workbench-activities\'><span class=\'stats-count\'>".$header_variables[\'activities\']."</span> <span class=stats-label\'>Activity</span></li>";

if($header_variables[\'reports\'] > 1)
   print "<li class=\'ee-workbench-reports\'><span class=\'stats-count\'>".$header_variables[\'reports\']."</span> <span class=\'stats-label\'>Reports</span></li>";
else
    print "<li class=\'ee-workbench-reports\'><span class=\'stats-count\'>".$header_variables[\'reports\']."</span> <span class=\'stats-label\'>Report</span></li>";

if($header_variables[\'permits\'] > 1)
   print "<li class=\'ee-workbench-permits\'><span class=\'stats-count\'>".$header_variables[\'permits\']."</span> <span class=\'stats-label\'>Permits</span></li>";
else
    print "<li class=\'ee-workbench-permits\'><span class=\'stats-count\'>".$header_variables[\'permits\']."</span> <span class=\'stats-label\'>Permit</span></li>";

if($header_variables[\'data_sets\'] > 1)
   print "<li class=\'ee-workbench-datasets\'><span class=\'stats-count\'>".$header_variables[\'data_sets\']."</span> <span class=\'stats-label\'>Data Sets</span></li>";
else
    print "<li class=\'ee-workbench-datasets\'><span class=\'stats-count\'>".$header_variables[\'data_sets\']."</span> <span class=\'stats-label\'>Data Set</span></li>";
print "</ul>";
print "<div class=\'ee-workbench-header-locations\'>";
print "<div class=\'ee-workbench-header-block ee-workbench-header-setlocation\'>";
print "<label for=\'favorite-location\'>Set location</label>";
print "<select for=\'favorite-location\'>";
print "<option value=\'location1\'>".$header_variables[\'locations\'][\'primary_location\']."</option>";
print "<option value=\'location2\'>".$header_variables[\'locations\'][\'location2\']."</option>";
print "<option value=\'location3\'>".$header_variables[\'locations\'][\'location3\']."</option>";
print "</select>";
print "<a href=\'/\'>View all favorite cities</a>";
print "</div>";
?>
<div class=\'ee-workbench-header-block ee-workbench-header-extras\'>
<label for="add-location">Add a location</label><input type="text" id="add-location">
</div>
</div>
</div>
</div>';

  $export['workbenchheader'] = $fe_block_boxes;

  return $export;
}
