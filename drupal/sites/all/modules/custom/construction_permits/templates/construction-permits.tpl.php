<p class="widget-note">Source: <a href="https://www3.epa.gov/" target="_blank"
                                  rel="external">US Environmental Protection
    Agency</a></p>
<p>In areas where EPA is the permitting authority, regulated construction site
  operators are generally permitted under EPA’s 2012 Construction General Permit
  (CGP). Find notices of intent, notices of termination, or low erosity
  waivers.</p>
<h3>Enter one or more search criteria</h3>
<form id="cgp-form" class="cgp-form-elements ee-grid">
  <div class="cgp-form-elements">
    <div class="line">
      <div class="col-md-6"><label for="cgp-site-facility">Site /
          Facility name</label><input type="text" id="cgp-site-facility"
                                      name="projectSiteName"></div>
      <div class="col-md-6"><label for="cgp-permit-number">Permit
          tracking number</label><input type="text" id="cgp-permit-number"
                                        name="trackingNumber">
      </div>
    </div>
    <div class="line">
      <div class="col-md-6"><label
          for="cgp-permit-city">City</label><input type="text"
                                                   id="cgp-permit-city"
                                                   name="projectCity"></div>
      <div class="col-md-3"><label
          for="cgp-permit-state">State</label><input type="text"
                                                     id="cgp-permit-state"
                                                     name="projectState">
      </div>
      <div class="col-md-3"><label
          for="cgp-permit-zip">Zip</label><input type="text"
                                                 id="cgp-permit-zip"
                                                 name="projectZip"></div>
    </div>
    <div class="line">
      <div class="col-md-6"><label for="cgp-status">Status <a
            href="javascript:void(0)" id="status-definitions"
            class="fa fa-info-circle"></a></label><input type="text"
                                                         id="cgp-status"
                                                         name="projectStatus">
      </div>
    </div>
  </div>
  <h3><a href="#" id="cgp-advanced-elements-toggle" class="toggleOff"><img
        src="sites/all/modules/custom/construction_permits/images/arrow-right.png"
        class="off"
        alt="Advanced search criteria collapsed. Click to expand"></a> Advanced
    search criteria</h3>
  <div id="cgp-advanced-elements" class="hide">
    <div class="cgp-form-elements ee-grid">
      <div class="line">
        <div class="col-md-6"><label for="cgp-owner-operator">Owner /
            operator name</label><input type="text" id="cgp-owner-operator"
                                        name="operatorName">
        </div>
        <div class="col-md-6">
          <label for="cgp-federal">Federal facility?</label>
          <ul>
            <li><input type="radio" id="cgp-federal"
                       name="applicationType" value="yes"><label
                for="cgp-federal">Yes</label></li>
            <li><input type="radio" id="cgp-federal"
                       name="applicationType" value="no"><label
                for="cgp-federal">No</label></li>
          </ul>
        </div>
      </div>
      <div class="line">
        <div class="col-md-6"><label for="cgp-master-general">Master
            general permit number</label><input type="text"
                                                id="cgp-master-general" name="">
        </div>
      </div>
      <div class="line">
        <div class="col-md-4">
          <label for="cgp-date-type">Date</label><select name="cgp-date-type"
                                                         id="cgp-date-type">
            <option value="date-submitted" selected>Submitted</option>
            <option value="date-updated">Updated</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="cgp-date-from" class="inline-label">Between <span
              class="sr-only"></span></label><input type="text"
                                                    id="cgp-date-from"
                                                    name="submittedDateFrom">
        </div>
        <div class="col-md-4">
          <label for="cgp-date-to" class="inline-label">and</label><input
            type="text" id="cgp-date-to" name="submittedDateTo">
        </div>
      </div>
    </div>
  </div>
  <div id="cgp-form-buttons">
    <div><button id="cgp-reset-button" type="button"
            class="usa-button usa-button-outline">Reset</button>
      <button id="cgp-search-button" type="button" class="usa-button">Search</button>
    </div>
  </div>
</form>
<div id="construction-permits-modal"></div>
<div id="construction-permits-learnmore"><?php print $cgp_learnmore; ?></div>