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
        v-if="partnerResource"
        section="RoutineContaminants"/>

      <ContaminantSection
        v-if="partnerResource"
        section="BacterialContaminants"/>

      <ContaminantSection
        v-if="partnerResource"
        section="RadionuclideContaminants"/>

      <div
        class="row justify-content-end">
        <!--<b-button
          type="reset"
          variant="danger">Reset</b-button>-->
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
        const vm = this;
        // this.$children[0].$refs["As-Value"][0].$refs["input"].value
        vm.$children.forEach((child) => {
          Object.keys(child.$refs).forEach((key) => {

            contaminants.forEach(() => {

            });
          });
        });

        this.$nextTick(() => { this.show = true; });
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
