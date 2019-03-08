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
                    disabled>{{ permitType }}</option>
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
                        disabled>{{ stateTerritory }}</option>
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
              <b-col md="4">
                <b-btn
                  size="sm"
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

  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal } from '../wadk/WADK';
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
      ...mapGetters(moduleName, {
        formOptions: 'getFormOptions',
        permitType: 'getPermitType',
        facilityName: 'getFacilityName',
        NPDESID: 'getNPDESID',
        cityName: 'getCityName',
        stateTerritory: 'getStateTerritory',
        zip: 'getZip',
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
