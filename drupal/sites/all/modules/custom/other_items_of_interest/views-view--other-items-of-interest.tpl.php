<?php
$module_name = "other_items_of_interest";

drupal_add_css("sites/all/libraries/jqueryui/themes/base/minified/jquery.ui.tabs.min.css", ['scope'=>'footer', 'preprocess'=>true, 'group'=>CSS_DEFAULT]);

drupal_add_js(drupal_get_path('module', $module_name) . "/js/other_items_of_interest.js", ['scope'=>'footer', 'preprocess'=>true, 'group'=>JS_LIBRARY, 'type'=>'file', 'cache'=>true, 'requires_jquery'=>true]);
drupal_add_css(drupal_get_path('module', $module_name) . "/css/other_items_of_interest.css", ['preprocess'=>true, 'group'=>CSS_DEFAULT]);

?>

<div id="other-areas-tabs" class="view-content">
    <?php
    // Load the currently logged in user.
    global $user;
    // Check if the user has the 'editor' role.
    if (in_array('state_admin', $user->roles)) {
        ?>
        <div class="widget-note"><a href="/resource-editor" class="favorites-ignore">Manage Resources</a></div>
    <?php
    }
    ?>

    <ul>
        <li id="restrict-to-current-button"><a class="favorites-ignore" href="#current-state-resources"></a></li>
        <?php
        if ($user->name != 'guest-user') {
            ?>
            <li id="restrict-to-states-button"><a class="favorites-ignore" href="#favorite-state-resources">My
                    locations</a></li>
        <?php
        }
        ?>
        <li id="epa-button"><a class="favorites-ignore" href="#epa-resources">US EPA</a></li>
        <li id="all-states-button"><a class="favorites-ignore" href="#all-state-resources">All</a></li>
    </ul>

    <div id="current-state-resources"></div>
    <?php
    if ($user->name != 'guest-user') {
        ?>
        <div id="favorite-state-resources"></div>
    <?php
    }
    ?>
    <div id="epa-resources"></div>
    <div id="all-state-resources"></div>
</div>
