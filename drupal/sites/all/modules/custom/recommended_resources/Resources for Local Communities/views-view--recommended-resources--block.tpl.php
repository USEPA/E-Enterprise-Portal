<?php
$module_name = "recommended_resources";
drupal_add_js(drupal_get_path('module', $module_name) . "/js/LocalResourcesTable.js", "file");
drupal_add_js(drupal_get_path('module', $module_name) . "/js/recommended_resources.js", "file");
drupal_add_js(drupal_get_path('module', $module_name) . "/js/manage_my_topics_component.js", "file");
drupal_add_js(drupal_get_path('module', $module_name) . "/js/embedded_lgc_topics_view.js", "file");
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

<div class="back-to-lgc-widget">
  <div class="usa-grid">
    <div class="usa-width-one-third">
      <span class="left-arrow"></span>
    </div>
    <div class="usa-width-two-thirds">
      <a href="javascript:void(0)">Back</a>
      <h4>Resources for Local Communities</h4>
    </div>
  </div>
</div>


<div class="usa-grid lgc-topic-header">
  <div class="usa-width-one-whole">
    <h3 class="lgc-header"></h3> <a class="unfollow-lgc-topic" href="javascript:void(0)">Unfollow</a>

  </div>
</div>

<div id="local-resources-tabs" class="view-content">
  <?php
  // Load the currently logged in user.
  global $user;
  // Check if the user has the 'editor' role.
  if ($user->name != 'guest-user'): ?>
    <ul>

      <li id="restrict-to-local-resources-button"><a class="favorites-ignore" href="#user-local-resources">My
          Resources</a></li>

      <li id="all-local-resources-button"><a class="favorites-ignore" href="#all-local-resources-wrapper">All</a>
      </li>

    </ul>
    <?php endif; ?>

  <?php
  if ($user->name != 'guest-user'): ?>
    <div id="user-local-resources"></div>
    <?php endif;
  ?>
  <div id="all-local-resources-wrapper">
    <div id="all-local-resources"></div>
  </div>

</div>

<div id="manage-my-topics-wrapper">

</div>
