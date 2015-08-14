<?php
/**
 * @file
 * cdx_facility_management.features.inc
 */

/**
 * Implements hook_views_api().
 */
function cdx_facility_management_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}


/**
 * Implements hook_theme_registry_alter().
 */
function cdx_facility_management_theme_registry_alter(&$theme_registry)
{
    // Defined path to the current module.
    $module_path = drupal_get_path('module', 'cdx_facility_management');
    // Find all .tpl.php files in this module's folder recursively.
    $template_file_objects = drupal_find_theme_templates($theme_registry, '.tpl.php', $module_path);
    // Iterate through all found template file objects.
    foreach ($template_file_objects as $key => $template_file_object) {
        // If the template has not already been overridden by a theme.
        if (!isset($theme_registry[$key]['theme path']) || !preg_match('#/themes/#', $theme_registry[$key]['theme path'])) {
            // Alter the theme path and template elements.
            $theme_registry[$key]['theme path'] = $module_path;
            $theme_registry[$key] = array_merge($theme_registry[$key], $template_file_object);
            $theme_registry[$key]['type'] = 'module';
        }
    }
}

/**
 * Implements hook_menu().
 **/


function  cdx_facility_management_menu()
{
    $items = array();

    $items['cdx_facility_management_iframe'] = array(
        'page callback' => 'cdx_facility_management_iframe',
        'access callback' => TRUE,
    );
    return $items;
}


/*
* Page callback sets up and returns the content for cdx-facility-management-iframe page
*/
function cdx_facility_management_iframe() {
//    drupal_add_css('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', 'external');
////drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/custom_js.js", "file");
//    drupal_add_js('https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery-1.10.2.min.js', "external");
//    drupal_add_js('https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery-ui-1.10.4/js/jquery-ui-1.10.4.min.js', "external");
//    drupal_add_js("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js", 'external');
//    drupal_add_js("https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery.validate1.12.0.min.js", 'external');
//    drupal_add_js("https://dev.epacdx.net/ContentFramework/v3/js/third-party/fancybox-v2/jquery.fancybox.js", 'external');
//    drupal_add_js("https://dev.epacdx.net/ContentFramework/v3/js/ElementGroupDisplay.js", 'external');
//
//    drupal_add_css('https://dev.epacdx.net/ContentFramework/v3/js/third-party/fancybox-v2/jquery.fancybox.css', 'external');
//    drupal_add_css('https://dev.epacdx.net/ContentFramework/v3/css/font-awesome-4.0.3/css/font-awesome.min.css', 'external');
//
//    drupal_add_js("https://dev.epacdx.net/ContentFramework/v3/js/third-party/jquery.blockUI.1.7.js", 'external');
//    drupal_add_js("https://dev.epacdx.net/ContentFramework/v3/js/third-party/HandleBars/handlebars-v3.0.3.js", 'external');
//
//    //Mapping
//    drupal_add_css('//js.arcgis.com/3.13/esri/css/esri.css', 'external');
//    drupal_add_js("//js.arcgis.com/3.13/", 'external');
//
//    drupal_add_css('https://dev.epacdx.net/CDXRewriteMockups/FRSPhase2/FRS%20Widget/dist/FacilityManagementStyles.css', 'external');
//    print '<!--[if IE 8]> <link rel="stylesheet" href="../../ContentFramework/v3/css/FacilityManagementStyles-ie8.css"> <![endif]-->';
//    drupal_add_js('https://dev.epacdx.net/FrsPhase2/Content/v3/FRS%20Widget/src/FacilityManagementTemplates.js', 'external');
//    drupal_add_js('https://dev.epacdx.net/FrsPhase2/Content/v3/js/common.js', 'external');
//    drupal_add_js('https://dev.epacdx.net/CDXRewriteMockups/FRSPhase2/FRS%20Widget/temp/concat.js', 'external');
//
//    print '<div id="facility-widget" style="max-width:1363px;"></div>';
//
//    drupal_add_js(drupal_get_path('module', 'cdx_facility_management') . "/js/cdx_facility_management_creation.js", "file");
    try {
        $build = views_embed_view('cdx_facility_management', $display_id = 'default');
    }
    catch (Exception $e) {
        $build = '';
        echo $e;
    }
    print render($build);
}
