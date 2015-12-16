<?php
/**
 * @file
 * sprint_14_ee_715_custom_google_analytics_block.features.fe_block_boxes.inc
 */

/**
 * Implements hook_default_fe_block_boxes().
 */
function sprint_14_ee_715_custom_google_analytics_block_default_fe_block_boxes() {
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

  return $export;
}
