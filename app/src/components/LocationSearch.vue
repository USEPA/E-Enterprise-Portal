<!-- get the button call back to call the axios function in actions.js-->
<template>
  <div
    id="location-wrapper"
    class="col-7">
    <div><span id="location-description" v-if="finalized_city != '' && finalized_state != '' && finalized_zipcode != ''">
        {{finalized_city}}, {{finalized_state}} - {{finalized_zipcode}}</span></div>
    <b-input-group>
      <b-form-input
        id="location-input"
        type="text"
        v-model="location"
        placeholder="Enter city, state; or ZIP code"/>
        <b-input-group-append>
          <b-button
            id="submit-location"
            type="submit"
            @click="submitLocation">
            <div class="button-image">
              <i class="fas fa-arrow-right"></i>
            </div>
          </b-button>
        </b-input-group-append>
      </b-form-input>
    </b-input-group>
    <AppModal
      id="location-search-modal-interactive"
      modal-ref="location-search-modal-interactive"
      title="Additional Information Needed For Location">
      <div id="zipcode-dropdown-wrapper">
        <!-- zipcode drop down -->
        <b-form-select id="location-zipcodes" v-if="zipcodes.length > 1" :options="zipcodes" v-model="finalized_zipcode">
        </b-form-select>
      </div>
      <div id="city-dropdown-wrapper">
        <!-- city drop down -->
        <b-form-select id="location-cities" v-if="cities.length > 1" :options="cities" v-model="finalized_city">
        </b-form-select>
      </div>
      <!-- NBSP is used to prevent the default modal buttons from rendering -->
      <template
              slot="footer">&nbsp;
        <b-button variant="primary" @click="submitLocationModal">Submit Location</b-button>
      </template>
    </AppModal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { AppModal } from '../modules/wadk/WADK';
  import { EventBus } from '../EventBus';

  const name = 'LocationSearch';

  export default {
    components: {
      AppModal,
    },
    data() {
      return {
        location: '',
        zipcodes: [],
        cities: [],
        state_array: [],
        finalized_state: '',
        finalized_city: '',
        finalized_zipcode: '',
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
        // set the variable values to the values in the payload to be binded to the dropdowns
        this.zipcodes = payload.value.zipcode;
        this.cities = payload.value.city;
        this.state = payload.value.state;

        // declare the modal instance
        const vm = this;
        const lsModal = vm.$refs.location_search_modal_interactive;

        // call modal to pop up if the values that are returned in the payload are > 1
        if ((this.zipcodes.length > 1 || this.cities.length > 1)) {
          vm.$root.$emit(
                  'bv::show::modal', 'location-search-modal-interactive', lsModal,
          );
        }
      },
      submitLocationModal(){
        // declare the modal instance
        const vm = this;
        const lsModal = vm.$refs.location_search_modal_interactive;
        this.finalized_state = this.state[0];
        if(this.cities.length == 1){
          this.finalized_city = this.cities[0];
        }
        if(this.zipcodes.length == 1){
          this.finalized_zipcode = this.zipcodes[0];
        }
        vm.$store.commit('SET_USER_LOCATION', {
          zipcode: this.finalized_zipcode,
          city: this.finalized_city,
          state: this.finalized_state
        });
        vm.$root.$emit(
                'bv::hide::modal', 'location-search-modal-interactive', lsModal,
        );
      }
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

  #location-description {
    float: left;
  }

  #zipcode-dropdown-wrapper{
    padding-bottom: 5px;
  }
</style>
