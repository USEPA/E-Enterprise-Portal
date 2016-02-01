<?php
/**
* @file
* View: First Time User Profile
*
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
drupal_add_js(drupal_get_path('module', 'frs_location_services') . "/js/first_time_user_profile.js", "file");
drupal_add_js(drupal_get_path('module', 'frs_location_services') . "/js/combobox.js", "file");
drupal_add_css(drupal_get_path('module', 'frs_location_services') . "/css/first_time_user_profile.css", "file");
global $user;
$user_data = user_load($user->uid);
dpm($user_data->field_lgc_topics_of_interest);

?>
<div id="first-time-user-profile">
    <h2><span>Getting Started</span>What matters to you?</h2>
    <p>We have many resources and will be adding more. To personalize your experience, you can include location details below. You can adjust this later in 'My account' too.</p>
    <h3>Location that interests you</h3>
    <p id="location-description-intro">Pick a location to see environmental information for that area.
        <span id="location-description-na" style="display:none">Until you choose a location, the default location will be Durham, <abbr title="North Carolina">NC</abbr>.</span></p>
    <div id="zip_container">
        <div id="loading-user-location">Loading...</div>
        <div id="location-description-user" style="display:none">
            <span id="location-description-geo">Location</span>
            <span id="nearest-location" aria-labelledby="location-description-geo">No location found</span>
            <a href="#" id="change-location">Change location</a>
        </div>
    </div><!-- @end zip_container-->
    <div id="location-add-new" style="display:none">
        <span id="new-location">
        	<label for="new-location-input">Enter city, state or ZIP code</label> <input id="new-location-input"/>
            <button class="btn btn-primary btn-sm" id="add-location">Find</button>
        </span>
        <span style="display:none" id="choose-zip-holder">
            <label for="choose-zip">Select your ZIP code</label><span id="choose-zip"></span>
			<button class="btn btn-primary btn-sm" id="confirm-zip-select">Save</button>
        </span>
        <button class="btn btn-danger btn-sm" id="cancel-zip-select">Cancel</button>
    </div><!-- @end location-add-new -->

    <div id="user-profile-addition-info">
        <div class="org-select-grouping">
            <label for="select-organization">My organization</label>
            <?php
            // select-organization is the id
            generate_taxonomy_select('select-organization');
            ?>
        </div>
        <div class="role-select-grouping">
            <label for="select-role">My role</label>
            <?php
            // select-organization is the id
            generate_taxonomy_select('select-role');
            ?>
        </div>
    </div><!-- @end user-profile-addition-info-->
    <div id="local-government-options">
        <div class="community-select-grouping">
        <label for="community-size">Community size</label>
        <?php
        // select-organization is the id
        generate_taxonomy_select('community-size');
        ?>
        </div>
        <div class="community-type-grouping">
        <label for="community-type">My community is mostly...</label>
        <input type="radio" name="community-type" class="community-type" value="rural">Rural
        <input type="radio" name="community-type" class="community-type" value="urban">Urban
        </div> <!-- @end community-type-grouping -->


    </div><!-- @end local-government-options -->
    <h3>Topics that matter</h3>
    <p>Select a few high-level topics that interest you.</p>
    <div id="high-level-interests">
        <?php high_level_taxonomy_checkboxes(); ?>
    </div>

</div><!-- @end first-time-user-profile-->
<div class="modal-footer">
    <button  class="btn btn-md btn-primary" id="save-preferences">Save preferences</button>
    <a href="#" id="skip-preferences">Skip this</a>
</div><!-- @end modal-footer-->