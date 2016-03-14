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
  $fe_block_boxes->info = 'Sends custom events to Google Analytics';
  $fe_block_boxes->format = 'allow_javascript';
  $fe_block_boxes->machine_name = 'cdx_custom_analytics';
  $fe_block_boxes->body = '<script>
    (function($) {  
   $(document).ready(function() {
            var page_name = window.location.pathname.split(\'/\')[1];
            if (page_name == "workbench") {
                // Not pager link
                $(\'body\').on(\'click\', \'.view-progress-tracker .views-field a:not(.pager__link), .view-to-do .views-field a:not(.pager__link)\', function() {
                   var label = $(this).text();
                   console.log("sending for EPortal:" + label);
                   ga("EPA.send", "event", "Eportal", "Click", label);
                    ga("GSA.send", "event", "Eportal", "Click", label);              

});
            }
        });
    }(jQuery));

</script>';

  $export['cdx_custom_analytics'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'User login (New Bridge)';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'ee_bridge_login';
  $fe_block_boxes->body = '<div style="float:right"><a class="usa-button favorite-ignore" href="/guest_bye" id="guest-login">Log in</a></div>';

  $export['ee_bridge_login'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'EE Header Locations';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'ee_header_locations';
  $fe_block_boxes->body = '<?php
//If page is Workbench or Profile, then show locations
$path = drupal_get_path_alias($_GET[\'q\']);

if ($path == \'workbench\' || $path == \'local-resources\' || $path == \'air_now_789456\') {
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
  $fe_block_boxes->info = 'EE Showcase Disclaimer';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'ee_showcase_disclaimer';
  $fe_block_boxes->body = '<p>Welcome to the E-Enterprise AWS development environment. This is a non-production demonstration environment and is not to be used for any regulatory activity.</p>';

  $export['ee_showcase_disclaimer'] = $fe_block_boxes;

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

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Login link from Guest Page';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'login_from_guest_page';
  $fe_block_boxes->body = '<div><a href="/faqs" id="faqs-link">FAQs</a><a class="usa-button favorite-ignore" href="/guest_bye" id="guest-login">Log in</a></div>';

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
