<!-- Go through this folder and rename all of the occurances to be specific to the app that you are building -->
<template>
    <div>
        <AppWrapper
        :eep-app="eepApp">
            <div
              v-html="eepApp.html.mainCard">
            </div>
        </AppWrapper>
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';
    import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
    import storeModule from './store/index';
    import { EventBus } from '../../EventBus';

    const moduleName = 'MyReporting';

    export default {
        name: moduleName,
        components: {
            AppWrapper,
        },
        beforeCreate(){

        },
        created(){
            const store = this.$store;
            if (!(store && store.state && store.state[moduleName])) {
                store.registerModule(moduleName, storeModule);
            }
        },
        data(){
            return{
                eepApp: {
                    id: 'my-reporting',
                    title: 'My Reporting',
                    source: {
                        text: 'US Environmental Protection Agency',
                        link: 'https://www.epa.gov/',
                    },
                    html: {
                        mainCard:
                          '<p>Description Goes here</p>'

                  ,
                    },
                },
            }
        },
        mounted(){

        },
        computed:{
            ...mapGetters({
                // map getters go here
            }),
        },
        methods: {
            ...mapActions(moduleName, [
                // map actions go here
            ]),
        }
    }
</script>

<style scoped
  lang="scss">
    #app{
        margin-bottom: 7rem;
    }
</style>