<template>
  <div>
    <h3>Enter the Results of Your Drinking Water Test</h3>
    <br>

    <div
      v-if="submissionErrorMessage"
      class="alert alert-danger"
      role="alert">
      {{ submissionErrorMessage }}
    </div>

    <b-form
      @submit="onSubmit"
      @reset="onReset"
      id="water_analysis_form">

      <ContaminantSection
        v-if="partnerResource && waterAnalysisRequest.RoutineContaminants"
        :request="waterAnalysisRequest.RoutineContaminants"
        section="RoutineContaminants"/>

      <ContaminantSection
        v-if="partnerResource && waterAnalysisRequest.BacterialContaminants"
        :request="waterAnalysisRequest.BacterialContaminants"
        section="BacterialContaminants"/>

      <ContaminantSection
        v-if="partnerResource && waterAnalysisRequest.RadionuclideContaminants"
        :request="waterAnalysisRequest.RadionuclideContaminants"
        section="RadionuclideContaminants"/>

      <div
        v-if="submissionErrorMessage"
        class="alert alert-danger"
        role="alert">
        {{ submissionErrorMessage }}
      </div>

      <div
        class="row justify-content-end">
        <b-button
          type="reset"
          variant="danger">Reset
        </b-button>
        <b-button
          type="submit"
          variant="primary">Submit
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ContaminantSection from './ContaminantSection.vue';

  const name = 'BeWellInformed';

  export default {
    name: 'PartnerForm',
    components: { ContaminantSection },
    created() {
      this.createWaterAnalysisRequest();
    },
    computed: {
      ...mapGetters({
        partners: 'BeWellInformed/getPartners',
        selectedPartner: 'BeWellInformed/getSelectedPartner',
        partnerResource: 'BeWellInformed/getPartnerResource',
        waterAnalysisRequest: 'BeWellInformed/getWaterAnalysisRequest',
        isWaterAnalysisRequestEmpty: 'BeWellInformed/isWaterAnalysisRequestEmpty',
      }),
    },
    data() {
      return {
        submissionErrorMessage: '',
      };
    },
    methods: {
      ...mapActions(name, [
        'setSelectedPartner',
        'fetchPartners',
        'fetchPartnerAndFlowchartXML',
        'createWaterAnalysisRequest',
        'submitPartnersData',
      ]),
      onSubmit(evt) {
        evt.preventDefault();

        const vm = this;
        const isRequestEmpty = vm.isWaterAnalysisRequestEmpty();

        if (!isRequestEmpty) {
          evt.preventDefault();
          vm.submissionErrorMessage = '';
          vm.submitPartnersData({ vm, evt });
        } else {
          vm.submissionErrorMessage = 'Please enter values for some of the contaminants.';
        }
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.createWaterAnalysisRequest();
      },
    },
  };
</script>

<style
  scoped
  lang="scss">
  .row > button {
    margin-right: .5rem;
  }
</style>
