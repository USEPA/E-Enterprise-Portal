<?php
    $module_name = "other_items_of_interest";
    drupal_add_js(drupal_get_path('module', $module_name) . "/DataTables/js/jquery.dataTables.min.js", "file");
    drupal_add_css(drupal_get_path('module', $module_name) . "/DataTables/css/jquery.dataTables.min.css", "file");
    drupal_add_js(drupal_get_path('module', $module_name) . "/js/other_items_of_interest.js", "file");
    drupal_add_css(drupal_get_path('module', $module_name) . "/css/other_items_of_interest.css", "file");


?>
    <button id="restrict-to-states-button" type="button">Favorite Locations</button>
        <button id="all-states-button" type="button" class="inactive">All Locations</button>
    <a href="/state-resource-editor" class="favorites-ignore">Edit</a>
<div id="all-state-resources"></div>
<div id="favorite-state-resources"></div>


