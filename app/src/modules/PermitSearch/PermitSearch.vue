<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
  <div>
    <AppWrapper
      :eep-app="eepApp">
      <!-- Here is where all of the content goes for the ModuleTemplate app -->
    </AppWrapper>
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
            ...mapGetters({
                localSampleGetterName: `${moduleName}/sampleGetter`,
                localSampleGetterWithParamGetterName: `${moduleName}/sampleGetterWithParam`,
            }),
        },
        methods: {
            ...mapActions(moduleName, [
                'sampleAction',
            ]),
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
