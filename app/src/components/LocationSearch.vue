<template>
  <div
    id='location-wrapper'
    class='col-md-7 mt-1'>
    <div class="row justify-content-end">
      <div class="col-sm-12">
        <div
          id="location-description"
          class="text-right mt-2 cursor-pointer"
          @click="toggleLocationSearchBar"
          v-if="hasLocation && !isLocationSearchBarEnabled">
          {{ finalized_city }}, {{ finalized_state }} - {{ finalized_zipcode }}
        </div>
      </div>
      <div
        class="col-sm-12"
        v-if="isLocationSearchBarEnabled">
        <b-input-group id="location-input">
          <label for="locationInput"
            class="sr-only">
            Enter Your Location as City, State, or Zip Code
          </label>
          <b-form-input v-if="userfavoritelocations.length > 0"
              id="locationInput"
              type="text"
              v-model="locationInputText"
              @keyup.enter.native="submitLocation"
              :placeholder="userfavoritelocations[0].first +'  (' +userfavoritelocations[0].second +')'"/>
          <b-form-input v-else
              id="locationInput"
              type="text"
              v-model="locationInputText"
              @keyup.enter.native="submitLocation"
              placeholder="Enter city, state; or ZIP code"/>
          <b-input-group-append>
            <label for="submit-geolocation"
              class="sr-only">
              Click to use Your current location
            </label>
            <b-button
              id="submit-geolocation"
              type="submit"
              :disabled="!checkForGeolocation()"
              :title="geolocationTitle"
              @click="createGeolocationRequest"
              variant="success">
              <div class="button-image">
                <i class="fas fa-globe"></i>
              </div>
            </b-button>
            <label for="submit-location"
              class="sr-only">
              Click to submit Your location
            </label>
            <b-button
              id="submit-location"
              type="submit"
              @click="submitLocation">
              <div class="button-image">
                <i class="fas fa-arrow-right"></i>
              </div>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>
    <AppModal
      id="location-search-modal-interactive"
      modal-ref="location-search-modal-interactive"
      title="Additional Information Needed For Location">
      <div id="zipcode-dropdown-wrapper">
        <!-- zipcode drop down -->
        <b-form-select
          id="location-zipcodes"
          v-if="zipcodes.length > 1"
          :options="zipcodes"
          v-model="finalized_zipcode">
          <template slot="first">
            <!-- this slot appears above the options from 'options' prop -->
            <option
              value=""
              disabled
              selected
              hidden>-- Please select a zipcode --
            </option>
          </template>
        </b-form-select>
      </div>
      <div id="city-dropdown-wrapper">
        <!-- city drop down -->
        <b-form-select
          id="location-cities"
          v-if="cities.length > 1"
          :options="cities"
          v-model="finalized_city">
          <template slot="first">
            <!-- this slot appears above the options from 'options' prop -->
            <option value=""
              disabled
              selected
              hidden>-- Please select a city --
            </option>
          </template>
        </b-form-select>
      </div>

      <div id="state-dropdown-wrapper">
        <!-- city drop down -->
        <b-form-select
          id="location-states"
          v-if="states.length > 1"
          :options="states"
          v-model="finalized_state">
          <template slot="first">
            <!-- this slot appears above the options from 'options' prop -->
            <option value=""
              disabled
              selected
              hidden>-- Please select a state --
            </option>
          </template>
        </b-form-select>
      </div>


      <!-- NBSP is used to prevent the default modal buttons from rendering -->
      <template
        slot="footer">&nbsp;
        <b-button
          variant="primary"
          @click="submitLocationModal">Submit Location
        </b-button>
      </template>
    </AppModal>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { AppModal } from '../modules/wadk/WADK';
  import { EventBus } from '../EventBus';

  // const name = 'LocationSearch';

  export default {
    components: {
      AppModal,
    },
    data() {
      return {
        locationInputText: '',
        zipcodes: [],
        cities: [],
        states: [],
        finalized_state: '',
        finalized_city: '',
        finalized_zipcode: '',
      };
    },
    created() {
      // Custom event listeners
      EventBus.$on('locationSearch::showUserConfirmationModal', this.showUserConfirmationModal);
    },
    computed: {
      ...mapGetters({
        // map getters go here
        user: 'getUser',
      }),
      userfavoritelocations: {
        get() {
          return this.user.userfavoritelocations;
        }
      },
      geolocationTitle() {
        return (!this.checkForGeolocation()) ? 'Enable Geolocation' : 'Click to use your geolocation';
      },
      /**
       * Determines if the location has been set yet, and will update the UI
       *
       * @returns {boolean}
       */
      hasLocation() {
        const vm = this;
        const store = vm.$store;
        const { state, location = state.user.location } = store;
        let hasLocation = false;
        if (location && location.state && location.city && location.zipcode) {
          vm.finalized_city = location.city;
          vm.finalized_state = location.state;
          vm.finalized_zipcode = location.zipcode;
          hasLocation = true;
          store.commit('TOGGLE_HAS_LOCATION_SEARCH_BAR', false);
        }
        return hasLocation;
      },
      /**
       * Determins if we should show the location search bar. If the user has not selected an
       * location, they can use the location search bar to find one. Once the location is set we can
       * hide the bar until the user has clicked on the location to change it, thus swapping out the
       * location to show the search bar again.
       *
       * @returns {boolean}
       */
      isLocationSearchBarEnabled() {
        return (!this.hasLocation || this.$store.state.ui.hasLocationSearch);
      },
      /**
       * Checks whether the browser supports geolocation lool up
       *
       * @returns {boolean}
       */
      hasGeolocation() {
        return !!navigator.geolocation;
      },
    },
    methods: {
      ...mapActions([
        'createLocationRequest',
        'createGeolocationRequest',
        'toggleLocationSearchBar',
      ]),
      checkForGeolocation() {
        return !!navigator.geolocation;
      },
      /**
       * Submits the location search bar text to the API for lookup.
       */
      submitLocation() {
        this.$store.dispatch('createLocationRequest', this.locationInputText);
      },
      /**
       * This is th modal setup for when more than one location property needs more user input to
       * determine the correct address returned from the API.
       *
       * @param payload
       */
      showUserConfirmationModal(payload) {
        // set the variable values to the values in the payload to be binded to the dropdowns
        this.zipcodes = payload.value.zipcode;
        this.cities = payload.value.city;
        this.states = payload.value.state;

        // declare the modal instance
        const vm = this;
        const lsModal = vm.$refs.location_search_modal_interactive;

        // call modal to pop up if the values that are returned in the payload are > 1
        if ((vm.zipcodes.length > 1 || vm.cities.length > 1 || vm.states.length > 1)) {
          vm.$root.$emit(
            'bv::show::modal', 'location-search-modal-interactive', lsModal,
          );
        } else {
          [vm.finalized_state] = vm.states;
          [vm.finalized_city] = vm.cities;
          [vm.finalized_zipcode] = vm.zipcodes;
          vm.$store.commit('SET_USER_LOCATION', {
            zipcode: vm.finalized_zipcode,
            city: vm.finalized_city,
            state: vm.finalized_state,
          });
        }
      },
      /**
       * Submission logic for the modal popup for the additional user input for the location search.
       */
      submitLocationModal() {
        // declare the modal instance
        const vm = this;
        const lsModal = vm.$refs.location_search_modal_interactive;
        if (this.states.length === 1) {
          [vm.finalized_state] = vm.states;
        }
        if (vm.cities.length === 1) {
          [vm.finalized_city] = vm.cities;
        }
        if (vm.zipcodes.length === 1) {
          [vm.finalized_zipcode] = vm.zipcodes;
        }
        vm.$store.commit('SET_USER_LOCATION', {
          zipcode: vm.finalized_zipcode,
          city: vm.finalized_city,
          state: vm.finalized_state,
        });
        vm.$root.$emit(
          'bv::hide::modal', 'location-search-modal-interactive', lsModal,
        );
      },
    },
  };
</script>

<style>
  #location-description {
    font-size: 75%;
  }
</style>
