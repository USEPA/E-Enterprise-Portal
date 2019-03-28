<template>
  <div>
    <AppWrapper
      :eep-app="eepApp">
      <!-- base form -->
      <div id="permit-search-wapp-inner">
        <div v-if="eepApp.size === 'small'">
          <b-form
            class="needs-validation pt-1"
            @submit="initialFormSubmit"
            novalidated>
            <b-row>
              <label
                class="mb-0 pl-3"
                for="permit-type-selection-a">Select a permit type</label>
            </b-row>
            <div class="row">
              <div class="col-8">
                <b-form-select
                  id="permit-type-selection-a"
                  class="mb-3 standard-styling"
                  :value="permitType"
                  :options="formOptions.permitType"
                  ref="permitTypeDropdown"
                  @change="setPermitType"
                  required>
                  <template slot="first">
                    <option
                      :value="null"
                      disabled>
                      Select...
                    </option>
                  </template>
                </b-form-select>
              </div>
              <div
                class="col-4"
                v-if="optionsError">
                <b-btn
                  size="sm"
                  variant="primary"
                  ref="permitTypeSubmit"
                  class="permit-lookup-base-btn"
                  type="submit"
                  disabled>
                  Search
                </b-btn>
              </div>
              <div
                class="col-4"
                v-else-if="!optionsError">
                <b-btn
                  size="sm"
                  variant="primary"
                  ref="permitTypeSubmit"
                  class="permit-lookup-base-btn"
                  type="submit">
                  Search
                </b-btn>
              </div>
            </div>
          </b-form>
          <div
            v-if="optionsError"
            class="text-danger">
            {{ optionsError }}
          </div>
          <div v-else-if="!optionsError">
            <br>
          </div>
          <b-row>
            <b-col class="permit-search-footer">
              <a
                class="text-decoration-underline cursor-pointer link-button standard-styling"
                @click="openPermitInfoModal">
                What permits can I find?
              </a>
            </b-col>
          </b-row>

          <!-- Permit Lookup Modal-->
          <AppModal
            id="permit-search-modal"
            modal-ref="permit-search-modal"
            :title="`${permitType} Lookup`"
            :hide-footer="true">
            <b-form
              class="needs-validation standard-styling"
              @submit="initialFormSubmit"
              novalidated>
              <b-row>
                <label
                  class="mb-0 pl-3"
                  for="permit-type-selection-b">Select a permit type</label>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-select
                    id="permit-type-selection-b"
                    class="mb-3 standard-styling"
                    :value="permitType"
                    :options="formOptions.permitType"
                    ref="permitTypeDropdown"
                    @change="setPermitType"
                    required>
                    <template slot="first">
                      <option disabled>Select...
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-form>
            <div
              v-if="permitType === 'Construction General Permit'"
              id="cgp-form-wrapper">
              <div
                class="input-row">
                Find Notices of Intent (NOIs), Notices of Termination (NOTs), or Low Erosivity Waivers (LEWs) submitted
                under the U.S. EPA 2017 Construction General Permit (CGP). At this time, search results will only
                include activity with the national NPDES eReporting Tool (NeT-CGP) for U.S. EPA lead and participating
                states and tribes.
              </div>
              <div
                id="cgp-header">
                Enter one or more search criteria
              </div>
              <b-form
                class="needs-validation"
                @submit="cgpFormSubmit"
                novalidated>
                <b-row
                  class="input-row">
                  <b-col md="6">
                    <label
                      class="mb-0">Site / Facility name</label>
                    <b-form-input
                      id="facility-name-input-cgp"
                      ref="facility-name-input-cgp"
                      class="mb-3"
                      :value="cgpFormData.projectSiteName"
                      @change="setCgpFacilityName"
                      type="text"
                      size="sm"/>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0">NPDES ID</label>
                    <b-form-input
                      id="NPDES-ID-cgp"
                      ref="NPDES-ID-input-cgp"
                      class="mb-3"
                      :value="cgpFormData.npdesId"
                      @change="setCgpNpdesId"
                      type="text"
                      size="sm"/>
                  </b-col>
                </b-row>

                <b-row
                  class="input-row">
                  <b-col md="6">
                    <label
                      class="mb-0">City</label>
                    <b-form-input
                      id="city-input-cgp"
                      ref="city-input-cgp"
                      class="mb-3"
                      :value="cgpFormData.projectCity"
                      @change="setCgpFacilityCity"
                      type="text"
                      size="sm"/>
                  </b-col>
                  <b-col md="3">
                    <label
                      class="mb-0">State / Territory</label>
                    <b-form-select
                      id="state-territory-selection-cgp"
                      class="mb-3"
                      :value="cgpFormData.projectState"
                      :options="formOptions.baseFormOptions.stateNames"
                      ref="stateOptions-Dropdown-cgp"
                      @change="setCgpFacilityState"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                  <b-col md="3">
                    <label
                      class="mb-0">Zip</label>
                    <b-form-input
                      id="zip-input-cgp"
                      ref="zip-input-cgp"
                      class="mb-3"
                      :value="cgpFormData.projectZip"
                      @change="setCgpFacilityZip"
                      type="number"
                      size="sm"/>
                  </b-col>
                </b-row>

                <b-row
                  class="input-row">
                  <b-col md="6">
                    <label
                      class="mb-0 label-with-info">Status</label>
                    <b-button
                      title="Information"
                      @click="openPermitStatusInfoModal"
                      class="permit-lookup-info-btn mr-1"/>
                    <b-form-select
                      id="status-selection"
                      class="mb-3"
                      :value="cgpFormData.projectStatus"
                      :options="formOptions.cgpFormOptions.formStatuses"
                      ref="status-Dropdown"
                      @change="setCgpStatus"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0">Form type</label>
                    <b-form-select
                      id="form-type-selection"
                      class="mb-3"
                      v-model="cgpType"
                      :options="formOptions.cgpFormOptions.formTypes"
                      ref="formType-Dropdown"
                      @change="setCgpFormType"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>

                <b-btn
                  @click="cgpAdvancedSearchWrapper = !cgpAdvancedSearchWrapper"
                  class="btn-outline-primary mb-1"
                  variant="outline-primary"
                  ref="btnAdvancedSettings-cgp">
                  Advanced Search Criteria
                </b-btn>
                <b-collapse
                  v-model="cgpAdvancedSearchWrapper"
                  id="cgp-advanced-search-wrapper">
                  <br>
                  <b-row
                    class="input-row">
                    <b-col md="6">
                      <label
                        class="mb-0">Facility operator name</label>
                      <b-form-input
                        id="facility-operator-input-cgp"
                        class="mb-3"
                        :value="cgpFormData.operatorName"
                        @change="setCgpOperatorName"
                        ref="facility-operator-input-cgp"
                        type="text"
                        size="sm"/>
                    </b-col>
                    <b-col md="6">
                      <label
                        class="mb-0">Federal facility?</label>
                      <b-form-radio-group
                        v-model="radioSelection4"
                        id="federal-facility-selection-cgp"
                        :options="formOptions.federalIndicator"
                        @change="setCgpFederalIndicator"
                        name="radioInline4"
                        class="mb-3"
                        ref="federal-facility-selection-cgp"/>
                    </b-col>
                  </b-row>

                  <b-row
                    class="input-row">
                    <b-col md="4">
                      <label
                        class="mb-0">Date</label>
                      <b-form-select
                        id="date-selection"
                        ref="date-selection"
                        class="mb-3"
                        :value="cgpFormData.dateSelection"
                        :options="formOptions.dateSelections"
                        @change="setCgpDateSelection"
                        size="sm">
                        <template slot="first">
                          <option
                            disabled>Select...
                          </option>
                        </template>
                      </b-form-select>
                    </b-col>
                    <b-col md="4">
                      <label
                        class="mb-0">From</label>
                      <b-form-input
                        id="start-date-input-cgp"
                        class="mb-3"
                        :value="cgpFormData.submittedDateFrom"
                        ref="start-date-input-cgp"
                        @change="setCgpStartDate"
                        size="sm"
                        type="date"
                        placeholder="MM/DD/YYYY"/>
                    </b-col>
                    <b-col md="4">
                      <label
                        class="mb-0">To</label>
                      <b-form-input
                        id="end-date-input-cgp"
                        ref="end-date-input-cgp"
                        class="mb-3"
                        :value="cgpFormData.submittedDateTo"
                        @change="setCgpEndDate"
                        size="sm"
                        type="date"
                        placeholder="MM/DD/YYYY"/>
                    </b-col>
                  </b-row>

                  <b-row
                    class="input-row">
                    <b-col md="6">
                      <label
                        class="mb-0">Construction on Tribal Lands</label>
                      <b-form-radio-group
                        v-model="radioSelection3"
                        id="tribal-lands-construction-cgp"
                        :options="formOptions.tribalIndicator"
                        @change="setCgpTribalIndicator"
                        name="radioInline3"
                        class="mb-3"
                        ref="tribal-lands-construction-cgp"/>
                    </b-col>
                    <b-col md="6">
                      <label
                        class="mb-0">Tribe</label>
                      <b-form-select
                        id="tribe-selection"
                        ref="tribe-selection"
                        class="mb-3"
                        :value="cgpFormData.tribalName"
                        :options="formOptions.baseFormOptions.tribalNames"
                        :disabled="isDisabledTribeCgp"
                        @change="setCgpTribalName"
                        size="sm">
                        <template slot="first">
                          <option
                            disabled>Select...
                          </option>
                        </template>
                      </b-form-select>
                    </b-col>
                  </b-row>

                  <b-row
                    class="input-row">
                    <b-col md="6">
                      <label
                        class="mb-0">County</label>
                      <b-form-select
                        id="county-selection-cgp"
                        ref="county-selection-cgp"
                        class="mb-3"
                        :value="cgpFormData.projectCounty"
                        :options="formOptions.cgpFormOptions.counties"
                        :disabled="isDisabledCountyCgp"
                        @change="setCgpFacilityCounty"
                        size="sm">
                        <template slot="first">
                          <option
                            disabled>Select...
                          </option>
                        </template>
                      </b-form-select>
                    </b-col>
                  </b-row>
                </b-collapse>
                <b-row>
                  <b-col md="6"/>
                  <b-col
                    md="3"
                    class="mb-1">
                    <b-btn
                      class="btn-outline-primary btn-block"
                      variant="outline-primary"
                      ref="btnResetCgp"
                      @click="clearForm">
                      Reset
                    </b-btn>
                  </b-col>
                  <b-col
                    md="3"
                    class="mb-1">
                    <b-btn
                      class="btn-block"
                      variant="primary"
                      ref="btnSubmitCgp"
                      type="submit">
                      Search
                    </b-btn>
                  </b-col>
                </b-row>
              </b-form>
              <br>
            </div>
            <div
              v-else-if="permitType === 'Multi-Sector General Permit'"
              id="msgp-form-wrapper">
              <div class="input-row">
                Find notices of intent and related submissions for general permits implemented in EPA’s NPDES eReporting
                Tool (NeT).
              </div>
              <div
                id="msgp-header">
                Enter one or more search criteria
              </div>
              <b-form
                class="needs-validation"
                @submit="msgpFormSubmit"
                novalidated>
                <b-row
                  class="input-row">
                  <b-col md="6">
                    <label
                      class="mb-0">Issuer</label>
                    <b-form-select
                      id="issue-selection"
                      class="mb-3"
                      :value="msgpFormData.issuer"
                      :options="formOptions.msgpFormOptions.issuers"
                      ref="issuer-Dropdown"
                      @change="setMsgpIssuer"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0">Submission type</label>
                    <b-form-select
                      id="submission-type-Dropdown"
                      class="mb-3"
                      :value="msgpFormData.submissionType"
                      :options="formOptions.msgpFormOptions.submissionTypes"
                      ref="submission-type-Dropdown"
                      @change="setMsgpSubmissionType"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>

                <b-row
                  class="input-row">
                  <b-col md="6">
                    <label
                      class="mb-0">Coverage type</label>
                    <b-form-select
                      id="coverage-type-selection"
                      class="mb-3"
                      v-model="msgpType"
                      :options="formOptions.msgpFormOptions.coverageTypes"
                      ref="coverage-type-selection"
                      @change="setMsgpCoverageType"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0 label-with-info">Coverage status</label>
                    <b-button
                      title="Information"
                      @click="openPermitStatusInfoModal"
                      class="permit-lookup-info-btn mr-1"/>
                    <b-form-select
                      id="form-status-selection"
                      class="mb-3"
                      :value="msgpFormData.coverageStatus"
                      :options="formOptions.msgpFormOptions.coverageStatuses"
                      ref="form-type-selection"
                      @change="setMsgpCoverageStatus"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>

                <b-row
                  class="input-row">
                  <b-col md="6">
                    <label
                      class="mb-0">NPDES ID</label>
                    <b-form-input
                      id="NPDES-ID-input-msgp"
                      ref="NPDES-ID-input-msgp"
                      class="mb-3"
                      :value="msgpFormData.npdesId"
                      @change="setMsgpNpdesId"
                      type="text"
                      size="sm"/>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0 pr-1">Sector</label>
                    <b-form-select
                      id="sector-selection"
                      class="mb-3"
                      :value="msgpFormData.sector"
                      :options="formOptions.baseFormOptions.sectorNames"
                      ref="sector-Dropdown"
                      @change="setMsgpSector"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>

                <b-row
                  class="input-row">
                  <b-col md="6">
                    <label
                      class="mb-0">Subsector</label>
                    <b-form-select
                      id="subsector-input"
                      ref="subsector-input"
                      class="mb-3"
                      :value="msgpFormData.subsector"
                      :options="formOptions.baseFormOptions.subSectorNames"
                      :disabled="isDisabledSubsectorMsgp"
                      @change="setMsgpSubsector"
                      size="sm"
                      required>
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0">Primary SIC Code</label>
                    <b-form-select
                      id="sic-code-input"
                      ref="sic-code-input"
                      class="mb-3"
                      :value="msgpFormData.sicCode"
                      :options="formOptions.baseFormOptions.sicCodes"
                      @change="setMsgpSicCode"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                    </template></b-form-select>
                  </b-col>
                </b-row>

                <b-row
                  class="input-row">
                  <b-col md="6">
                    <label
                      class="mb-0">Facility Name</label>
                    <b-form-input
                      id="facility-name-input-msgp"
                      ref="facility-name-input-msgp"
                      class="mb-3"
                      :value="msgpFormData.facilityName"
                      @change="setMsgpFacilityName"
                      type="text"
                      size="sm"/>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0">Street Address</label>
                    <b-form-input
                      id="address-input"
                      ref="address-input"
                      class="mb-3"
                      :value="msgpFormData.facilityAddressLine1"
                      @change="setMsgpAddress"
                      type="text"
                      size="sm"/>
                  </b-col>
                </b-row>

                <b-row
                  class="input-row">
                  <b-col md="6">
                    <label
                      class="mb-0">City</label>
                    <b-form-input
                      id="city-input-msgp"
                      ref="city-input-msgp"
                      class="mb-3"
                      :value="msgpFormData.facilityCity"
                      @change="setMsgpFacilityCity"
                      type="text"
                      size="sm"/>
                  </b-col>
                  <b-col md="3">
                    <label
                      class="mb-0">State / Territory</label>
                    <b-form-select
                      id="state-territory-selection-msgp"
                      class="mb-3"
                      :value="msgpFormData.facilityState"
                      :options="formOptions.baseFormOptions.stateNames"
                      ref="stateOptions-Dropdown-msgp"
                      @change="setMsgpFacilityState"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>Select...
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                  <b-col md="3">
                    <label
                      class="mb-0">Zip</label>
                    <b-form-input
                      id="zip-input-msgp"
                      ref="zip-input-msgp"
                      class="mb-3"
                      :value="msgpFormData.facilityZip"
                      @change="setMsgpFacilityZip"
                      type="number"
                      size="sm"/>
                  </b-col>
                </b-row>
                <b-btn
                  @click="msgpAdvancedSearchWrapper = !msgpAdvancedSearchWrapper"
                  class="btn-outline-primary mb-1"
                  variant="outline-primary"
                  ref="btnAdvancedSettings-msgp">
                  Advanced Search Criteria
                </b-btn>
                <b-collapse
                  v-model="msgpAdvancedSearchWrapper"
                  id="msgp-advanced-search-wrapper">
                  <br>
                  <b-row
                    class="input-row">
                    <b-col md="6">
                      <label
                        class="mb-0">Facility operator name</label>
                      <b-form-input
                        id="facility-operator-input-msgp"
                        class="mb-3"
                        :value="msgpFormData.operatorName"
                        @change="setMsgpOperatorName"
                        ref="facility-operator-input-msgp"
                        type="text"
                        size="sm"/>
                    </b-col>
                    <b-col md="6">
                      <label
                        class="mb-0">Federal operator?</label>
                      <b-form-radio-group
                        v-model="radioSelection2"
                        id="federal-facility-selection-msgp"
                        :options="formOptions.federalIndicator"
                        @change="setMsgpFederalIndicator"
                        name="radioInline2"
                        class="mb-3"
                        ref="federal-facility-selection-msgp"/>
                    </b-col>
                  </b-row>

                  <b-row
                    class="input-row">
                    <b-col md="6">
                      <label
                        class="mb-0">Master general permit</label>
                      <b-form-input
                        id="master-general-permit-input"
                        ref="master-general-permit-input"
                        class="mb-3"
                        :value="msgpFormData.masterPermitNumber"
                        @change="setMsgpMasterPermitNumber"
                        type="number"
                        size="sm"/>
                    </b-col>
                    <b-col md="3">
                      <label
                        class="mb-0">Submitted from</label>
                      <b-form-input
                        id="start-date-input-msgp"
                        class="mb-3"
                        :value="msgpFormData.submittedDateFrom"
                        ref="start-date-input-msgp"
                        @change="setMsgpStartDate"
                        size="sm"
                        type="date"
                        placeholder="MM/DD/YYYY"/>
                    </b-col>
                    <b-col md="3">
                      <label
                        class="mb-0">Submitted to</label>
                      <b-form-input
                        id="end-date-input-msgp"
                        ref="end-date-input-msgp"
                        class="mb-3"
                        :value="msgpFormData.submittedDateTo"
                        @change="setMsgpEndDate"
                        size="sm"
                        type="date"
                        placeholder="MM/DD/YYYY"/>
                    </b-col>
                  </b-row>

                  <b-row
                    class="input-row">
                    <b-col md="6">
                      <label
                        class="mb-0">Located on Indian Country Lands</label>
                      <b-form-radio-group
                        v-model="radioSelection1"
                        id="tribal-lands-construction-msgp"
                        :options="formOptions.tribalIndicator"
                        @change="setMsgpTribalIndicator"
                        name="radioInline1"
                        class="mb-3"
                        ref="tribal-lands-construction"/>
                    </b-col>
                    <b-col md="6">
                      <label
                        class="mb-0">Indian Country Land</label>
                      <b-form-select
                        id="indian-country-selection"
                        ref="indian-country-selection"
                        class="mb-3"
                        :value="msgpFormData.tribalName"
                        :options="formOptions.baseFormOptions.tribalNames"
                        :disabled="isDisabledTribeMsgp"
                        @change="setMsgpTribalName"
                        size="sm">
                        <template slot="first">
                          <option
                            disabled>Select...
                          </option>
                        </template>
                      </b-form-select>
                    </b-col>
                  </b-row>

                  <b-row
                    class="input-row">
                    <b-col md="6">
                      <label
                        class="mb-0">County</label>
                      <b-form-select
                        id="county-selection-msgp"
                        ref="county-selection-msgp"
                        class="mb-3"
                        :value="msgpFormData.facilityCounty"
                        :options="formOptions.msgpFormOptions.counties"
                        :disabled="isDisabledCountyMsgp"
                        @change="setMsgpFacilityCounty"
                        size="sm">
                        <template slot="first">
                          <option
                            disabled>Select...
                          </option>
                        </template>
                      </b-form-select>
                    </b-col>
                  </b-row>
                </b-collapse>
                <br>
                <b-row>
                  <b-col md="6"/>
                  <b-col
                    md="3"
                    class="mb-1">
                    <b-btn
                      class="btn-outline-primary btn-block"
                      variant="outline-primary"
                      ref="btnResetMsgp"
                      @click="clearForm">
                      Reset
                    </b-btn>
                  </b-col>
                  <b-col
                    md="3"
                    class="mb-1">
                    <b-btn
                      class="btn-block"
                      variant="primary"
                      ref="btnSubmitMsgp"
                      type="submit">
                      Search
                    </b-btn>
                  </b-col>
                </b-row>
              </b-form>
            </div>
            <div
              class="text-danger"
              v-if="noFieldsToQuery">{{ noFields }}
            </div>
          </AppModal>
          <!-- Permit Results Modal-->
          <AppModal
            id="permit-results-modal"
            modal-ref="permit-results-modal"
            :title="`${permitType} Lookup Results`"
            @hide="resetResultsLoaded"
            :hide-footer="true">
            <b-row>
              <b-col
                md="8"
                class="my-1">
                <b-form-group
                  horizontal
                  label="Filter"
                  label-for="filter-results"
                  class="mb-2">
                  <b-input-group>
                    <b-form-input
                      id="filter-results"
                      aria-controls="permit-lookup-table"
                      v-model="filter"/>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col
                md="4"
                class="my-1">
                <b-form-group
                  horizontal
                  label="Rows"
                  label-for="row-results"
                  class="mb-2">
                  <b-form-select
                    aria-controls="permit-lookup-table"
                    id="row-results"
                    :options="pageOptions"
                    v-model="perPage"
                    class="float-right ml-3"/>
                </b-form-group>
              </b-col>
            </b-row>
            <b-col>
              <b-row v-if="cgpResultsLoaded || msgpResultsLoaded || resultsError || noResults">
                <b-table
                  v-if="cgpResultsLoaded"
                  hover
                  stacked="lg"
                  id="permit-lookup-table-cgp"
                  class="bootstrap-vue-permit-cgp-table-scroll"
                  :items="cgpFormResults"
                  :fields="cgpFields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  :filtered="onFiltered">
                  <template
                    slot="documents"
                    slot-scope="data">
                    <template
                      v-for="attachment in data.item.attachments">
                      <a
                        v-if="attachment.category.toUpperCase() === 'COR'"
                        :href="`${formOptions.cgpFormOptions.cgpDownloadUrlBase}/form/${data.item.id}/attachment/${attachment.id}`"
                        class="pl-2">COR</a>
                      <a
                        v-else
                        :href="`${formOptions.cgpFormOptions.cgpDownloadUrlBase}/form/${data.item.id}/attachment/${attachment.id}`"
                        class="pl-2">Download</a>
                    </template>
                  </template>
                </b-table>
                <b-table
                  v-else-if="msgpResultsLoaded"
                  hover
                  stacked="lg"
                  id="permit-lookup-table-msgp"
                  class="bootstrap-vue-permit-msgp-table-scroll"
                  :items="msgpFormResults"
                  :fields="msgpFields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  :filtered="onFiltered">
                  <template
                    slot="documents"
                    slot-scope="data">
                    <template v-for="attachment in data.item.attachments">
                      <a
                        v-if="attachment.category.toUpperCase() === 'COR'"
                        :href="`${formOptions.msgpFormOptions.msgpDownloadUrlBase}/form/${data.item.id}/attachment/${attachment.id}`"
                        class="pl-2">COR</a>
                    </template>
                    <a
                      :href="`${formOptions.msgpFormOptions.msgpDownloadUrlBase}/form/${data.item.id}/attachment/zip`"
                      class="pl-2">ZIP</a>
                  </template>
                </b-table>
                <div v-else-if="resultsError">
                  <div
                    v-if="permitType === 'Multi-Sector General Permit'"
                    class="text-danger text-center">
                    {{ msgpFormResults }}
                  </div>
                  <div
                    v-if="permitType === 'Construction General Permit'"
                    class="text-danger text-center">
                    {{ cgpFormResults }}
                  </div>
                </div>
                <div v-else-if="noResults">
                  <div class="text-danger text-center">
                    No permits seem to match your search criteria.
                  </div>
                </div>
              </b-row>
            </b-col>
            <!-- pagination -->
            <b-row
              class="text-center"
              v-if="!noResults">
              <b-col
                md="12"
                class="my-1">
                <b-pagination
                  align="center"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  v-model="currentPage"
                  class="my-0">
                  <div
                    class="wapp-arrows"
                    slot="first-text"><img
                      src="/images/pager-first.png"
                      alt="Go to first page"></div>
                  <div
                    class="wapp-arrows"
                    slot="next-text"><img
                      src="/images/pager-next.png"
                      alt="Go to next page"></div>
                  <div
                    class="wapp-arrows"
                    slot="prev-text"><img
                      src="/images/pager-previous.png"
                      alt="Go to previous page"></div>
                  <div
                    class="wapp-arrows"
                    slot="last-text"><img
                      src="/images/pager-last.png"
                      alt="Go to last page"></div>
                </b-pagination>
              </b-col>
            </b-row>

          </AppModal>
          <AppModal
            id="permit-status-info-modal"
            modal-ref="permit-status-info-modal"
            title="What do the coverage status terms mean?"
            :hide-footer="true">
            <div
              v-show="permitType === 'Construction General Permit'"
              class="info-modal-component">
              <b-row>
                <div>
                  <span class="font-weight-bold">1. Active (NOI):</span> CGP NOI that has been certified, submitted to
                  EPA, and completed a 14-day review process. Active NOIs are considered covered under the CGP permit.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">2. Active (LEW):</span> A LEW that has been certified and submitted to
                  EPA. Active LEWs are considered covered under the waiver from needing CGP coverage.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">3. Submitted to EPA:</span> CGP NOI that has been certified and
                  submitted to EPA and is undergoing the 14-day review process.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">4. Active - Pending Change:</span> CGP NOI that is Active but has had a
                  Change NOI submitted to EPA and is currently undergoing the 14-day review process. Once the Change NOI
                  becomes Active, the original NOI will become Archived.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">5. Archived:</span> When a Change NOI or LEW has been submitted to EPA
                  and becomes Active, the original NOI or LEW becomes Archived and is no longer Active.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">6. Terminated:</span> CGP NOI that has been terminated for a project
                  that no longer needs permit coverage. Projects are only eligible for termination after meeting the
                  requirements of Part 8 of EPA’s 2017 CGP.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">7. Discontinued:</span> A LEW that has been discontinued for a project
                  that no longer needs or is eligible for the waiver for permit coverage.
                </div>
              </b-row>
            </div>
            <div
              v-show="permitType === 'Multi-Sector General Permit'"
              class="info-modal-component">
              <b-row>
                <div>
                  <span class="font-weight-bold">1. Active:</span> General permit coverage that has been granted by the
                  NPDES permitting authority.
                  Typically, a Notice
                  of
                  Intent (NOI) or request for exclusion or waiver that has been certified, submitted,
                  reviewed (as
                  applicable) and approved by the NPDES permitting authority.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">2. Administratively Continued:</span>  An active general permit coverage that has been extended to remain in force and
                  effect for activities
                  and discharges that were covered prior to expiration of the general permit.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">3. Expired:</span> A general permit coverage, exclusion or waiver that has reached the end of the
                  original issuance
                  period,
                  and for which requirements to submit a notice to renew coverage were not satisfied.
                  In most cases,
                  General Permits are issued for Five year periods.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">4. Terminated:</span> A general permit coverage that has been terminated. Terminations can be requested by
                  submitting a
                  Notice
                  of Termination (NOT) request for active general permit coverages. Coverage can also
                  be terminated by
                  the
                  NPDES permitting authority.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">5. Discontinued:</span> A certified exclusion or waiver from general permit coverage that has been
                  discontinued.
                  Discontinuations can be requested by submitting a Notice of Termination (NOT)
                  request for active
                  general
                  permit coverages. Exclusions and waivers can also be discontinued by the NPDES
                  permitting authority.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">6. Under Review:</span>  A Notice of Intent (NOI) for a new coverage,
                  or an exclusion/waiver request that has been submitted to the NPDES permitting authority and is
                  currently undergoing review before decision to approve or deny the coverage request.
                </div>
              </b-row>
              <b-row>
                <div>
                  <span class="font-weight-bold">7. Inactive:</span> A Notice of Intent (NOI) for a new coverage or an exclusion/waiver request that has
                  been submitted to
                  the NPDES permitting authority and has been denied coverage under the general
                  permit.
                </div>
              </b-row>
            </div>
          </AppModal>
          <AppModal
            id="permit-info-modal"
            modal-ref="permit-info-modal"
            title="What permits can I find?"
            :hide-footer="true">
            <div
              class="info-modal-component">
              <b-row>
                <div>
                  At this time, search results will only include new activity for the following
                  permits as reported in
                  the
                  national NPDES eReporting Tool (NeT) for U.S. EPA lead and participating states and
                  tribes. For
                  additional information about which submissions are currently made through NeT please
                  visit:
                  <a
                    href="https://www.epa.gov/compliance/npdes-ereporting"
                    target="_blank">
                    https://www.epa.gov/compliance/npdes-ereporting
                  </a>
                </div>
              </b-row>
            </div>
            <div
              class="info-modal-component">
              <b-row
                class="info-title">
                • Construction General Permit (CGP)
              </b-row>
              <b-row>
                Find Notices of Intent (NOIs), Notices of Termination (NOTs), or Low Erosivity Waivers
                (LEWs) submitted
                under the U.S. EPA 2017 Construction General (CGP) in NET-CGP.
              </b-row>
              <b-row class="info-title">
                • Multi-Sector General Permit (MSGP)
              </b-row>
              <b-row>
                Find new Notices of Intent (NOIs) under the U.S. EPA 2015 Multi-Sector General Permit
                (MSGP) submitted
                as of April 1, 2018 in NET-MSGP.
              </b-row>
            </div>
          </AppModal>

        </div>
        <div v-else-if="eepApp.size === 'large'">
          large
        </div>
      </div>
    </AppWrapper>
  </div>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal } from '../wadk/WADK';
  import storeModule from './store/index';

  const moduleName = 'PermitLookup';

  export default {
    name: moduleName,
    components: {
      AppWrapper,
      AppModal,
    },
    beforeCreate() {

    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    },
    data() {
      return {
        cgpAdvancedSearchWrapper: false,
        msgpAdvancedSearchWrapper: false,
        radioSelection1: null,
        radioSelection2: null,
        radioSelection3: null,
        radioSelection4: null,
        cgpType: null,
        msgpType: null,
        noFields: 'Please provide input for at least one field.',
        noFieldsToQuery: false,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
      };
    },
    mounted() {
      // get data for form options from axios call function in actions file
      this.loadBaseFormOption();
      this.loadMsgpFormOptions();
      this.loadCgpFormOptions();
    },
    computed: {
      ...mapGetters(moduleName, {
        cgpFields: 'getCgpFields',
        msgpFields: 'getMsgpFields',
        formOptions: 'getFormOptions',
        msgpFormResults: 'getMsgpFormResults',
        cgpFormResults: 'getCgpFormResults',
        msgpFormData: 'getMsgpFormData',
        cgpFormData: 'getCgpFormData',
        permitType: 'getPermitType',
        facilityName: 'getFacilityName',
        npdesId: 'getNpdesId',
        sector: 'getSector',
        facilityCity: 'getFacilityCity',
        facilityState: 'getFacilityState',
        facilityZip: 'getFacilityZip',
        status: 'getStatus',
        formType: 'getFormType',
        operatorName: 'getOperatorName',
        federalFacility: 'getFederalFacility',
        dateSelection: 'getDateSelection',
        submittedDateFrom: 'getStartDate',
        submittedDateTo: 'getEndDate',
        tribalIndicator: 'getTribalIndicator',
        tribeSelection: 'getTribeSelection',
        facilityCounty: 'getFacilityCounty',
        masterPermitNumber: 'getMasterPermitNumber',
        tribalName: 'getTribalName',
        issuer: 'getIssuer',
        submissionType: 'getSubmissionType',
        coverageType: 'getCoverageType',
        coverageStatus: 'getCoverageStatus',
        subsector: 'getSubsector',
        sicCode: 'getSicCode',
        facilityAddressLine1: 'getAddress',
        msgpResultsLoaded: 'getMsgpResultsLoaded',
        cgpResultsLoaded: 'getCgpResultsLoaded',
        msgpStateSelected: 'getMsgpStateSelected',
        msgpFormDataDefaults: 'getMsgpFormDataDefaults',
        cgpFormDataDefaults: 'getCgpFormDataDefaults',
        totalRows: 'getTotalRows',
        resultsError: 'getResultsError',
        optionsError: 'getOptionsError',
        noResults: 'getNoResults',
      }),
      isDisabledCountyMsgp() {
        return this.msgpFormData.facilityState === 'Select...';
      },
      isDisabledTribeMsgp() {
        return (this.msgpFormData.facilityState === 'Select...' || this.msgpFormData.tribalIndicator === false || this.msgpFormData.tribalIndicator === 'null');
      },
      isDisabledSubsectorMsgp() {
        return this.msgpFormData.sector === 'Select...';
      },
      isDisabledCountyCgp() {
        return this.cgpFormData.projectState === 'Select...';
      },
      isDisabledTribeCgp() {
        return (this.cgpFormData.projectState === 'Select...' || this.cgpFormData.tribalIndicator === false || this.cgpFormData.tribalIndicator === 'null');
      },
    },
    methods: {
      ...mapActions(moduleName, [
        'msgpFormGetResults',
        'cgpFormGetResults',
        'setPermitType',
        'setStatus',
        'setFormType',
        'setFederalIndicator',
        'setDateSelection',
        'setStartDate',
        'setEndDate',
        'setTribalIndicator',
        'setTribeSelection',
        'setFacilityCounty',
        'setTribalName',
        'setCgpFacilityName',
        'setCgpNpdesId',
        'setCgpFacilityCity',
        'setCgpFacilityState',
        'setCgpFacilityZip',
        'setCgpStatus',
        'setCgpFormType',
        'setCgpOperatorName',
        'setCgpFederalIndicator',
        'setCgpDateSelection',
        'setCgpStartDate',
        'setCgpEndDate',
        'setCgpTribalIndicator',
        'setCgpTribalName',
        'setCgpFacilityCounty',
        'setMsgpTribalIndicator',
        'setMsgpIssuer',
        'setMsgpFederalIndicator',
        'setMsgpFacilityCounty',
        'setMsgpStartDate',
        'setMsgpEndDate',
        'setMsgpTribalName',
        'setMsgpSubmissionType',
        'setMsgpCoverageType',
        'setMsgpCoverageStatus',
        'setMsgpSector',
        'setMsgpSubsector',
        'setMsgpSicCode',
        'setMsgpAddress',
        'setMsgpFacilityName',
        'setMsgpNpdesId',
        'setMsgpFacilityCity',
        'setMsgpFacilityState',
        'setMsgpFacilityZip',
        'setMsgpOperatorName',
        'setMsgpMasterPermitNumber',
        'loadBaseFormOption',
        'loadMsgpFormOptions',
        'loadCgpFormOptions',
        'setMsgpFormToDefaults',
        'setCgpFormToDefaults',
        'resetResultsLoaded',
      ]),
      initialFormSubmit(evt) {
        evt.preventDefault();
        this.$root.$emit('bv::show::modal', 'permit-search-modal');
      },
      openPermitInfoModal() {
        this.$root.$emit('bv::show::modal', 'permit-lookup-widget-modal');
      },
      openPermitStatusInfoModal() {
        this.$root.$emit('bv::show::modal', 'permit-status-info-modal');
      },
      cgpFormSubmit(evt) {
        const vm = this;
        evt.preventDefault();
        if (JSON.stringify(this.cgpFormData) !== JSON.stringify(this.cgpFormDataDefaults)) {
          this.noFieldsToQuery = false;
          this.cgpFormGetResults({ vm });
          this.setCgpFormToDefaults();
          this.$ga.event('eportal', 'click', 'Permit Lookup CGP Form Submission', 1);
        } else {
          this.noFieldsToQuery = true;
        }
      },
      msgpFormSubmit(evt) {
        const vm = this;
        evt.preventDefault();
        if (JSON.stringify(this.msgpFormData) !== JSON.stringify(this.msgpFormDataDefaults)) {
          this.noFieldsToQuery = false;
          this.msgpFormGetResults({ vm });
          this.$ga.event('eportal', 'click', 'Permit Lookup MSGP Form Submission', 1);
        } else {
          this.noFieldsToQuery = true;
        }
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      clearForm() {
        // clear every state when reset is pressed
        this.setMsgpFormToDefaults();
        this.setCgpFormToDefaults();
        this.resetResultsLoaded();
        this.radioSelection1 = null;
        this.radioSelection2 = null;
        this.radioSelection3 = null;
        this.radioSelection4 = null;
        this.cgpType = null;
        this.msgpType = null;
      },
      focusMyElement(e) {
        this.$refs.focusThis.focus();
      },
    },
    props: {
      eepApp: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped
  lang="scss">
  .permit-lookup-info-btn {
    background-image: url('../../assets/images/widget-info-circle.svg');
  }
  label,
  .btn,
  .custom-select-sm,
  .form-control-sm,
  .standard-styling,
  .input-row,
  #msgp-header,
  #cgp-header {
    font-size: 0.9375rem; //15px
    font-family: "Source Sans Pro Web";
  }
  .btn-sm {
    line-height: 1.4;   // Temporary fix - @todo adjust small buttons so reasonable height and padding
  }
  .form-control-sm,
  .custom-select-sm {
    line-height: 1.5;
  }

</style>
