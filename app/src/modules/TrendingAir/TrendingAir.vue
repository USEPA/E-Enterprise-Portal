<template ref="trendingAir">
    <div>
        <AppWrapper
        :eep-app="eepApp">
            <!-- Here is where all of the content goes for the trending air app -->
        </AppWrapper>
    </div>
</template>


<script>

    import { mapActions, mapGetters } from 'vuex';
    import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
    import storeModule from './store/index';
    import { EventBus } from '../../EventBus';

    const name = 'TrendingAir';

    export default {
        name: name,
        components: {
            AppWrapper,
        },
        beforeCreate(){

        },
        created(){

        },
        data(){
            return{
                eepApp: {
                    id: 'trending-air',
                    title: 'Trending Air',
                    source: {
                        text: '',
                        link: '',
                    },
                    html: {
                        mainCard: '',
                    },
                },
            }
        },
        computed{

        },
        methods:{

        }

    }
</script>


<style scoped
       lang="scss">
</style>