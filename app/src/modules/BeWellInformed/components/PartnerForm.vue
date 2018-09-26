<template>
  <div>
    <h3>Enter the Results of Your Drinking Water Test</h3>
    <br>
    <!-- @TODO - Add form validation and feedback for bad returns -->

    <b-form
      @submit="onSubmit"
      @reset="onReset"
      id="water_analysis_form">
      <!--<b-form-input
        name="StateCode"
        type="hidden"
        :value="partnerResource.code"
      />-->
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
        class="row justify-content-end">
        <b-button
          type="reset"
          variant="danger">Reset</b-button>
        <b-button
          type="submit"
          variant="primary">Submit</b-button>
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
      }),
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
        this.submitPartnersData({ vm, evt });
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
