<template>
    <div>
        <AppWrapper class="pb-5"
        :eep-app="eepApp">
            <div
              v-html="eepApp.html.mainCard" class="pb-2">
            </div>
            <div v-for="item in program">{{ item.title }}<hr/></div>


        </AppWrapper>
    </div>

</template>

<script>
  import AppAxios from 'axios';
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
                          '<h4>Program Service Name</h4>'

                  ,
                    },
                },
              program: [
                { id: '', },
                { title: '', },
              ]
            }
        },
      mounted () {
        AppAxios
          .get('/sample_data/cdxprogramtitles.json')
          .then(response => (this.program = response.data))

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