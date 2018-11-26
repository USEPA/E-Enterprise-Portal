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
                    :value="(newUpdatedLocation != '') ? newUpdatedLocation : locationDropdownDefaultValue"
                    v-on:change="reflectChangeForNewLocation"
                    class="mb-3">
                <option v-for="(station, index) in airMonitoringStations" v-bind:value="station">{{station}}</option>
            </b-form-select>
            <p v-if="currentWeatherReadingAfterDropdownSubmission.currentDateTime != '' &&
            currentWeatherReadingAfterDropdownSubmission.timezone != ''">
                Last Reading: {{currentWeatherReadingAfterDropdownSubmission.currentDateTime}}
                {{currentWeatherReadingAfterDropdownSubmission.timezone}}</p>
            <!-- @TODO: implement timer for the update of the current selected option in dropdown-->
            <p>Update in 28 seconds</p>
            <b-container>
                <b-row>
                    <b-col class="location-info location-info-inner">
                        <p class="weather-first-header">Temp</p>
                        <p class="weather-second-header">{{currentWeatherReadingAfterDropdownSubmission.curTempValue}}</p>
                        <p class="weather-third-header"><span v-if="currentWeatherReadingAfterDropdownSubmission.curTempUnit != ''">°</span>
                            {{currentWeatherReadingAfterDropdownSubmission.curTempUnit}}</p>
                    </b-col>
                    <b-col class="location-info location-info-inner">
                        <p class="weather-first-header">Humidity</p>
                        <p class="weather-second-header">{{currentWeatherReadingAfterDropdownSubmission.curHumValue}}</p>
                        <p class="weather-third-header">{{currentWeatherReadingAfterDropdownSubmission.curHumUnit}}</p>

                    </b-col>
                    <b-col class="location-info location-info-inner">
                        <p class="weather-first-header">Wind</p>
                        <p class="weather-second-header">{{currentWeatherReadingAfterDropdownSubmission.curWSValue}}</p>
                        <p class="weather-third-header">{{currentWeatherReadingAfterDropdownSubmission.curWSUnit}}</p>
                    </b-col>
                    <b-col class="location-info location-info-inner">
                        <p class="weather-first-header">Ozone</p>
                        <p class="weather-second-header">{{currentWeatherReadingAfterDropdownSubmission.curOzoneValue}}</p>
                        <p class="weather-third-header">{{currentWeatherReadingAfterDropdownSubmission.curOzoneUnit}}</p>
                    </b-col>
                    <b-col class="location-info">
                        <p class="weather-first-header">PM 2.5</p>
                        <p class="weather-second-header">{{currentWeatherReadingAfterDropdownSubmission.curPmValue}}</p>
                        <p class="weather-third-header">{{currentWeatherReadingAfterDropdownSubmission.curPmUnit}}</p>
                    </b-col>
                </b-row>
            </b-container>

        </AppWrapper>
        <p id="link-wrapper">
            <a v-bind:href="'https://villagegreen.airnowtech.org/welcome/welcome?siteID=' + currentWeatherReadingAfterDropdownSubmission.siteid">
                View more data for {{selectedLocation}}
            </a>
        </p>
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
            store.dispatch('reflectLocationChange', 'Chicago, IL');
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
                newUpdatedLocation: 'TrendingAir/getNewUpdatedLocation',
                lastWeatherReading: 'TrendingAir/getlastWeatherReading',
                currentWeatherReadingAfterDropdownSubmission: 'TrendingAir/getCurrentSelectedLocationInformation',
            }),
        },
        methods:{
            ...mapActions(moduleName, [
                'reflectLocationChange',
                'updateLocationOnInputBoxChange'
            ]),
            reflectChangeForNewLocation: function (newLocation) {
                this.reflectLocationChange(newLocation);
            },
            getLocationDropdownValue(){
                return this.$refs.locationDropdown.value;
            },
        }
    }
</script>


<style scoped
       lang="scss">
    .location-info{
        background-color: #DCD9D9;
        border: solid 1px;
        text-align: center;
    }
    .weather-first-header, .weather-third-header{
        font-size: 1.5em;
    }
    .weather-second-header{
        font-size: 2.5em;
    }
    #link-wrapper{
        padding-top: 5px;
    }
</style>