<?php
    $module_name = "other_items_of_interest";
    drupal_add_js(drupal_get_path('module', $module_name) . "/DataTables/js/jquery.dataTables.min.js", "file");
    drupal_add_css(drupal_get_path('module', $module_name) . "/DataTables/css/jquery.dataTables.min.css", "file");
    drupal_add_js(drupal_get_path('module', $module_name) . "/js/other_items_of_interest.js", "file");
    drupal_add_css(drupal_get_path('module', $module_name) . "/css/other_items_of_interest.css", "file");


?>
<button id="restrict-to-current-button" type="button"></button>
    <button id="restrict-to-states-button" type="button" class="inactive">Favorite Locations</button>
        <button id="all-states-button" type="button" class="inactive">All Locations</button>
<?php
// Load the currently logged in user.
global $user;

// Check if the user has the 'editor' role.
if (in_array('state_admin', $user->roles)) {
    ?>

    <a href="/state-resource-editor" class="favorites-ignore">Edit</a>
<?php
}
?>
<div id="current-state-resources"></div>
<div id="favorite-state-resources"></div>
<div id="all-state-resources"></div>


