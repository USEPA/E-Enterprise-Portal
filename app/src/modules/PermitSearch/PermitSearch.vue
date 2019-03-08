<template>
  <div>
    <AppWrapper
      :eep-app="eepApp"/>
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
        required>
        <template slot="first">
          <option>{{ permitType }}</option>
        </template>
      </b-form-select>
      {{ permitType }}
      <br>
      <b-btn
        variant="primary"
        ref="btnCheckYourWater"
        type="submit">
        Search
      </b-btn>
    </b-form>
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

            };
        },
        mounted() {

        },
        computed: {
            ...mapGetters(moduleName, {
                formOptions: 'getFormOptions',
                permitType: 'getPermitType',
            }),
        },
        methods: {
            ...mapActions(moduleName, [
                'sampleAction',
                'setPermitType',
            ]),
          initialFormSubmit() {
              return null;
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
