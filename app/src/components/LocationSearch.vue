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
      this is the app modal
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
      showUserConfirmationModal() {
        const vm = this;
        const lsModal = vm.$refs.location_search_modal_interactive;

        vm.$root.$emit(
          'bv::show::modal', 'location-search-modal-interactive', lsModal,
        );
      },
    },
  };
</script>

<style>
  #go-btn-image {
    width: 20px;
    height: 20px;
  }
</style>

