<template ref="favoriteLinks">
    <div>
        <AppWrapper
        :eep-app="eepApp">
            <h4>{{ username }} Favorite Links</h4>
          <div v-html="eepApp.html.mainCard"></div>
        </AppWrapper>
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';
    import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
    import storeModule from './store/index';
    import { EventBus } from '../../EventBus';

    const moduleName = 'FavoriteLinks';

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
                    id: 'favorite-links',
                    title: 'Favorite Links',
                    source: {
                        text: 'US Environmental Protection Agency',
                        link: 'https://www.epa.gov',
                    },
                    html: {
                        mainCard:
                          ' <p>Here you can view your favorite links</p>'

                    },
                },
            }
        },
        mounted(){

        },
        computed:{
            ...mapGetters({
              authenticated: 'getUserAuthentication',
              bridgeURL: 'getBridgeURL',
              username: 'getUserFullName',

            }),
        },
        methods: {
            ...mapActions(moduleName, [
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