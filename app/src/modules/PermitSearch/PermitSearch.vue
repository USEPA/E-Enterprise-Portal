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
          <label
            class="mb-0"
            for="permit-type-selection">Select permit type</label>
          <b-form-select
            id="permit-type-selection"
            :value="permitType"
            :options="formOptions.permitType"
            ref="permitTypeDropdown"
            @change="setPermitType"
            size="sm"
            required>
            <template slot="first">
              <option>{{ permitType }}</option>
            </template>
          </b-form-select>
          <br>
          <label
            class="mb-0"
            for="facility-name-input">Facility Name</label>
          <b-row>
            <b-col md="8">
              <b-form-input
                id="facility-name-input"
                ref="facility-name-input"
                type="string"
                size="sm"
                class="mb-2"
                @change="setFacilityName"/>
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
            <a>Advanced Search</a> &#8226; <a>What permits can I find?</a>
          </b-col>
        </b-row>

        <!-- Main Permit Search Modal-->
        <AppModal
          id="permit-search-modal"
          modal-ref="permit-search-modal"
          title="Permit Search tool"
          :hide-footer="true">
          {{ permitType }}
          <br>
          {{ facilityName }}

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
      }),
    },
    methods: {
      ...mapActions(moduleName, [
        'sampleAction',
        'setPermitType',
        'setFacilityName',
      ]),
      initialFormSubmit(evt) {
        evt.preventDefault();
        this.$root.$emit('bv::show::modal', 'permit-search-modal');
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
