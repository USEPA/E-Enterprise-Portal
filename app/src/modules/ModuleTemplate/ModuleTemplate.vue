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
    import { EventBus } from '../../EventBus';

    const moduleName = 'ModuleTemplate';

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
                eepApp: {
                    id: 'module-template',
                    title: 'Module Template',
                    source: {
                        text: '',
                        link: '',
                    },
                    html: {
                        mainCard: '',
                    },
                },
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
    };
</script>

<style scoped
       lang="scss">
</style>
