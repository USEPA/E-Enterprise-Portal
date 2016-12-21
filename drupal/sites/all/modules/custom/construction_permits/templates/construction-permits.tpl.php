<p class="widget-note">Source: <a href="https://www3.epa.gov/" target="_blank" rel="external">US Environmental Protection Agency</a></p>
<p>In areas where EPA is the permitting authority, regulated construction site operators are generally permitted under EPA’s 2012 Construction General Permit (CGP).  Find notices of intent, notices of termination, or low erosity waivers.</p>
<h3>Enter one or more search criteria</h3>
<form id="cgp-form">
	<ul class="cgp-form-elements usa-grid">
        <li class="usa-grid">
            <div class="usa-grid-one-half"><label for="cgp-site-facility">Site / Facility name</label><input type="text" id="cgp-site-facility"></div>
            <div class="usa-grid-one-half"><label for="cgp-permit-number">Permit tracking number</label><input type="text" id="cgp-permit-number"></div>
        </li>
		<li class="usa-grid">
            <div class="usa-grid-one-half"><label for="cgp-permit-city">City</label><input type="text" id="cgp-permit-city"></div>
            <div class="usa-grid-one-fourth"><label for="cgp-permit-state">State</label><input type="text" id="cgp-permit-state"></div>
            <div class="usa-grid-one-fourth"><label for="cgp-permit-zip">Zip</label><input type="text" id="cgp-permit-zip"></div>
        </li>
        <li class="usa-grid">
            <div class="usa-grid-one-half"><label for="cgp-status">Status <a href="javascript:void(0)" id="status-definitions" class="fa fa-info-circle></a></label><input type="text" id="cgp-status"></div>
        </li>
	</ul>
	<h3><a href="#" class="favorites-ignore"><img src="sites/all/modules/custom/construction_permits/images/arrow-right.png" class="off" alt="Advanced search criteria collapsed. Click to expand"></a> Advanced search criteria</h3>
	<div id="cgp-advanced-elements">
        <ul>
            <li class="usa-grid">
                <div class="usa-grid-one-half"><label for="cgp-owner-operator">Owner / operator name</label><input type="text" id="cgp-owner-operator"></div>
                <div class="usa-grid-one-half">
                    <fieldset id="cgp-federal"><legend>Federal facility?</legend>
                        <ul><li><input type="radio" id="cgp-federal-yes" name="federal-facility" value="yes" ><label for="cgp-federal-yes">Yes</label></li>
                            <li><input type="radio" id="cgp-federal-yes" name="federal-facility" value="no" ><label for="cgp-federal-no">No</label></li></ul>
                    </fieldset></div>
            </li>
            <li class="usa-grid">
                <div class="usa-grid-one-half"><label for="cgp-master-general">Master general permit number</label><input type="text" id="cgp-master-general"></div>
            </li>
            <li class="usa-grid">
                <div class="usa-grid-one-third">
                    <label for="cgp-date-type">Date</label><select name="cgp-date-type" id="cgp-date-type">
                        <option value="date-select">Select&hellip;</option>
                        <option value="date-updated">Updated</option>
                        <option value="date-submitted">Submitted</option></select>
                </div>
                <div class="usa-grid-one-third">
                    <label for="cgp-date-from" class="inline-label">Between <span class="sr-only"></span></label><input type="text" id="cgp-date-from">
                </div>
                <div class="usa-grid-one-third">
                    <label for="cgp-date-from" class="inline-label">and</label><input type="text" id="cgp-date-from">
                </div>
            </li>
            <li class="usa-grid">
                <div class="usa-grid-one-half"><label for="cgp-master-permit-number">Master general permit number</label><input type="text" id="cgp-master-permit-number"></div>
            </li>
        </ul>
	</div>
	<div id="cgp-form-buttons">
	<div><a id="cgp-reset-button" href="javascript:void(0);" class="usa-button-outline">Reset</a>
	<a id="cgp-search-button" href="javascript:void(0)" class="usa-button">Search</a></div>
	</div>
</form>
<div id="construction-permits-modal"></div>
<div id="construction-permits-learnmore"><?php print $cgp_learnmore; ?></div>