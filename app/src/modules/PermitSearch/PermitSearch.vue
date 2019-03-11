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
                Search
              </b-btn>
            </b-col>
          </b-row>
        </b-form>
        <b-row>
          <b-col class="permit-search-footer">
            <a>What permits can I find?</a>
          </b-col>
        </b-row>

        <!-- Main Permit Search Modal-->
        <AppModal
          id="permit-search-modal"
          modal-ref="permit-search-modal"
          title="Permit Search tool"
          :hide-footer="true">
          <div
            v-if="permitType === 'Construction General Permit'"
            id="cgp-form-wrapper">

            xD
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
                    id="facility-name-input"
                    ref="facility-name-input"
                    class="mb-3"
                    :value="facilityName"
                    @change="setFacilityName"
                    size="sm"
                    required>
                  </b-form-input>
                </b-col>
                <b-col md="6">
                  <b-form-input
                    id="NPDES-ID-input"
                    ref="NPDES-ID-input"
                    class="mb-3"
                    :value="NPDESID"
                    @change="setNPDESID"
                    size="sm"
                    required>
                  </b-form-input>
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
                    id="city-input"
                    ref="city-input"
                    class="mb-3"
                    :value="cityName"
                    @change="setCityName"
                    size="sm"
                    required>
                  </b-form-input>
                </b-col>
                <b-col md="3">
                  <b-form-select
                    id="state-territory-selection"
                    class="mb-3"
                    :value="stateTerritory"
                    :options="formOptions.stateTerritory"
                    ref="stateTerritory-Dropdown"
                    @change="setStateTerritory"
                    size="sm"
                    required>
                    <template slot="first">
                      <option
                        disabled>{{ stateTerritory }}
                      </option>
                    </template>
                  </b-form-select>
                </b-col>
                <b-col md="3">
                  <b-form-input
                    id="zip-input"
                    ref="zip-input"
                    class="mb-3"
                    :value="zip"
                    @change="setZip"
                    size="sm"
                    required>
                  </b-form-input>
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
                Advanced after here
              </div>
              <div
                id="cgp-advanced-search-wrapper">
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
                      id="facility-operator-input"
                      class="mb-3"
                      :value="facilityOperator"
                      @change="setFacilityOperator"
                      ref="facility-operator-input"
                      size="sm"
                      required>
                    </b-form-input>
                  </b-col>
                  <b-col md="6">
                    <b-form-radio-group
                      id="federal-facility-selection"
                      :options="formOptions.federalFacilitySelections"
                      @change="setFederalFacility"
                      name="radioInline"
                      class="mb-3"
                      ref="federal-facility-selection">
                    </b-form-radio-group>
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
                      id="start-date-input"
                      class="mb-3"
                      :value="startDate"
                      ref="start-date-input"
                      @change="setStartDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"
                      required>
                    </b-form-input>
                  </b-col>
                  <b-col md="4">
                    <b-form-input
                      id="end-date-input"
                      ref="end-date-input"
                      class="mb-3"
                      :value="endDate"
                      @change="setEndDate"
                      size="sm"
                      placeholder="MM/DD/YYYY"
                      required>
                    </b-form-input>
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
                      id="tribal-lands-construction"
                      :options="formOptions.tribalLandsConstruction"
                      @change="setTribalLandsConstruction"
                      name="radioInline"
                      class="mb-3"
                      ref="tribal-lands-construction">
                    </b-form-radio-group>
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
                      id="county-selection"
                      ref="county-selection"
                      class="mb-3"
                      :value="countySelection"
                      :options="formOptions.countySelections"
                      @change="setCountySelection"
                      size="sm"
                      required>
                      <template slot="first">
                        <option
                          disabled>{{ countySelection }}
                        </option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-row>

              </div>
              <b-col md="4">
                <b-btn
                  variant="primary"
                  ref="btnCheckYourWater"
                  type="submit">
                  Search
                </b-btn>
              </b-col>
            </b-form>

            <br>
            {{ facilityName }}
            {{ NPDESID }}
            {{ cityName }}
            {{ stateTerritory }}
            {{ zip }}
            {{ status }}
            {{ formType }}
            {{ facilityOperator }}
            {{ federalFacility }}
            {{ dateSelection}}
            {{ startDate }}
            {{ endDate }}
            {{ tribalLandsConstruction }}
            {{ tribeSelection }}
            {{ countySelection }}
          </div>

          <div
            v-else-if="permitType === 'Multi-sector General Permit'"
            id="msgp-form-wrapper">
            Cx
            <br>
            {{ facilityName }}
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

  import {mapActions, mapGetters} from 'vuex';
  import {AppWrapper, AppModal} from '../wadk/WADK';
  import storeModule from './store/index';

  const moduleName = 'PermitSearch';

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
      console.log(this.eepApp.size);
    },
    computed: {
      cgpAdvancedSearch: false,
      msgpAdvancedSearch: false,
      ...mapGetters(moduleName, {
        formOptions: 'getFormOptions',
        permitType: 'getPermitType',
        facilityName: 'getFacilityName',
        NPDESID: 'getNPDESID',
        cityName: 'getCityName',
        stateTerritory: 'getStateTerritory',
        zip: 'getZip',
        status: 'getStatus',
        formType: 'getFormType',
        facilityOperator: 'getFacilityOperator',
        federalFacility: 'getFederalFacility',
        dateSelection: 'getDateSelection',
        startDate: 'getStartDate',
        endDate: 'getEndDate',
        tribalLandsConstruction: 'getTribalLandsConstruction',
        tribeSelection: 'getTribeSelection',
        countySelection: 'getCountySelection',
      }),
    },
    methods: {
      ...mapActions(moduleName, [
        'sampleAction',
        'setPermitType',
        'setFacilityName',
        'setNPDESID',
        'setCityName',
        'setStateTerritory',
        'setZip',
        'setStatus',
        'setFormType',
        'setFacilityOperator',
        'setFederalFacility',
        'setDateSelection',
        'setStartDate',
        'setEndDate',
        'setTribalLandsConstruction',
        'setTribeSelection',
        'setCountySelection'
      ]),
      initialFormSubmit(evt) {
        evt.preventDefault();
        this.$root.$emit('bv::show::modal', 'permit-search-modal');
      },
      cgpFormSubmit(evt) {
        evt.preventDefault();
        //get stuff
        console.log("cgp submit yay!")
      },
      msgpFormSubmit(evt) {
        evt.preventDefault();
        //get stuff
        console.log("msgp submit yay!")
      },
      toggleCgpAdvancedSearch(evt) {
        cgpAdvancedSearch = !cgpAdvancedSearch;
        console.log("cgp toggle yay!")
      },
      toggleMsgpAdvancedSearch(evt) {
        msgpAdvancedSearch = !msgpAdvancedSearch;
        console.log("msgp toggle yay!")
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
