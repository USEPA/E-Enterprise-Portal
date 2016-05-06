<?php


$module_path = drupal_get_path('module', 'cdx_facility_management');
drupal_add_css($module_path . "/css/font-awesome.min.css", "file");
drupal_add_css($module_path . "/css/cdx_facility_management.css", "file");
?>
<!-- Site must incorporate these files to use FacilityWidget -->
<script src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery-1.10.2.min.js"></script>
<script src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery-ui-1.10.4/js/jquery-ui-1.10.4.min.js"></script>
<!--<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>-->

<script src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery.validate1.12.0.min.js"></script>

<script src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/fancybox-v2/jquery.fancybox.js"></script>
<script type="text/javascript" src="https://dev.epacdx.net/ContentFramework/v3/js/ElementGroupDisplay.js"></script>
<!--<link rel="stylesheet" href="../libs/jquery-ui-1.11.4.custom/jquery-ui.min.css" />-->
<link rel="stylesheet" href="https://dev.epacdx.net/ContentFramework/v3/js/third-party/fancybox-v2/jquery.fancybox.css"/>
<link rel="stylesheet" href="https://dev.epacdx.net/ContentFramework/v3/css/font-awesome-4.0.3/css/font-awesome.min.css"/>
<!--<link rel="stylesheet" href="https://dev.epacdx.net/ContentFramework/v3/css/s.css"></link>	-->
<script type="text/javascript" src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery.blockUI.1.7.js"></script>
<script src="https://dev.epacdx.net/ContentFramework/v3/js/third-party/HandleBars/handlebars-v3.0.3.js"></script>

<!-- Below is mapping stuff -->
<?php

//drupal_add_css($module_path . "/css/claro.css", "file");
//drupal_add_css($module_path . "/css/esri.css", "file");
//drupal_add_js($module_path . "/js/arcgis_3_13_init.js", "file");

?>
<!--<link rel="stylesheet" href="/css/claro.css"/>-->
<!--<link rel="stylesheet" href="/css/esri.css"/>-->
<!--<script src="/js/arcgis_3_13_init.js"></script>-->


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

<script>
    $.initFacilityManagementWidget({
        autoScroll: false,
        widgetDisplayType: "Edit My Facilities",
        baseServiceUrl : 'https://dev.epacdx.net/FrsPhase2',
        ImagesFolderPath: "https://dev.epacdx.net/FrsPhase2/content/v3/FRS%20Widget/images", //static
        userRoleId: 80172,
        isRegistration: false, //static
        loadFromSession: false, //static
        NASSToken: "Mary Cheat Token - FIX ASAP!!!!!!",
        NAASip: "65.248.159.78"
    });
</script>
