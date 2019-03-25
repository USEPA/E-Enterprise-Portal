<template>
  <div>
    <h5>Enter the Results of Your Drinking Water Test</h5>

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
        ref="RoutineContaminants"
        section="RoutineContaminants"/>

      <ContaminantSection
        v-if="partnerResource && waterAnalysisRequest.BacterialContaminants"
        :request="waterAnalysisRequest.BacterialContaminants"
        ref="BacterialContaminants"
        section="BacterialContaminants"/>

      <ContaminantSection
        v-if="partnerResource && waterAnalysisRequest.RadionuclideContaminants"
        :request="waterAnalysisRequest.RadionuclideContaminants"
        ref="RadionuclideContaminants"
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
  import { EventBus } from '../../../EventBus';

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
        EventBus.$emit('bwi::partnerModalSubmit');

        evt.preventDefault();

        const vm = this;
        const isRequestEmpty = vm.isWaterAnalysisRequestEmpty();

        if (!isRequestEmpty) {
          evt.preventDefault();
          vm.submissionErrorMessage = '';
          vm.submitPartnersData({ vm, evt });
        }
        else {
          vm.submissionErrorMessage = 'Please enter values for some of the contaminants.';
        }
      },
      onReset(evt) {
        const vm = this;
        evt.preventDefault();
        /* Reset our form values */
        this.createWaterAnalysisRequest();
        // Reset fake values on sections
        const section = vm.$refs['BacterialContaminants'];
        section.fakeInputs = {};
        section.radios = {};
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
