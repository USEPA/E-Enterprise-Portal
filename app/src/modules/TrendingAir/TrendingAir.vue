<template ref="trendingAir">
    <div>
        <AppWrapper
        :eep-app="eepApp">
            <!-- Here is where all of the content goes for the trending air app -->
            <p id="trending-air-description">{{description}}</p>
            <p>Updated every minute via  <a v-bind:href = "providerURL" target = "_blank">{{providerName}}</a></p>
            Air Monitoring Station
            <b-form-select
                    id="location-selection"
                    :value="selectedPartner"
                    :options="airMonitoringStations"
                    ref="locationDropdown"
                    @change="changeLocation"
                    class="mb-3"
                    required>
                <template slot="first">
                    <!-- this slot appears above the options from 'options' prop -->
                    <option
                            :value="null"
                            disabled>-- Please select an partner --
                    </option>
                </template>
            </b-form-select>
        </AppWrapper>
    </div>
</template>


<script>

    import { mapActions, mapGetters } from 'vuex';
    import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
    import storeModule from './store/index';
    import { EventBus } from '../../EventBus';

    const moduleName = 'TrendingAir';

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
                    id: 'trending-air',
                    title: 'Trending Air',
                    source: {
                        text: 'US Enviromental Protection Agency',
                        link: 'https://www.epa.gov/',
                    },
                    html: {
                        mainCard: '',
                    },
                },
                description: 'This is the description. Please enter no more than 200 characters',
                providerName: 'Village Green',
                providerURL: 'http://villagegreen.airnowtech.org/',
                airMonitoringStations: ['Chicago, IL', 'Durham, NC', 'Hartford, CT', 'Kansas City, KS',
                    'Oklahoma City, OK', 'Philadelphia, PA', 'Washignton, DC']
            }
        },
        computed:{

        },
        methods:{

        }
    }
</script>


<style scoped
       lang="scss">
</style>