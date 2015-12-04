<?php

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
  // If user is a state admin, pass role to MyMaps.js to render Add agency maps link
	global $user;
	if (in_array('state_admin', $user->roles) || in_array('admin', $user->roles)) {
	  drupal_add_js(array('userrole' => 'state_admin'), 'setting');
	}
	else {
		drupal_add_js(array('userrole' => 'nonadmin'), 'setting');
	}
	
 	// Pass state admin role to provide additional options to MyMaps.js file
	drupal_add_js(drupal_get_path('module', 'my_maps_view') ."/js/jquery.dotdotdot.min.js", "file");
	drupal_add_js(drupal_get_path('module', 'my_maps_view') ."/js/jquery.jcarousel.min.js", "file");
	drupal_add_js(drupal_get_path('module', 'my_maps_view') ."/js/MyMaps.js", "file");
	drupal_add_css(drupal_get_path('module', 'my_maps_view') ."/css/MyMaps.css", "file");

?>
<div class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <?php print $title; ?>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($header): ?>
    <div class="view-header">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <?php if ($exposed): ?>
    <div class="view-filters">
      <?php print $exposed; ?>
    </div>
  <?php endif; ?>

  <?php if ($attachment_before): ?>
    <div class="attachment attachment-before">
      <?php print $attachment_before; ?>
    </div>
  <?php endif; ?>

  <div class="view-content">
    <div id="numThumbnails" class="numThumbnails favorites-ignore">
      <a href="https://epa.maps.arcgis.com/home/search.html?q=&t=content&focus=applications" target="_blank" class="favorites-ignore">Browse Gallery...</a>
    </div>

    <div id="myMapsFiltering">
    	<div class="farLeft">Filter by:</div>
      <ul id="myMapsFilterList">
        <li id="myMapsFilterAll" class="active-mymaps-filter"><a aria-controls="interactive-maps-carousel" id="mapsAll" class="myMapFilterTerm favorites-ignore"><span class="sr-only">Show </span>All</a><span class="sr-only"> maps</span></li>
        <li id="myMapsFilterAir"><a aria-controls="interactive-maps-carousel" id="mapsAir" class="myMapFilterTerm favorites-ignore"><span class="sr-only">Show </span>Air</a><span class="sr-only"> maps only</span></li>
        <li id="myMapsFilterWater"><a aria-controls="interactive-maps-carousel" id="mapsWater" class="myMapFilterTerm favorites-ignore"><span class="sr-only">Show </span>Water<span class="sr-only"> maps only</span></a></li>
        <li id="myMapsFilterLand"><a aria-controls="interactive-maps-carousel" id="mapsLand" class="myMapFilterTerm favorites-ignore"><span class="sr-only">Show </span>Land<span class="sr-only"> maps only</span></a></li>
      </ul>
    </div>

    <div class="jcarousel-wrapper" aria-live="polite" id="interactive-maps-carousel">
        <a href="#" class="jcarousel-control-prev"><span class="sr-only">Previous maps</span>&lsaquo;</a>
        <div class="jcarousel">
            <!-- Map thumbnails dynamically loaded here -->
            <div class="loading">Loading maps...</div>
        </div>
        <a href="#" class="jcarousel-control-next"><span class="sr-only">Next maps</span>&rsaquo;</a>
    </div>
    <!--
    <button id="filterMapsByLocationBtn" class-"filterMapsByLocationBtn">
      <img id="filterMapsByLocationImg" class="filterMapsByLocationImg" src="//t3.gstatic.com/images?q=tbn:ANd9GcSVYsaaHLMqYWVJPjoR4Um70GVVG4xK-qa1_Gy3zoPCxAjD7Lwn">
      <div id="mapsNearBtnLbl" class="mapsNearBtnLbl" style="padding-top: 1px; color: black;">Near My Location</div>
      </button>
    -->
  </div>


  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>

  <?php if ($attachment_after): ?>
    <div class="attachment attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  <?php if ($footer): ?>
    <div class="view-footer">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

  <?php if ($feed_icon): ?>
    <div class="feed-icon">
      <?php print $feed_icon; ?>
    </div>
  <?php endif; ?>

</div><?php /* class view */ ?>