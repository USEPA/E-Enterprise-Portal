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
//If page is Workbench or Profile, then show locations
$path = drupal_get_path_alias($_GET[\'q\']);

if ($path == \'workbench\' || $path == \'local-resources\') {
global $theme_key;
$zip_code_mapping = array();
drupal_add_js(drupal_get_path(\'theme\',  $theme_key) ."/js/workbench_locations_modal.js", "file");
drupal_add_css(drupal_get_path(\'theme\',  $theme_key) ."/css/workbench_locations_modal.css", "file");
print "<div class=\'ee-workbench-header-locations\'>";
print "<div class=\'ee-workbench-header-block ee-workbench-header-setlocation\'>";
generate_location_select();
print "</div>";
}
print "<div class=\'ee-workbench-header-block ee-feedback\'>";
print _suggestion_box_make_link(\'Questions?\');
print "</div><!-- end feedback -->";
print "</div><!-- end header locations feedback block -->";
?>';

  $export['ee_header_locations'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'EE Social Media - Spread the Word';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'ee_social_media';
  $fe_block_boxes->body = '<ul class="ee-social-media"><li><img alt="Facebook" src="/sites/all/themes/greentrees/images/facebook-white.png"></li><li><img alt="Twitter" src="/sites/all/themes/greentrees/images/twitter-white.png"></li></ul>';

  $export['ee_social_media'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Green Trees - EE Header (E-Enterprise for the Environment)';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'greentrees_ee_header';
  $fe_block_boxes->body = '<p><span class="ee-header-line1"><strong>E-Enterprise</strong> for the </span><span class="ee-header-line2">Environment</span></p>';

  $export['greentrees_ee_header'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Login link from Guest Page';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'login_from_guest_page';
  $fe_block_boxes->body = '<div><a href="/faqs" id="faqs-link">FAQs</a><a class="favorite-ignore" href="/guest_bye" id="guest-login">Log in</a></div>';

  $export['login_from_guest_page'] = $fe_block_boxes;

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
