<template>
  <div>
    <AppWrapper
      :eep-app="eepApp"/>
    <!-- base form -->
    <div id="permit-search-wapp-inner">
      <div v-if="eepApp.size === 'small'">
        <b-form
          class="needs-validation"
          @submit="initialFormSubmit"
          novalidated>
          <b-row>
            <label
              class="mb-0 pl-3"
              for="permit-type-selection">Select a permit type</label>
          </b-row>
          <b-row>
            <b-col md="8">
              <b-form-select
                id="permit-type-selection"
                class="mb-3"
                :value="permitType"
                :options="formOptions.permitType"
                ref="permitTypeDropdown"
                @change="setPermitType"
                size="sm"
                required>
                <template slot="first">
                  <option
                    disabled>{{ permitType }}
                  </option>
                </template>
              </b-form-select>
            </b-col>
            <b-col md="4">
              <b-btn
                size="sm"
                variant="primary"
                ref="btnCheckYourWater"
                type="submit">
                Lookup
              </b-btn>
            </b-col>
          </b-row>
        </b-form>
        <br/>
        <b-row>
          <b-col class="permit-search-footer">
            <a class="text-decoration-underline cursor-pointer link-button">What permits can I find?</a>
          </b-col>
        </b-row>

        <!-- Permit Lookup Modal-->
        <AppModal
          id="permit-search-modal"
          modal-ref="permit-search-modal"
          title="Permit Lookup tool"
          :hide-footer="true">
          <div
            v-if="permitType === 'Construction General Permit'"
            id="cgp-form-wrapper">
            <div>
              Enter one or more search criteria
            </div>
            <b-form
              class="needs-validation"
              @submit="cgpFormSubmit"
              novalidated>
              <b-row>
                <b-col md="6">
                  <label
                    class="mb-0">Site / Facility name</label>
                </b-col>
                <b-col md="6">
                  <label
                    class="mb-0">NPDES ID</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-input
                    id="facility-name-input-cgp"
                    ref="facility-name-input-cgp"
                    class="mb-3"
                    :value="cgpFormData.facilityName"
                    @change="setCgpFacilityName"
                    size="sm"/>
                </b-col>
                <b-col md="6">
                  <b-form-input
                    id="NPDES-ID-cgp"
                    ref="NPDES-ID-input-cgp"
                    class="mb-3"
                    :value="cgpFormData.npdesId"
                    @change="setCgpNpdesId"
                    size="sm"/>
                </b-col>
              </b-row>
              <br/>
              <b-row>
                <b-col md="6">
                  <label
                    class="mb-0">City</label>
                </b-col>
                <b-col md="3">
                  <label
                    class="mb-0">State / Territory</label>
                </b-col>
                <b-col md="3">
                  <label
                    class="mb-0">Zip</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-input
                    id="city-input-cgp"
                    ref="city-input-cgp"
                    class="mb-3"
                    :value="cgpFormData.facilityCity"
                    @change="setCgpFacilityCity"
                    size="sm"/>
                </b-col>
                <b-col md="3">
                  <b-form-select
                    id="state-territory-selection-cgp"
                    class="mb-3"
                    :value="cgpFormData.facilityState"
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
                  <b-form-input
                    id="zip-input-cgp"
                    ref="zip-input-cgp"
                    class="mb-3"
                    :value="cgpFormData.facilityZip"
                    @change="setCgpFacilityZip"
                    size="sm"/>
                </b-col>
              </b-row>
              <br/>
              <b-row>
                <b-col md="6">
                  <label
                    class="mb-0">Status</label>
                </b-col>
                <b-col md="6">
                  <label
                    class="mb-0">Form type</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-select
                    id="status-selection"
                    class="mb-3"
                    :value="cgpFormData.status"
                    :options="formOptions.status"
                    ref="status-Dropdown"
                    @change="setCgpStatus"
                    size="sm">
                    <template slot="first">
                      <option
                        disabled>{{ status }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
                <b-col md="6">
                  <b-form-select
                    id="form-type-selection"
                    class="mb-3"
                    :value="cgpFormData.formType"
                    :options="formOptions.formType"
                    ref="formType-Dropdown"
                    @change="setCgpFormType"
                    size="sm">
                    <template slot="first">
                      <option
                        disabled>{{ formType }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
              </b-row>
              <b-btn
                @click="cgpAdvancedSearchWrapper = !cgpAdvancedSearchWrapper"
                class="btn-outline-primary"
                variant="outline-primary"
                ref="btnAdvancedSettings-cgp">
                Advanced Lookup Criteria
              </b-btn>
              <b-collapse
                v-model="cgpAdvancedSearchWrapper"
                id="cgp-advanced-search-wrapper">
                <br/>
                <b-row>
                  <b-col md="6">
                    <label
                      class="mb-0">Facility operator name</label>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0">Federal facility?</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <b-form-input
                      id="facility-operator-input-cgp"
                      class="mb-3"
                      :value="cgpFormData.operatorName"
                      @change="setCgpOperatorName"
                      ref="facility-operator-input-cgp"
                      size="sm"/>
                  </b-col>
                  <b-col md="6">
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
                <br/>
                <b-row>
                  <b-col md="4">
                    <label
                      class="mb-0">Date</label>
                  </b-col>
                  <b-col md="4">
                    <label
                      class="mb-0">From</label>
                  </b-col>
                  <b-col md="4">
                    <label
                      class="mb-0">To</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
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
                          disabled>{{ dateSelection }}
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                  <b-col md="4">
                    <b-form-input
                      id="start-date-input-cgp"
                      class="mb-3"
                      :value="cgpFormData.submittedDateFrom"
                      ref="start-date-input-cgp"
                      @change="setCgpStartDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"/>
                  </b-col>
                  <b-col md="4">
                    <b-form-input
                      id="end-date-input-cgp"
                      ref="end-date-input-cgp"
                      class="mb-3"
                      :value="cgpFormData.submittedDateTo"
                      @change="setCgpEndDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"/>
                  </b-col>
                </b-row>
                <br/>
                <b-row>
                  <b-col md="6">
                    <label
                      class="mb-0">Construction on Tribal Lands</label>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0">Tribe</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
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
                    <b-form-select
                      id="tribe-selection"
                      ref="tribe-selection"
                      class="mb-3"
                      :value="cgpFormData.tribeSelection"
                      :options="formOptions.tribeSelections"
                      :disabled="isDisabledTribeCgp"
                      @change="setCgpTribeSelection"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>{{ tribeSelection }}
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>
                <br/>
                <b-row>
                  <b-col md="6">
                    <label
                      class="mb-0">County</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <b-form-select
                      id="county-selection-cgp"
                      ref="county-selection-cgp"
                      class="mb-3"
                      :value="cgpFormData.facilityCounty"
                      :options="formOptions.countySelections"
                      :disabled="isDisabledCountyCgp"
                      @change="setCgpFacilityCounty"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>{{ facilityCounty }}
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>
              </b-collapse>
              <b-row>
                <b-col md="6"/>
                <b-col md="3">
                  <b-btn
                    class="btn-outline-primary btn-block"
                    variant="outline-primary"
                    ref="btnResetCgp"
                    @click="clearForm">
                    Reset
                  </b-btn>
                </b-col>
                <b-col md="3">
                  <b-btn
                    class="btn-block"
                    variant="primary"
                    ref="btnSubmitCgp"
                    type="submit">
                    Lookup
                  </b-btn>
                </b-col>
              </b-row>
            </b-form>
            <br>
          </div>
          <div
            v-else-if="permitType === 'Multi-sector General Permit'"
            id="msgp-form-wrapper">
            <div>
              Enter one or more search criteria
            </div>
            <b-form
              class="needs-validation"
              @submit="msgpFormSubmit"
              novalidated>
              <b-row>
                <b-col md="6">
                  <label
                    class="mb-0">Issuer</label>
                </b-col>
                <b-col md="6">
                  <label
                    class="mb-0">Submission type</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
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
              <br/>
              <b-row>
                <b-col md="6">
                  <label
                    class="mb-0">Coverage type</label>
                </b-col>
                <b-col md="6">
                  <label
                    class="mb-0">Coverage status</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-select
                    id="coverage-type-selection"
                    class="mb-3"
                    :value="msgpFormData.coverageType"
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
              <br/>
              <b-row>
                <b-col md="6">
                  <label
                    class="mb-0">NPDES ID</label>
                </b-col>
                <b-col md="6">
                  <label
                    class="mb-0">Sector</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-input
                    id="NPDES-ID-input-msgp"
                    ref="NPDES-ID-input-msgp"
                    class="mb-3"
                    :value="msgpFormData.npdesId"
                    @change="setMsgpNpdesId"
                    size="sm"/>
                </b-col>
                <b-col md="6">
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
              <br/>
              <b-row>
                <b-col md="6">
                  <label
                    class="mb-0">Subsector</label>
                </b-col>
                <b-col md="6">
                  <label
                    class="mb-0">Primary SIC Code</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-input
                    id="subsector-input"
                    ref="subsector-input"
                    class="mb-3"
                    :value="msgpFormData.subsector"
                    :disabled="isDisabledSubsectorMsgp"
                    @change="setMsgpSubsector"
                    size="sm"
                    required/>
                </b-col>
                <b-col md="6">
                  <b-form-input
                    id="sic-code-input"
                    ref="sic-code-input"
                    class="mb-3"
                    :value="msgpFormData.sicCode"
                    :disabled="isDisabledSubsectorMsgp"
                    @change="setMsgpSicCode"
                    size="sm"/>
                </b-col>
              </b-row>
              <br/>
              <b-row>
                <b-col md="6">
                  <label
                    class="mb-0">Facility Name</label>
                </b-col>
                <b-col md="6">
                  <label
                    class="mb-0">Street Address</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-input
                    id="facility-name-input-msgp"
                    ref="facility-name-input-msgp"
                    class="mb-3"
                    :value="msgpFormData.facilityName"
                    @change="setMsgpFacilityName"
                    size="sm"/>
                </b-col>
                <b-col md="6">
                  <b-form-input
                    id="address-input"
                    ref="address-input"
                    class="mb-3"
                    :value="msgpFormData.facilityAddressLine1"
                    @change="setMsgpAddress"
                    size="sm"/>
                </b-col>
              </b-row>
              <br/>
              <b-row>
                <b-col md="6">
                  <label
                    class="mb-0">City</label>
                </b-col>
                <b-col md="3">
                  <label
                    class="mb-0">State / Territory</label>
                </b-col>
                <b-col md="3">
                  <label
                    class="mb-0">Zip</label>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-input
                    id="city-input-msgp"
                    ref="city-input-msgp"
                    class="mb-3"
                    :value="msgpFormData.facilityCity"
                    @change="setMsgpFacilityCity"
                    size="sm"/>
                </b-col>
                <b-col md="3">
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
                  <b-form-input
                    id="zip-input-msgp"
                    ref="zip-input-msgp"
                    class="mb-3"
                    :value="msgpFormData.facilityZip"
                    @change="setMsgpFacilityZip"
                    size="sm"/>
                </b-col>
              </b-row>
              <b-btn
                @click="msgpAdvancedSearchWrapper = !msgpAdvancedSearchWrapper"
                class="btn-outline-primary"
                variant="outline-primary"
                ref="btnAdvancedSettings-msgp">
                Advanced Lookup Criteria
              </b-btn>
              <b-collapse
                v-model="msgpAdvancedSearchWrapper"
                id="msgp-advanced-search-wrapper">
                <br/>
                <b-row>
                  <b-col md="6">
                    <label
                      class="mb-0">Facility operator name</label>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0">Federal operator?</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <b-form-input
                      id="facility-operator-input-msgp"
                      class="mb-3"
                      :value="msgpFormData.operatorName"
                      @change="setMsgpOperatorName"
                      ref="facility-operator-input-msgp"
                      size="sm"/>
                  </b-col>
                  <b-col md="6">
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
                <br/>
                <b-row>
                  <b-col md="6">
                    <label
                      class="mb-0">Master general permit</label>
                  </b-col>
                  <b-col md="3">
                    <label
                      class="mb-0">Submitted from</label>
                  </b-col>
                  <b-col md="3">
                    <label
                      class="mb-0">Submitted to</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <b-form-input
                      id="master-general-permit-input"
                      ref="master-general-permit-input"
                      class="mb-3"
                      :value="msgpFormData.masterPermitNumber"
                      @change="setMsgpMasterPermitNumber"
                      size="sm"/>
                  </b-col>
                  <b-col md="3">
                    <b-form-input
                      id="start-date-input-msgp"
                      class="mb-3"
                      :value="msgpFormData.submittedDateFrom"
                      ref="start-date-input-msgp"
                      @change="setMsgpStartDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"/>
                  </b-col>
                  <b-col md="3">
                    <b-form-input
                      id="end-date-input-msgp"
                      ref="end-date-input-msgp"
                      class="mb-3"
                      :value="msgpFormData.submittedDateTo"
                      @change="setMsgpEndDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"/>
                  </b-col>
                </b-row>
                <br/>
                <b-row>
                  <b-col md="6">
                    <label
                      class="mb-0">Located on Indian Country Lands</label>
                  </b-col>
                  <b-col md="6">
                    <label
                      class="mb-0">Indian Country Land</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
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
                <br/>
                <b-row>
                  <b-col md="6">
                    <label
                      class="mb-0">County</label>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="6">
                    <b-form-select
                      id="county-selection-msgp"
                      ref="county-selection-msgp"
                      class="mb-3"
                      :value="msgpFormData.facilityCounty"
                      :options="formOptions.countySelections"
                      :disabled="isDisabledCountyMsgp"
                      @change="setMsgpFacilityCounty"
                      size="sm">
                      <template slot="first">
                        <option
                          disabled>{{ facilityCounty }}
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>
              </b-collapse>
              <br>
              <b-row>
                <b-col md="6"/>
                <b-col md="3">
                  <b-btn
                    class="btn-outline-primary btn-block"
                    variant="outline-primary"
                    ref="btnResetCgp"
                    @click="clearForm">
                    Reset
                  </b-btn>
                </b-col>
                <b-col md="3">
                  <b-btn
                    class="btn-block"
                    variant="primary"
                    ref="btnSubmitCgp"
                    type="submit">
                    Lookup
                  </b-btn>
                </b-col>
              </b-row>
            </b-form>
          </div>
        </AppModal>
        <!-- Permit Results Modal-->
        <AppModal
          id="permit-results-modal"
          modal-ref="permit-results-modal"
          title="Permit Lookup Results"
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
          <b-col class="overflow-x-scroll">
            <b-table
              v-if="msgpResultsLoaded"
              hover
              id="permit-lookup-table"
              class="bootstrap-vue-permit-table-scroll d-block"
              :items="msgpFormResults"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :filtered="onFiltered"/>
          </b-col>
          <!-- pagination -->
          <b-row class="text-center">
            <b-col
              md="12"
              class="my-1">
              <b-pagination
                align="center"
                :total-rows="totalRows"
                :per-page="perPage"
                v-model="currentPage"
                class="my-0"/>
            </b-col>
          </b-row>

        </AppModal>

      </div>
      <div v-else-if="eepApp.size === 'large'">
        large
      </div>
    </div>
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
        radioSelection1: false,
        radioSelection2: false,
        radioSelection3: false,
        radioSelection4: false,
        fields: [
          {
            key: 'issuer',
            label: 'Issuer',
            sortable: false,
            sortDirection: 'desc',
          },
          {
            key: 'npdesId',
            label: 'NPDES ID',
            sortable: false,
            sortDirection: 'desc',
          },
          {
            key: 'coverageType',
            label: 'Coverage Type',
            sortable: false,
            sortDirection: 'desc',
          },
          {
            key: 'submissionType',
            label: 'Submission Type',
            sortable: false,
            sortDirection: 'desc',
          },
          {
            key: 'facilitySiteInformation.siteName',
            label: 'Facility Name',
            sortable: false,
            sortDirection: 'desc',
          },
          {
            key: 'operatorInformation.operatorName',
            label: 'Facility Operator',
            sortable: false,
            sortDirection: 'desc',
          },
          {
            key: 'facilitySiteInformation.siteAddress.stateCode',
            label: 'Facility State',
            sortable: false,
            sortDirection: 'desc',
          },
          {
            key: 'facilitySiteInformation.siteAddress.city',
            label: 'Facility City',
            sortable: false,
            sortDirection: 'desc',
          },
          {
            key: 'coverageStatus',
            label: 'Coverage Status',
            sortable: false,
            sortDirection: 'desc',
          },
          {
            key: 'certifiedDate',
            label: 'Effective Date',
            sortable: false,
            sortDirection: 'desc',
          },
        ],
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
      // get data for form options from axios call functions in actions file
      this.loadBaseFormOption();
      this.loadMsgpFormOptions();
      this.loadCgpFormOptions();
    },
    computed: {
      ...mapGetters(moduleName, {
        formOptions: 'getFormOptions',
        msgpFormResults: 'getMsgpFormResults',
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
        msgpStateSelected: 'getMsgpStateSelected',
        totalRows: 'getTotalRows',
      }),
      isDisabledCountyMsgp() {
        return !this.msgpFormData.facilityState;
      },
      isDisabledTribeMsgp() {
        return (!this.msgpFormData.facilityState || !(this.msgpFormData.tribalIndicator === true));
      },
      isDisabledSubsectorMsgp() {
        return !this.msgpFormData.sector;
      },
      isDisabledCountyCgp() {
        return !this.cgpFormData.facilityState;
      },
      isDisabledTribeCgp() {
        return (!this.cgpFormData.facilityState || !(this.cgpFormData.tribalIndicator === true));
      },
    },
    methods: {
      ...mapActions(moduleName, [
        'msgpFormGetResults',
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
      ]),
      initialFormSubmit(evt) {
        evt.preventDefault();
        this.$root.$emit('bv::show::modal', 'permit-search-modal');
      },
      cgpFormSubmit(evt) {
        evt.preventDefault();
        // get stuff
      },
      msgpFormSubmit(evt) {
        const vm = this;
        evt.preventDefault();
        this.msgpFormGetResults({ vm });
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      clearForm() {
        // clear every state when reset is pressed
        const store = this;
        store.setStatus('');
        store.setFormType('');
        store.setDateSelection('');

        store.setMsgpFacilityName('');
        store.setMsgpNpdesId('');
        store.setMsgpFacilityCity('');
        store.setMsgpFacilityState('');
        store.setMsgpFacilityZip('');
        store.setMsgpOperatorName('');
        store.setMsgpFederalIndicator('');
        store.setMsgpStartDate('');
        store.setMsgpEndDate('');
        store.setMsgpTribalIndicator('');
        store.setMsgpFacilityCounty('');
        store.setMsgpMasterPermitNumber('');
        store.setMsgpTribalName('');
        store.setMsgpIssuer('');
        store.setMsgpSubmissionType('');
        store.setMsgpCoverageType('');
        store.setMsgpCoverageStatus('');
        store.setMsgpSector('');
        store.setMsgpSubsector('');
        store.setMsgpSicCode('');
        store.setMsgpAddress('');
        store.setCgpFacilityName('');
        store.setCgpNpdesId('');
        store.setCgpFacilityCity('');
        store.setCgpFacilityState('');
        store.setCgpFacilityZip('');
        store.setCgpStatus('');
        store.setCgpFormType('');
        store.setCgpOperatorName('');
        store.setCgpFederalIndicator('');
        store.setCgpDateSelection('');
        store.setCgpStartDate('');
        store.setCgpEndDate('');
        store.setCgpTribalIndicator('');
        store.setCgpTribalName('');
        store.setCgpFacilityCounty('');
        store.radioSelection1 = false;
        store.radioSelection2 = false;
        store.radioSelection3 = false;
        store.radioSelection4 = false;
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
</style>
