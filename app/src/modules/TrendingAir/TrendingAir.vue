<template ref="trendingAir">
    <div>
        <AppWrapper
        :eep-app="eepApp">
            <!-- Here is where all of the content goes for the trending air app -->
            <p id="trending-air-description">{{description}}</p>
            <p>Updated every minute via  <a v-bind:href = "providerURL" target = "_blank">{{providerName}}</a></p>
            Air Monitoring Station
            <b-form-select
                    id="location-dropdown"
                    ref="locationDropdown"
                    :value="locationDropdownDefaultValue"
                    v-on:change="reflectChangeForNewLocation"
                    class="mb-3">
                <option v-for="(station, index) in airMonitoringStations" v-bind:value="station">{{station}}</option>
            </b-form-select>
            <p>Last Reading: {{lastWeatherReading}}</p>
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
        created(){
            const store = this.$store;
            if (!(store && store.state && store.state[moduleName])) {
                store.registerModule(moduleName, storeModule);
            }
            EventBus.$on('locationService::update', this.updateLocationOnInputBoxChange);
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
            }
        },
        computed:{
            ...mapGetters({
                airMonitoringStations: 'TrendingAir/getAirMonitoringStations',
                locationDropdownDefaultValue: 'TrendingAir/getDefaultDropDownSelection',
                lastWeatherReading: 'TrendingAir/getlastWeatherReading',
            }),
        },
        methods:{
            ...mapActions(moduleName, [
                'reflectLocationChange',
            ]),
            reflectChangeForNewLocation: function (newLocation) {
                this.reflectLocationChange(newLocation);
            }
        }
    }
</script>


<style scoped
       lang="scss">
</style>