<?php
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/custom_js.js", "file");
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/js/cdx_facility_management.js", "file");
?>
<button id="view-facility-iframe">Open CDX Facility Management</button>




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
//drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/custom_js.js", "file");
drupal_add_css(drupal_get_path('module', 'cdx_facility_management') . "/css/cdx_facility_management.css", "file");

drupal_add_library('system', 'ui.accordion');

?>
<!-- Site must incorporate these files to use FacilityWidget -->
<!--<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>-->

<script src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery.validate1.12.0.min.js"></script>

<!--<script src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/fancybox-v2/jquery.fancybox.js"></script>-->
<script type="text/javascript" src="https://dev.epacdx.net/ContentFramework/v3/js/ElementGroupDisplay.js"></script>
<!--<link rel="stylesheet" href="../libs/jquery-ui-1.11.4.custom/jquery-ui.min.css" />-->
<link rel="stylesheet" href="https://dev.epacdx.net/ContentFramework/v3/js/third-party/fancybox-v2/jquery.fancybox.css"/>
<link rel="stylesheet" href="https://dev.epacdx.net/ContentFramework/v3/css/font-awesome-4.0.3/css/font-awesome.min.css"/>
<!--<link rel="stylesheet" href="https://dev.epacdx.net/ContentFramework/v3/css/s.css"></link>	-->
<script type="text/javascript" src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery.blockUI.1.7.js"></script>
<script src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/HandleBars/handlebars-v3.0.3.js"></script>

<!-- Below is mapping stuff -->
<link rel="stylesheet" href="//js.arcgis.com/3.13/dijit/themes/claro/claro.css"/>
<link rel="stylesheet" href="//js.arcgis.com/3.13/esri/css/esri.css"/>
<script src="//js.arcgis.com/3.13/"></script>


<!--<script src="../dist/FacilityManagementWidget.min.js"> </script>-->
<link rel="stylesheet"
      href="https://dev.epacdx.net/CDXRewriteMockups/FRSPhase2/FRS%20Widget/dist/FacilityManagementStyles.css">
<!--[if IE 8]>
<link rel="stylesheet" href="../../ContentFramework/v3/css/FacilityManagementStyles-ie8.css"> <![endif]-->
<script src="https://dev.epacdx.net/CDXRewriteMockups/FRSPhase2/FRS%20Widget/dist/FacilityManagementTemplates.min.js"></script>
<script src="https://dev.epacdx.net/FrsPhase2/Content/v3/js/common.js"></script>
<!--<script src="../src/TablePagination.js"></script>	-->
<script src="https://dev.epacdx.net/CDXRewriteMockups/FRSPhase2/FRS%20Widget/temp/concat.js"></script>

<div id="facility-widget" style="max-width:1363px;"></div>

