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
?>

<?php

drupal_add_js(drupal_get_path('module', 'first_time_user_profile_block') . "/js/first_time_user_profile.js", "file");
?>

<div class="row">
    <div class="col-md-6">
        <div class="col-xs-12">
            <h2>GETTING STARTED</h2>

            <h1>What matters to you?</h1>

            <h3>So many resources and we'll be adding more. To show you things that interest you, we
                have a few questions below. You can adjust these later in 'My account' too.</h3>

            <h2>Locations that interest you</h2>
        </div>
        <div class="col-xs-12">
            <div class="col-xs-3">
                Your location* <br/> Based on your service provider's location
                <i class="fa fa-key"></i>
                <i class="icon-twitter"></i>
                <font-awesome class=“fa fa-smile-o></font-awesome>
                <i class="fa fa-twitter-square"></i>

            </div>
            <div id="zip_container">

                <div class="col-xs-9">
                    <div class="col-xs-4">
                        <div id="nearest-location">No Location found</div>
                    </div>
                    <div class="col-xs-4">
                        <a href="#" id="change-location">Change Location</a>
                    </div>
                    <div class="col-xs-4">
                        <button id="add-zip-code" class="btn btn-success">+</button>
                    </div>
                </div>
            </div>
            <div style="display:none" id="new-location">Enter City, State or ZIP code- <input id="new-location-input"/>
                <button class="btn btn-default" id="add-location">Add</button><button class="btn btn-default" id="location-back-btn">Cancel</button></div>
        </div>
        <div class="col-xs-12">
            <div class="pull-right">
                <button class="btn btn-md btn-primary" id="save-preferences">Save preferences</button>
                <a href="#" id="skip-preferences">Skip this</a>
            </div>
        </div>
    </div>
</div>


