<?php
$module_name = "recommended_resources";

drupal_add_js(drupal_get_path('module', $module_name) . "/js/recommended_resources.js", "file");
drupal_add_css(drupal_get_path('module', $module_name) . "/css/recommended_resources.css", "file");


/**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
?>
<div id="local-resources-tabs" class="view-content">
    <?php
    // Load the currently logged in user.
    global $user;
    // Check if the user has the 'editor' role.
    if (in_array('local_government_admin', $user->roles) || $user->uid == 1) {
        ?>
        <div class="action-links"><a href="/local-resource-editor" class="favorites-ignore">Manage Resources</a></div>
        <?php
    }
    ?>

    <?php
    if ($user->name != 'guest-user') {
        ?>
        <ul>

            <li id="restrict-to-local-resources-button"><a class="favorites-ignore" href="#user-local-resources">My
                    Resources</a></li>

            <li id="all-local-resources-button"><a class="favorites-ignore" href="#all-local-resources-wrapper">All</a>
            </li>

        </ul>
        <?php
    }
    ?>

    <?php
    if ($user->name != 'guest-user') {
        ?>
        <div id="user-local-resources"></div>
        <?php
    }
    ?>
    <div id="all-local-resources-wrapper">
        <?php echo lgc_topics_multiselect(); ?>
        <div id="all-local-resources"></div>
    </div>

</div>
