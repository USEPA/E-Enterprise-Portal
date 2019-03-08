<template>
  <div>
    <AppWrapper
      :eep-app="eepApp"/>
    <!-- base form -->
    <b-form
      class="needs-validation"
      @submit="initialFormSubmit"
      novalidated>
      <label for="permit-type-selection">Select permit type</label>
      <b-form-select
        id="permit-type-selection"
        :value="permitType"
        :options="formOptions.permitType"
        ref="permitTypeDropdown"
        @change="setPermitType"
        class="mb-3"
        size="sm"
        required>
        <template slot="first">
          <option>{{ permitType }}</option>
        </template>
      </b-form-select>
      <br>
      <label for="facility-name-input">Facility Name</label>
      <b-form-input
        id="facility-name-input"
        ref="facility-name-input"
        type="string"
        size="sm"
        @change="setFacilityName"/>
      <b-btn
        variant="primary"
        ref="btnCheckYourWater"
        type="submit">
        Search
      </b-btn>

    </b-form>

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
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
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
