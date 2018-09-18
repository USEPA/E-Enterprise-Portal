<template>
  <div>
    <h3>Enter the Results of Your Drinking Water Test</h3>
    <br/>
    <!-- @TODO - Add form validation and feedback for bad returns -->

    <b-form
      id="water_analysis_form">
      <!--<b-form-input
        name="StateCode"
        type="hidden"
        :value="partnerResource.code"
      />-->
      <ContaminantSection
        v-if="partnerResource"
        section="RoutineContaminants"/>

      <ContaminantSection
        v-if="partnerResource"
        section="BacterialContaminants"/>

      <ContaminantSection
        v-if="partnerResource"
        section="RadionuclideContaminants"/>
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
        partnerXmls: 'BeWellInformed/getPartnerXmls',
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
      ]),
    },
  };
</script>
