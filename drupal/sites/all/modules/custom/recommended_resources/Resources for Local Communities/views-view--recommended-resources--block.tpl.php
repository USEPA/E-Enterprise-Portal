<?php
drupal_add_js(libraries_get_path('yadcf') . '/0.8.9/jquery.dataTables.yadcf.js', 'file');
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
      <li id="all-local-resources-button"><a class="favorites-ignore" href="#all-local-resources-wrapper">All</a>
      </li>
      <li id="restrict-to-local-resources-button"><a class="favorites-ignore" href="#user-local-resources-wrapper">My
          Resources</a></li>
    </ul>
    <?php endif; ?>

  <div id="all-local-resources-wrapper" class="all local resources wrapper clearfix">
    <div class="faceted-filters on left">
      <div class="toggle">Adjust selections <span>&lt;</span></div>
      <h3>Source</h3>
      <div class="source facet"></div>
      <h3>Topic</h3>
      <div class="topic facet"></div>
      <h3>Category</h3>
      <div class="category facet"></div>
      <h3>Tool Type</h3>
      <div class="tool-type facet"></div>
      <h3>Training Level</h3>
      <div class="training-level facet"></div>
      <h3>Data Requirements</h3>
      <div class="data-requirements facet"></div>
      <h3>Relevance</h3>
      <div class="relevance facet"></div>
    </div>
    <div class="left">
      <div class="clearfix">
        <div class="faceted-filters off left">
          <div class="toggle">Adjust selections <span>&gt;</span></div>
        </div>
        <div class="your-selections">
          <div class="selection-lbl">Your selections:</div>
        </div>
      </div>
      <div id="all-local-resources"></div>
    </div>
  </div>
  <?php
  if ($user->name != 'guest-user'): ?>
    <div id="user-local-resources-wrapper" class="user local resources wrapper clearfix">
      <div class="faceted-filters on left">
        <div class="toggle">Adjust selections <span>&lt;</span></div>
        <h3>Topic</h3>
        <div class="topic facet"></div>
        <h3>Category</h3>
        <div class="category facet"></div>
        <h3>Tool Type</h3>
        <div class="tool-type facet"></div>
        <h3>Training Level</h3>
        <div class="training-level facet"></div>
        <h3>Relevance</h3>
        <div class="relevance facet"></div>
      </div>
      <div class="left">
        <div class="clearfix">
          <div class="faceted-filters off left">
            <div class="toggle">Adjust selections <span>&gt;</span></div>
          </div>
          <div class="your-selections">Your selections:</div>
        </div>
        <div id="user-local-resources"></div>
      </div>
    </div>
    <?php endif;
  ?>

</div>

<div id="manage-my-topics-wrapper">

</div>
