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
        <b-row>
          <b-col class="permit-search-footer">
            <a>What permits can I find?</a>
          </b-col>
        </b-row>

        <!-- Main Permit Lookup Modal-->
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
                    :value="facilityName"
                    @change="setFacilityName"
                    size="sm"
                    required/>
                </b-col>
                <b-col md="6">
                  <b-form-input
                    id="NPDES-ID-cgp"
                    ref="NPDES-ID-input-cgp"
                    class="mb-3"
                    :value="NPDESID"
                    @change="setNPDESID"
                    size="sm"
                    required/>
                </b-col>
              </b-row>
              <br>
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
                    :value="facilityCity"
                    @change="setFacilityCity"
                    size="sm"
                    required/>
                </b-col>
                <b-col md="3">
                  <b-form-select
                    id="state-territory-selection-cgp"
                    class="mb-3"
                    :value="facilityState"
                    :options="formOptions.baseFormOptions.stateNames"
                    ref="stateOptions-Dropdown-cgp"
                    @change="setFacilityState"
                    size="sm"
                    required>
                    <template slot="first">
                      <option
                        disabled>{{ facilityState }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
                <b-col md="3">
                  <b-form-input
                    id="zip-input-cgp"
                    ref="zip-input-cgp"
                    class="mb-3"
                    :value="facilityZip"
                    @change="setFacilityZip"
                    size="sm"
                    required/>
                </b-col>
              </b-row>
              <br>
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
                    :value="status"
                    :options="formOptions.status"
                    ref="status-Dropdown"
                    @change="setStatus"
                    size="sm"
                    required>
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
                    :value="formType"
                    :options="formOptions.formType"
                    ref="formType-Dropdown"
                    @change="setFormType"
                    size="sm"
                    required>
                    <template slot="first">
                      <option
                        disabled>{{ formType }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
              </b-row>
              <div>
                <b-btn
                  v-b-toggle="'cgp-advanced-search-wrapper'"
                  class="btn-outline-primary"
                  variant="outline-primary"
                  ref="btnAdvancedSettings-cgp">
                  Advanced Lookup Criteria
                </b-btn>
              </div>
              <b-collapse
                id="cgp-advanced-search-wrapper">
                <br>
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
                      :value="operatorName"
                      @change="setOperatorName"
                      ref="facility-operator-input-cgp"
                      size="sm"
                      required/>
                  </b-col>
                  <b-col md="6">
                    <b-form-radio-group
                      id="federal-facility-selection-cgp"
                      :options="formOptions.federalIndicator"
                      @change="setFederalIndicator"
                      name="radioInline"
                      class="mb-3"
                      ref="federal-facility-selection-cgp"/>
                  </b-col>
                </b-row>
                <br>
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
                      :value="dateSelection"
                      :options="formOptions.dateSelections"
                      @change="setDateSelection"
                      size="sm"
                      required>
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
                      :value="submittedDateFrom"
                      ref="start-date-input-cgp"
                      @change="setStartDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"
                      required/>
                  </b-col>
                  <b-col md="4">
                    <b-form-input
                      id="end-date-input-cgp"
                      ref="end-date-input-cgp"
                      class="mb-3"
                      :value="submittedDateTo"
                      @change="setEndDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"
                      required/>
                  </b-col>
                </b-row>
                <br>
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
                      id="tribal-lands-construction-cgp"
                      :options="formOptions.tribalIndicator"
                      @change="setTribalIndicator"
                      name="radioInline"
                      class="mb-3"
                      ref="tribal-lands-construction-cgp"/>
                  </b-col>
                  <b-col md="6">
                    <b-form-select
                      id="tribe-selection"
                      ref="tribe-selection"
                      class="mb-3"
                      :value="tribeSelection"
                      :options="formOptions.tribeSelections"
                      @change="setTribeSelection"
                      size="sm"
                      required>
                      <template slot="first">
                        <option
                          disabled>{{ tribeSelection }}
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>
                <br>
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
                      :value="facilityCounty"
                      :options="formOptions.countySelections"
                      @change="setFacilityCounty"
                      size="sm"
                      required>
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
                    :value="issuer"
                    :options="formOptions.issuerSelections"
                    ref="issuer-Dropdown"
                    @change="setIssuer"
                    size="sm"
                    required>
                    <template slot="first">
                      <option
                        disabled>{{ issuer }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
                <b-col md="6">
                  <b-form-input
                    id="submission-type-input"
                    class="mb-3"
                    :value="submissionType"
                    ref="submission-type-input"
                    @change="setSubmissionType"
                    size="sm"
                    required/>
                </b-col>
              </b-row>
              <br>
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
                    id="application-type-selection"
                    class="mb-3"
                    :value="applicationType"
                    :options="formOptions.coverageTypeSelections"
                    ref="application-type-selection"
                    @change="setApplicationType"
                    size="sm"
                    required>
                    <template slot="first">
                      <option
                        disabled>{{ applicationType }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
                <b-col md="6">
                  <b-form-select
                    id="form-status-selection"
                    class="mb-3"
                    :value="formStatus"
                    :options="formOptions.formStatusSelections"
                    ref="form-type-selection"
                    @change="setFormStatus"
                    size="sm"
                    required>
                    <template slot="first">
                      <option
                        disabled>{{ formStatus }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
              </b-row>
              <br>
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
                    :value="NPDESID"
                    @change="setNPDESID"
                    size="sm"
                    required/>
                </b-col>
                <b-col md="6">
                  <b-form-select
                    id="sector-selection"
                    class="mb-3"
                    :value="sector"
                    :options="formOptions.sectorSelections"
                    ref="sector-Dropdown"
                    @change="setSector"
                    size="sm"
                    required>
                    <template slot="first">
                      <option
                        disabled>{{ sector }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
              </b-row>
              <br>
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
                    :value="subsector"
                    @change="setSubsector"
                    size="sm"
                    required/>
                </b-col>
                <b-col md="6">
                  <b-form-input
                    id="sic-code-input"
                    ref="sic-code-input"
                    class="mb-3"
                    :value="sicCode"
                    @change="setSicCode"
                    size="sm"
                    required/>
                </b-col>
              </b-row>
              <br>
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
                    :value="facilityName"
                    @change="setFacilityName"
                    size="sm"
                    required/>
                </b-col>
                <b-col md="6">
                  <b-form-input
                    id="address-input"
                    ref="address-input"
                    class="mb-3"
                    :value="facilityAddressLine1"
                    @change="setAddress"
                    size="sm"
                    required/>
                </b-col>
              </b-row>
              <br>
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
                    :value="facilityCity"
                    @change="setFacilityCity"
                    size="sm"
                    required/>
                </b-col>
                <b-col md="3">
                  <b-form-select
                    id="state-territory-selection-msgp"
                    class="mb-3"
                    :value="facilityState"
                    :options="formOptions.baseFormOptions.stateNames"
                    ref="stateOptions-Dropdown-msgp"
                    @change="setFacilityState"
                    size="sm"
                    required>
                    <template slot="first">
                      <option
                        disabled>{{ facilityState }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
                <b-col md="3">
                  <b-form-input
                    id="zip-input-msgp"
                    ref="zip-input-msgp"
                    class="mb-3"
                    :value="facilityZip"
                    @change="setFacilityZip"
                    size="sm"
                    required/>
                </b-col>
              </b-row>
              <div>
                <b-btn
                  v-b-toggle="'msgp-advanced-search-wrapper'"
                  class="btn-outline-primary"
                  variant="outline-primary"
                  ref="btnAdvancedSettings-msgp">
                  Advanced Lookup Criteria
                </b-btn>
              </div>
              <b-collapse
                id="msgp-advanced-search-wrapper">
                <br>
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
                      :value="operatorName"
                      @change="setOperatorName"
                      ref="facility-operator-input-msgp"
                      size="sm"
                      required/>
                  </b-col>
                  <b-col md="6">
                    <b-form-radio-group
                      id="federal-facility-selection-msgp"
                      :options="formOptions.federalIndicator"
                      @change="setFederalIndicator"
                      name="radioInline"
                      class="mb-3"
                      ref="federal-facility-selection-msgp"/>
                  </b-col>
                </b-row>
                <br>
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
                      :value="masterPermitNumber"
                      @change="setMasterPermitNumber"
                      size="sm"
                      required/>
                  </b-col>
                  <b-col md="3">
                    <b-form-input
                      id="start-date-input-msgp"
                      class="mb-3"
                      :value="submittedDateFrom"
                      ref="start-date-input-msgp"
                      @change="setStartDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"
                      required/>
                  </b-col>
                  <b-col md="3">
                    <b-form-input
                      id="end-date-input-msgp"
                      ref="end-date-input-msgp"
                      class="mb-3"
                      :value="submittedDateTo"
                      @change="setEndDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"
                      required/>
                  </b-col>
                </b-row>
                <br>
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
                      id="tribal-lands-construction"
                      :options="formOptions.tribalIndicator"
                      @change="setTribalIndicator"
                      name="radioInline"
                      class="mb-3"
                      ref="tribal-lands-construction"/>
                  </b-col>
                  <b-col md="6">
                    <b-form-select
                      id="indian-country-selection"
                      ref="indian-country-selection"
                      class="mb-3"
                      :value="tribalName"
                      :options="formOptions.tribalNameSelections"
                      @change="setTribalName"
                      size="sm"
                      required>
                      <template slot="first">
                        <option
                          disabled>{{ tribalName }}
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>
                <br>
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
                      :value="facilityCounty"
                      :options="formOptions.countySelections"
                      @change="setFacilityCounty"
                      size="sm"
                      required>
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
      return {};
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
        permitType: 'getPermitType',
        facilityName: 'getFacilityName',
        NPDESID: 'getNPDESID',
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
        applicationType: 'getApplicationType',
        formStatus: 'getFormStatus',
        sector: 'getSector',
        subsector: 'getSubsector',
        sicCode: 'getSicCode',
        facilityAddressLine1: 'getAddress',
      }),
    },
    methods: {
      ...mapActions(moduleName, [
        'sampleAction',
        'setPermitType',
        'setFacilityName',
        'setNPDESID',
        'setFacilityCity',
        'setFacilityState',
        'setFacilityZip',
        'setStatus',
        'setFormType',
        'setOperatorName',
        'setFederalIndicator',
        'setDateSelection',
        'setStartDate',
        'setEndDate',
        'setTribalIndicator',
        'setTribeSelection',
        'setFacilityCounty',
        'setMasterPermitNumber',
        'setTribalName',
        'setIssuer',
        'setSubmissionType',
        'setApplicationType', // #####
        'setFormStatus',
        'setSector',
        'setSubsector',
        'setSicCode',
        'setAddress',
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
        console.log('cgp submit yay!');
      },
      msgpFormSubmit(evt) {
        evt.preventDefault();
        // get stuff
        console.log('msgp submit yay!');
      },
      clearForm() {
        // clear every state when reset is pressed
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
