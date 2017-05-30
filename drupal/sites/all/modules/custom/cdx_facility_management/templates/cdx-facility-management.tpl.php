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

drupal_add_library('system', 'ui.accordion');

$cdx_facility_source = variable_get('cdx_facility_resource_url');
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . '/js/jquery.validate1.12.0.js', ['scope' => 'footer', 'preprocess' => true, 'group' => JS_LIBRARY, 'type' => 'file', 'cache' => true, 'requires_jquery' => true]);
drupal_add_js(str_replace('/FrsPhase2', '', $cdx_facility_source) . '/ContentFramework/v3/js/ElementGroupDisplay.js', ['scope' => 'footer', 'preprocess' => true, 'group' => JS_LIBRARY, 'type' => 'file', 'cache' => true, 'requires_jquery' => true]);
drupal_add_css(drupal_get_path('module', 'cdx_facility_management') . "/css/jquery-fancybox/jquery.fancybox.css", ['preprocess' => true, 'group' => CSS_SYSTEM]);
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . '/js/jquery.blockUI.1.7.js', ['scope' => 'footer', 'preprocess' => true, 'group' => JS_LIBRARY, 'type' => 'file', 'cache' => true, 'requires_jquery' => true]);
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . '/js/handlebars-v3.0.3.js', ['scope' => 'footer', 'preprocess' => true, 'group' => JS_LIBRARY, 'type' => 'file', 'cache' => true, 'requires_jquery' => true]);


// Mapping scripts
drupal_add_css('https://js.arcgis.com/3.13/dijit/themes/claro/claro.css', 'external');
drupal_add_css('https://js.arcgis.com/3.13/esri/css/esri.css', 'external');

// Set load to JS_THEME because this needs to be loaded with themes items after libraries have been loaded

drupal_add_js('//js.arcgis.com/3.13/init.js', ['requires_jquery' => TRUE, 'scope' => 'footer', 'type' => 'external', 'group' => JS_DEFAULT]);
drupal_add_css($cdx_facility_source . '/FacilityManagement/FacilityWidget/FacilityManagementStyles.css', 'external', ['scope' => 'footer']);
echo '<!--[if IE 8]><link rel="stylesheet" href="' . $cdx_facility_source . '/FacilityManagement/FacilityWidget/FacilityManagementStyles-ie8.css"><![endif]-->';
drupal_add_js(str_replace('/FrsPhase2', '', $cdx_facility_source) . '/FacilityManagement/FacilityWidget/src/FacilityManagementWidget.js', ['requires_jquery' => TRUE, 'scope' => 'footer', 'type' => 'external', 'group' => JS_DEFAULT]);


drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/js/cdx_facility_management.js", ['scope' => 'footer', 'preprocess' => true, 'group' => JS_DEFAULT, 'type' => 'file', 'cache' => true, 'requires_jquery' => true]);
drupal_add_css(drupal_get_path('module', 'cdx_facility_management') . "/css/cdx_facility_management.css", ['preprocess' => true, 'group' => CSS_DEFAULT]);

?>

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
<table id="facility-management-initial-data" class="eportal-responsive-table">
</table>

