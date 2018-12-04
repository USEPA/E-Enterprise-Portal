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
          {{ finalized_city }}, {{ finalized_state }} - {{ finalized_zipcode }}</div>
      </div>
      <div
        class="col-sm-12"
        v-if="isLocationSearchBarEnabled">
        <b-input-group id="location-input">
          <b-form-input
            type="text"
            v-model="locationInputText"
            placeholder="Enter city, state; or ZIP code"/>
          <b-input-group-append>
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
              :value="null"
              disabled>-- Please select an partner --
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
            <option
              :value="null"
              disabled>-- Please select an partner --
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
            <option
              :value="null"
              disabled>-- Please select an partner --
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
  import { mapActions } from 'vuex';
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
      geolocationTitle() {
        return (!this.checkForGeolocation()) ? 'Enable Geolocation' : 'Click to use your geolocation';
      },
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
      isLocationSearchBarEnabled() {
        const vm = this;
        const { state } = vm.$store;
        return (!vm.hasLocation || state.ui.hasLocationSearch);
      },
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
      submitLocation() {
        this.$store.dispatch('createLocationRequest', this.locationInputText);
      },
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
