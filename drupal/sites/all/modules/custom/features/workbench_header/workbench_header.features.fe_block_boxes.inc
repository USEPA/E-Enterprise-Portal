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
  $fe_block_boxes->info = 'Login Buttons - Anonymous Users';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'anonymous_user_login_buttons';
  $fe_block_boxes->body = '<div><a class="usa-button favorite-ignore" href="<?php print base_path(); ?>bridge-landing" id="button-ee-login">Login</a><a class="usa-button favorite-ignore" href="<?php print base_path(); ?>guest_login" id="button-ee-guest">Browse as Guest</a><a href="<?php print base_path(); ?>new-users" id="button-ee-new">New User?</a></div>';

  $export['anonymous_user_login_buttons'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Sends custom events to Google Analytics';
  $fe_block_boxes->format = 'allow_javascript';
  $fe_block_boxes->machine_name = 'cdx_custom_analytics';
  $fe_block_boxes->body = '<script>
(function($) {
  $(document).ready(function() {
    var page_name = window.location.pathname.split(\'/\')[1];
    if (page_name == "workbench") {
      // Not pager link. Handles all external links in CEDRI/TO DO
      $(document).on(\'click\', \'.view-progress-tracker .views-field a:not(.pager__link), .view-to-do .views-field a:not(.pager__link)\', function() {
        var label = $(this).text();
        console.log("sending for EPortal:" + label);
        ga("EPA.send", "event", "Eportal", "Click", label);
        ga("GSA.send", "event", "Eportal", "Click", label);
      });
    }
  });
// To Do Analytics
  $(\'.view-id-to_do\').ready(function() {
    $(\'a[id^=to-do-details-link]\').click(function() {
      var label = "To Do- " + $(this).text();
      ga("EPA.send", "event", "Eportal", "Click",  label);
      ga("GSA.send", "event", "Eportal", "Click", label);
    });
  });

// Progress tracker analytics
  $(\'.pane-views-progress-tracker-block-1\').ready(function() {
console.log(\'progress tracker ready\');
    $(\'.views-field-field-prog-track-status a\').click(function() {
      var label = "Progress Tracker Status- " + $(this).text();
      ga("EPA.send", "event", "Eportal", "Click",  label);
      ga("GSA.send", "event", "Eportal", "Click", label);
    });
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
drupal_add_js(drupal_get_path(\'theme\',  $theme_key) ."/js/workbench_locations_modal.js", [\'preprocess\'=>true, \'group\'=>JS_LIBRARY, \'type\'=>\'file\', \'cache\'=>true, \'requires_jquery\'=>true]);
drupal_add_css(drupal_get_path(\'theme\',  $theme_key) ."/css/workbench_locations_modal.css", [\'preprocess\'=>true, \'group\'=>CSS_THEME]);
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
  $fe_block_boxes->info = 'E-Enterprise Portal Maintenance Message';
  $fe_block_boxes->format = 'full_html';
  $fe_block_boxes->machine_name = 'ee_portal_maintenance';
  $fe_block_boxes->body = '<div class="usa-alert-body"><p class="usa-alert-text">5/20/2016 04:15 pm EDT: The E-Enterprise Portal will be undergoing maintenance on Saturday, 5/21/16, and on Sunday, 5/22/16. During this time, certain features may not be available. We apologize for any inconvenience.</p></div>';

  $export['ee_portal_maintenance'] = $fe_block_boxes;

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

</div><!-- @end panel-body favorite-links block -->
</div><!-- @end panel-default favorite-links block -->

';

  $export['eenterprise_favorite_links'] = $fe_block_boxes;

  $fe_block_boxes = new stdClass();
  $fe_block_boxes->info = 'Login Buttons - Guest Authenticated users';
  $fe_block_boxes->format = 'php_code';
  $fe_block_boxes->machine_name = 'guest_user_login_buttons';
  $fe_block_boxes->body = '<div><a href="<?php print base_path(); ?>faqs" class="favorite-ignore" id="button-ee-faqs">FAQs</a><a class="usa-button favorite-ignore" href="<?php print base_path(); ?>guest_bye" id="button-ee-login">Login</a></div>';

  $export['guest_user_login_buttons'] = $fe_block_boxes;

  return $export;
}
