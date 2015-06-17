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
  $fe_block_boxes->info = 'Header for all Workbenchs';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'workbenchheader';
  $fe_block_boxes->body = '<div class="ee-workbench-top-header ee-stats">
<?php
$header_variables = get_header_variables();
print "<div class=\'ee-workbench-header-text\'>".$header_variables[\'header_text\']."</div>";
if($header_variables[\'activities\'] > 1)
    print "<div class=\'ee-workbench-activities\'>".$header_variables[\'activities\']." Activities </div>";
else
    print "<div class=\'ee-workbench-activities\'>".$header_variables[\'activities\']." Activity </div>";

if($header_variables[\'reports\'] > 1)
   print "<div class=\'ee-workbench-reports\'>".$header_variables[\'reports\']." Reports</div>";
else
    print "<div class=\'ee-workbench-reports\'>".$header_variables[\'reports\']." Report</div>";


if($header_variables[\'permits\'] > 1)
   print "<div class=\'ee-workbench-permits\'>".$header_variables[\'permits\']." Permits</div>";
else
    print "<div class=\'ee-workbench-permits\'>".$header_variables[\'permits\']." Permit</div>";


if($header_variables[\'data_sets\'] > 1)
   print "<div class=\'ee-workbench-datasets\'>".$header_variables[\'data_sets\']." Data Sets</div>";
else
    print "<div class=\'ee-workbench-datasets\'>".$header_variables[\'data_sets\']." Data Set</div>";

print "<div class=\'ee-workbench-header-locations\'>";
print "<div class=\'ee-workbench-header-primary-city\'>".$header_variables[\'locations\'][\'primary_location\']."</div>";
print "<div class=\'ee-workbench-header-city\'>".$header_variables[\'locations\'][\'location2\']."</div>";
print "<div class=\'ee-workbench-header-city\'>".$header_variables[\'locations\'][\'location3\']."</div>";
print "</div>";
?>
<a href="/">View all favorite cities</a>
Add a location <input type="text">
</div>';

  $export['workbenchheader'] = $fe_block_boxes;

  return $export;
}
