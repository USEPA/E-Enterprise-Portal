<?php

/**
 * @file
 * View: First Time User Profile
 *
 * Required Drupal / configuration elements:
 * - People > Account Settings > First Time User (field_first_time_user)
 * - Views > First Time User Profile > Set field to User: First Time User (First Time User)
 * - Panels > Workbench Page > Edit > Add View:First Time User Profile to panel
 *
 * @ingroup views_templates
 */
?>

<?php
drupal_add_js(drupal_get_path('module', 'first_time_user_profile_block') . "/js/first_time_user_profile.js", "file");
drupal_add_css(drupal_get_path('module', 'first_time_user_profile_block') . "/css/first_time_user_profile.css", "file");
?>
<div id="first-time-user-profile">
    <h2><span>Getting Started</span>What matters to you?</h2>
    <p>So many resources and we'll be adding more. To show you things that interest you, we
have a few questions below. You can adjust these later in 'My account' too.</p>
    <h3>Locations that interest you</h3>
    <p id="location-description-intro">Pick a location to see environmental information for that area.   <span id="location-description-na">Until you choose a location, the default location will be Durham, <abbr title="North Carolina">NC</abbr>.</span></p>
    <div id="zip_container">
		<div id="location-description-user">
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