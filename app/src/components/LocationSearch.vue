<!-- get the button call back to call the axios function in actions.js-->
<template>
  <div
    id="location-wrapper"
    class="col-6">
    <b-input-group>
      <b-form-input
        id="location-input"
        type="text"
        v-model="location"
        placeholder="Enter city, state; or ZIP code"/>
      <b-input-group-append>
        <b-button
          id="submit-location"
          @click="submitLocation">
          <div class="button-image">
            <img
              id="go-btn-image"
              src=""
              alt="Go">
          </div> <!-- @TODO: make the background image an arrow get from kate -->
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <AppModal
      id="location-search-modal-interactive"
      modal-ref="location-search-modal-interactive"
      title="Additional Information Needed">

      <!-- zipcode drop down -->
      <b-dropdown id="location-zipcodes" v-if="zipcodes.length > 1" text="Select a zipcode">
        <b-dropdown-item class="zipcodes" v-for="zipcode in zipcodes">{{zipcode}}</b-dropdown-item>
      </b-dropdown>

      <!-- city drop down -->
      <b-dropdown id="location-cities" v-if="zipcodes.cities > 1" text="Select a city">
        <b-dropdown-item class="cities" v-for="city in cities">{{city}}</b-dropdown-item>
      </b-dropdown>



    </AppModal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { AppModal } from '../modules/wadk/WADK';
  import { EventBus } from '../EventBus';

  const name = 'LocationSearch';

  // check with sam about ...mapActions or use .dispatch
  export default {
    components: {
      AppModal,
    },
    data() {
      return {
        location: '',
        zipcodes: [],
        cities: [],
      };
    },
    created() {
      // Custom event listeners
      EventBus.$on('locationSearch::showUserConfirmationModal', this.showUserConfirmationModal);
    },
    methods: {
      ...mapActions(name, ['createLocationRequest']),
      submitLocation() {
        this.$store.dispatch('createLocationRequest', this.location);
      },
      showUserConfirmationModal(payload) {
        const vm = this;
        const lsModal = vm.$refs.location_search_modal_interactive;

        vm.$root.$emit(
          'bv::show::modal', 'location-search-modal-interactive', lsModal,
        );
        console.log(payload.value);
        this.zipcodes = payload.value.zipcode;
        this.cities = payload.value.city;
      },
    },
  };
</script>

<style>
  #go-btn-image {
    width: 20px;
    height: 20px;
  }

  #gridModalLabel {
    color: white;
  }

  #location-search-modal-interactive___BV_modal_header_ {
    background-color: #0071bc;
  }

  .dropdown-item > a {
    background-color: grey;

  }
</style>
