<?php
/**
 * @file
 * View: First Time User Profile
 *
 * Required Drupal / configuration elements:
 * - People > Account Settings > First Time User (field_first_time_user)
 * - Views > First Time User Profile > Set field to User: First Time User (First Time User)
 * - Panels > Workbench Page > Edit > Add View:First Time User Profile to panel
 *
 * @ingroup views_templates
 */

drupal_add_css('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', 'external');
drupal_add_css(drupal_get_path('module', 'cdx_facility_management') . "/css/cdx_facility_management.css", "file");

drupal_add_library('system', 'ui.accordion');

$cdx_facility_source = variable_get('cdx_facility_resource_url');
drupal_add_js(str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/third-party/jquery.validate1.12.0.min.js', 'external');
drupal_add_js(str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/ElementGroupDisplay.js', 'external');

drupal_add_css(str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/third-party/fancybox-v2/jquery.fancybox.css', 'external');
drupal_add_css(str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/css/font-awesome-4.0.3/css/font-awesome.min.css', 'external');

drupal_add_js(str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/third-party/jquery.blockUI.1.7.js', 'external');
drupal_add_js(str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/third-party/HandleBars/handlebars-v3.0.3.js', 'external');

// Mapping scripts

drupal_add_css('//js.arcgis.com/3.13/esri/css/esri.css', 'external');
drupal_add_css('//js.arcgis.com/3.13/esri/css/esri.css', 'external');

// Set load to JS_THEME because this needs to be loaded with themes items after libraries have been loaded
drupal_add_js('http://js.arcgis.com/3.13/', array('type'=>'external', 'group' => JS_THEME));
drupal_add_css( $cdx_facility_source .  '/ContentFramework/FRS%20Widget/FacilityManagementStyles.css', 'external');
?>


<!--[if IE 8]>
<?php echo '<link rel="stylesheet" href="' . $cdx_facility_source .  '/ContentFramework/FRS%20Widget/FacilityManagementStyles-ie8.css">';?>
<![endif]-->

<?php
drupal_add_js($cdx_facility_source .  '/ContentFramework/FRS%20Widget/FacilityManagementTemplates.min.js', 'external');
drupal_add_js(str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/FRS%20Widget/src/FacilityManagementWidget.js', 'external');
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/js/cdx_facility_management.js", "file"); ?>

<div id="cdx-logged-in-options">
  <div id="facility-widget" style="max-width:1363px;"></div>
  <p class="widget-note">Use of facility widget is subject to CDX <a
      href="https://cdx.epa.gov/Terms" target="_blank">terms and conditions</a>.
  </p>
  <div id="fmw-organization-select-holder"><label
      for="fmw-organization-select">Organization</label><select
      style="display:none" name="fmw-organization-select"
      id="fmw-organization-select"></select>
    <span id="fmw-organization-single"></span></div>
  <div id="fmw-program-select-holder" style="display:none"><label
      for="fmw-program-select">Program</label><select
      name="fmw-program-select" id="fmw-program-select"></select>
    <span id="fmw-program-single"></span></div>
  <div id="fmw-type-select-holder" style="display:none"><label
      for="fmw-type-select">Role Type</label><select
      name="fmw-type-select" id="fmw-type-select"></select>
    <span id="fmw-type-single"></span></div>
  <div class="fmw-launch">
    <button id="launch-facility-management" style="display:none;">Manage
      Facilities
    </button>
  </div>
</div>
<div id="cdx-logged-out-options" style="display:none;">
  <p class="widget-note">Your secure connection to CDX Facility Management
    services has expired. You must log back in again to access this widget.</p>
  <button id="cdx-logged-out-log-out" type="button"
          class="btn btn-sm btn-danger">Log in
  </button>
</div>
<div id="cdx-unable-to-load" style="display:none;">
  <p>The Facility Management tool is currently unavailable.</p>
</div>

<div ID="facility-widget-orgs-table"></div>
<table id="facility-management-initial-data" class="responsive-table">
</table>

