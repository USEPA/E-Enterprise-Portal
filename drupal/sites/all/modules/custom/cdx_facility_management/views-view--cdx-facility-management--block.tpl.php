<?php

//drupal_add_css('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', 'external');
//drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/custom_js.js", "file");
drupal_add_css(drupal_get_path('module', 'cdx_facility_management') . "/css/cdx_facility_management.css", "file");
drupal_add_library('system', 'ui.accordion');
$cdx_facility_source = variable_get('cdx_facility_resource_url');

?>
<!-- Site must incorporate these files to use FacilityWidget -->
<!--<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>-->

<?php echo '<script src="' . str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/third-party/jquery.validate1.12.0.min.js"></script>';?>

<!--<script src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/fancybox-v2/jquery.fancybox.js"></script>-->
<?php echo '<script type="text/javascript" src="' . str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/ElementGroupDisplay.js"></script>';?>

<!--<link rel="stylesheet" href="../libs/jquery-ui-1.11.4.custom/jquery-ui.min.css" />-->
<?php echo '<link rel="stylesheet"
      href="' . str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/third-party/fancybox-v2/jquery.fancybox.css"/>';?>
<?php //echo '<link rel="stylesheet"
//      href="' . str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/css/font-awesome-4.0.3/css/font-awesome.min.css"/>';?>

<!--<link rel="stylesheet" href="https://dev.epacdx.net/ContentFramework/v3/css/s.css"></link>	-->
<?php echo '<script type="text/javascript" src="' . str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/third-party/jquery.blockUI.1.7.js"></script>';?>
<?php echo '<script src="' . str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/v3/js/third-party/HandleBars/handlebars-v3.0.3.js"></script>';?>


<!-- Below is mapping stuff -->
<?php
dpm($module_path);
drupal_add_css($module_path . "/css/claro.css", "file");
drupal_add_css($module_path . "/css/esri.css", "file");
drupal_add_js($module_path . "/js/arcgis_3_13_init.js", "file");

?>
<!--<link rel="stylesheet" href="/css/claro.css"/>-->
<!--<link rel="stylesheet" href="/css/esri.css"/>-->
<script src="/js/arcgis_3_13_init.js"></script>


<?php echo '<link rel="stylesheet" href="' . $cdx_facility_source .  '/ContentFramework/FRS%20Widget/FacilityManagementStyles.css">';?>

<!--[if IE 8]>
<?php echo '<link rel="stylesheet" href="' . $cdx_facility_source .  '/ContentFramework/FRS%20Widget/FacilityManagementStyles-ie8.css">';?>
<![endif]-->

<?php echo '<script src="' . $cdx_facility_source .  '/ContentFramework/FRS%20Widget/FacilityManagementTemplates.min.js"></script>';?>
<?php echo '<script src="' . str_replace('/FrsPhase2', '', $cdx_facility_source) .  '/ContentFramework/FRS%20Widget/src/FacilityManagementWidget.js"></script>';?>


<?php
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/js/custom_js.js", "file");
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/js/cdx_facility_management.js", "file");
?>


<div id="cdx-logged-in-options">
<div id="facility-widget" style="max-width:1363px;"></div>
<p class="widget-note">Use of facility widget is subject to CDX <a href="https://cdx.epa.gov/Terms" target="_blank">terms and conditions</a>. </p>
<div id="fmw-organization-select-holder"><label
        for="fmw-organization-select">Organization</label><select style="display:none" name="fmw-organization-select"
                                                                  id="fmw-organization-select"></select>
<span id="fmw-organization-single"></span></div>
<div id="fmw-program-select-holder" style="display:none"><label for="fmw-program-select">Program</label><select
        name="fmw-program-select" id="fmw-program-select"></select>
    <span id="fmw-program-single"></span></div>
<div id="fmw-type-select-holder" style="display:none"><label for="fmw-type-select">Role Type</label><select
        name="fmw-type-select" id="fmw-type-select"></select>
    <span id="fmw-type-single"></span></div>
<div class="fmw-launch"><button id="launch-facility-management" style="display:none;">Manage Facilities</button></div>
</div>
<div id="cdx-logged-out-options" style="display:none;">
    <p class="widget-note">Your secure connection to CDX Facility Management services has expired. You must log back in again to access this widget.</p><button id="cdx-logged-out-log-out" type="button" class="btn btn-sm btn-danger">Log in</button>
</div>
<div id="cdx-unable-to-load" style="display:none;">
    <p>The Facility Management tool is currently unavailable.</p>
</div>

<div ID="facility-widget-orgs-table"></div>
<table id="facility-management-initial-data" class="responsive-table">
</table>

