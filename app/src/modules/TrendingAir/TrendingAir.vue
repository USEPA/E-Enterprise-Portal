<template ref="trendingAir">
  <div>
    <AppWrapper
      :eep-app="eepApp">
      <h4>{{selectedValue}}</h4>
      <span>Updated every minute via <a v-bind:href="providerURL"
        target="_blank">{{providerName}}</a></span><br>
      <span>Air Monitoring Station</span>
      <b-form-select
        id="location-dropdown"
        ref="locationDropdown"
        :options="airMonitoringStations"
        :value="selectedValue"
        v-on:change="reflectChangeForNewLocation"
        class="mb-3">
      </b-form-select>
      <p v-if="currentWeatherReadingAfterDropdownSubmission.currentDateTime != '' &&
            currentWeatherReadingAfterDropdownSubmission.timezone != ''">
        Last Reading: {{currentWeatherReadingAfterDropdownSubmission.currentDateTime}}
        {{currentWeatherReadingAfterDropdownSubmission.timezone}}</p>
      <!-- @TODO: implement vue timer for the update of the current selected option in dropdown-->
      <b-container>
        <b-row>
          <b-col class="bg-light border text-center location-info-inner">
            <h5 class="weather-first-header">Temp</h5>
            <h3 class="weather-second-header">
              {{currentWeatherReadingAfterDropdownSubmission.curTempValue}}</h3>
            <h5 class="weather-third-header">
              <span v-if="currentWeatherReadingAfterDropdownSubmission.curTempUnit != ''">°</span>
              {{currentWeatherReadingAfterDropdownSubmission.curTempUnit}}</h5>
          </b-col>
          <b-col class="bg-light border text-center location-info-inner">
            <h5 class="weather-first-header">Humidity</h5>
            <h3 class="weather-second-header">
              {{currentWeatherReadingAfterDropdownSubmission.curHumValue}}</h3>
            <h5 class="weather-third-header">
              {{currentWeatherReadingAfterDropdownSubmission.curHumUnit}}</h5>

          </b-col>
          <b-col class="bg-light border text-center location-info-inner">
            <h5 class="weather-first-header">Wind</h5>
            <h3 class="weather-second-header">
              {{currentWeatherReadingAfterDropdownSubmission.curWSValue}}</h3>
            <h5 class="weather-third-header">
              {{currentWeatherReadingAfterDropdownSubmission.curWSUnit}}</h5>
          </b-col>
          <b-col class="bg-light border text-center location-info-inner">
            <h5 class="weather-first-header">Ozone</h5>
            <h3 class="weather-second-header">
              {{currentWeatherReadingAfterDropdownSubmission.curOzoneValue}}</h3>
            <h5 class="weather-third-header">
              {{currentWeatherReadingAfterDropdownSubmission.curOzoneUnit}}</h5>
          </b-col>
          <b-col class="bg-light border text-center">
            <h5 class="weather-first-header">PM 2.5</h5>
            <h3 class="weather-second-header">
              {{currentWeatherReadingAfterDropdownSubmission.curPmValue}}</h3>
            <h5 class="weather-third-header">
              {{currentWeatherReadingAfterDropdownSubmission.curPmUnit}}</h5>
          </b-col>
        </b-row>
      </b-container>
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
    beforeCreate() {

    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }

      // Sets the default location weather information to chicago
      this.reflectLocationChange('Chicago, IL');

      EventBus.$on('locationService::update', this.updateLocationOnInputBoxChange);
    },
    data() {
      return {
        description: 'This is the description. Please enter no more than 200 characters',
        providerName: 'Village Green',
        providerURL: 'http://villagegreen.airnowtech.org/',
      };
    },
    computed: {
      ...mapGetters({
        airMonitoringStations: 'TrendingAir/getAirMonitoringStations',
        selectedValue: 'TrendingAir/getDropDownSelection',
        newUpdatedLocation: 'TrendingAir/getNewUpdatedLocation',
        lastWeatherReading: 'TrendingAir/getlastWeatherReading',
        currentWeatherReadingAfterDropdownSubmission: 'TrendingAir/getCurrentSelectedLocationInformation',
      }),
    },
    methods: {
      ...mapActions(moduleName, [
        'reflectLocationChange',
        'updateLocationOnInputBoxChange',
      ]),
      reflectChangeForNewLocation: function (newLocation) {
        this.reflectLocationChange(newLocation);
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
  #app {
    margin-bottom: 7rem;
  }
</style>
