<p class="widget-note">Source: <a href=" https://www.epa.gov/npdes/stormwater-discharges-construction-activities-2017-cgp#cgp" target="_blank"
                                  rel="external">US Environmental Protection
    Agency</a></p>
<p>In areas where EPA is the permitting authority, regulated construction site
  operators are generally permitted under EPA&rsquo;s 2017 Construction General
  Permit (CGP). Find Notices of Intent (NOIs), Notices of Termination (NOTs), or
  Low Erosivity Waivers (LEWs) submitted under EPA’s 2017 Construction General
  Permit (CGP)</p>
<h3>Enter one or more search criteria</h3>
<div class="bs-callout bs-callout-warning cgp-callout-warning hide">
  <h4>Please correct the errors below:</h4>
</div>
<div class="bs-callout bs-callout-info cgp-callout-info hide">
  <h4>Everything appears valid</h4>
</div>
<div class="cgp-api-status error hide">
  <h4>The CGP external service is not available at this time. Please try again
    later.</h4>
</div>
<form id="cgp-form" class="cgp-form-elements ee-grid" data-parsley-validate>
  <div class="cgp-form-elements">
    <div class="line">
      <div class="col-md-6">
        <label for="cgp-site-facility">Site / Facility name</label>
        <input type="text" id="cgp-site-facility"
               name="projectSiteName"></div>
      <div class="col-md-6">
        <label for="cgp-npdes-id">NPDES ID</label>
        <input type="text" id="cgp-npdes-id"
               name="npdesId"
               data-parsley-pattern="/([A[LKSZR]|C[AOT]|D[EC]|F[ML]|G[AU]|HI|I[DLNA]|J[A]|K[SY]|LA|M[EHDAINSOTW]|N[EIVHJMYCD]|MP|O[HKR]|P[WAR]|RI|S[CD]|T[NX]|UT|V[TIA]|W[AVIY]]{2})([A-Z]{1})([0-9IF]{5,})/i"
               data-parsley-error-message="NPDES IDs are a combination of 3 letters and 6 alphanumeric characters.">
      </div>
    </div>
    <div class="line">
      <div class="col-md-6">
        <label
          for="cgp-permit-city">City</label>
        <input type="text"
               id="cgp-permit-city"
               name="projectCity"></div>
      <div class="col-md-3">
        <label for="cgp-permit-state">State/Territory</label>
        <select id="cgp-permit-state" name="projectState">
          <option value=""
          ">All</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AS">American Samoa</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="GU">Guam</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="JA">Johnston Atoll</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MW">Midway Islands</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="NI">Northern Mariana Islands</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="PR">Puerto Rico</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="MW">Wake Island</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="cgp-permit-zip">Zip</label>
        <input type="text" id="cgp-permit-zip" name="projectZip"
               data-parsley-pattern="/(\d{5}|\d{5}-\d{4})/">
      </div>
    </div>
    <div class="line">
      <div class="col-md-6">
        <label for="cgp-status">Status <a
            href="javascript:void(0)" id="status-definitions"
            class="fa fa-info-circle"></a></label>
        <select name="projectStatus" id="cgp-status">
          <option value="" selected>All</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="cgp-type">Form Type</label>
        <select name="applicationType" id="cgp-type">
          <option value="cgp-type-all" selected>All</option>
        </select>
      </div>
    </div>
  </div>
  <h3><a href="#" id="cgp-advanced-elements-toggle"><img
        src="sites/all/modules/custom/construction_permits/images/arrow-right.png"
        class="off toggleOff"
        alt="Advanced search criteria collapsed. Click to expand">Advanced
      search criteria</a></h3>
  <div id="cgp-advanced-elements" class="hide">
    <div class="cgp-form-elements ee-grid">
      <div class="line">
        <div class="col-md-6">
          <label for="cgp-owner-operator">Owner / operator name</label>
          <input type="text" id="cgp-owner-operator" name="operatorName">
        </div>
        <div class="col-md-6">
          <label for="cgp-federal">Federal facility?</label>
          <ul>
            <li><input type="radio" id="cgp-federal-yes" name="federalIndicator"
                       value="true">
              <label for="cgp-federal-yes">Yes</label>
            </li>
            <li><input type="radio" id="cgp-federal-no" name="federalIndicator"
                       value="false">
              <label for="cgp-federal-no">No</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="line">
        <div class="col-md-4">
          <label for="cgp-date-type">Date</label>
          <select name="cgp-date-type" id="cgp-date-type">
            <option value="date-submitted" selected>Submitted</option>
            <option value="date-updated">Updated</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="cgp-date-from" class="inline-label">Between <span
              class="sr-only"></span></label>
          <input type="text" id="cgp-date-from" name="submittedDateFrom">
        </div>
        <div class="col-md-4">
          <label for="cgp-date-to" class="inline-label">and</label>
          <input type="text" id="cgp-date-to" name="submittedDateTo">
        </div>
      </div>
      <div class="line">
        <div class="col-md-6">
          <label for="cgp-tribal">Construction on Tribal Lands</label>
          <ul>
            <li><input type="radio" id="cgp-tribal-yes" name="tribalIndicator"
                       value="true">
              <label for="cgp-tribal-yes">Yes</label>
            </li>
            <li><input type="radio" id="cgp-tribal-no" name="tribalIndicator"
                       value="false">
              <label for="cgp-tribal-no">No</label>
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <label for="cgp-tribal-lands">Tribe</label>
          <select name="tribalName" id="cgp-tribal-lands">
            <option value="" selected>All</option>
          </select>
        </div>
      </div>
      <div class="line">
        <div class="col-md-6">
          <label for="cgp-project-county">County</label>
          <select name="projectCountry" id="cgp-project-county">
            <option value="" selected>All</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div id="cgp-form-buttons">
    <div>
      <button id="cgp-reset-button" type="button"
              class="usa-button usa-button-outline">Reset
      </button>
      <button id="cgp-search-button" type="button" class="usa-button">Search
      </button>
    </div>
  </div>
</form>
<div id="construction-permits-modal"></div>
<div id="construction-permits-status-definitions"></div>
<div id="construction-permits-learnmore"><?php print $cgp_learnmore; ?></div>