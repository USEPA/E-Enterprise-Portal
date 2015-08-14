<?php
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/custom_js.js", "file");
drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/js/cdx_facility_management.js", "file");
drupal_add_js('https://dev.epacdx.net/FrsPhase2/Content/v3/js/common.js', "external");
?>
<button id="view-facility-iframe">Open CDX Facility Management</button>