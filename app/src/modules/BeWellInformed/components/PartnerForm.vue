<template>
  <div>
    <h3>Enter the Results of Your Drinking Water Test</h3>
    <!--<div class="bs-callout bs-callout-warning hidden">
      <h4>Please correct the errors below:</h4>
    </div>

    <div class="bs-callout bs-callout-info hidden">
      <h4>Everything appears valid</h4>
    </div>-->

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
    </b-form>

    <form
      action=""
      id="water_analysis_results_form">
      <!--<input
        type="hidden"
        name="StateCode"
        value="MA">-->
      <!--<div
        id="routine-contaminants"
        class="row usa-grid-full">
        <div class="usa-width-one-whole">
          <h3>Routine Water Analysis</h3>
          <div class="usa-width-one-half">
            <div class="row section">
              <div class="contaminant-wrapper">
                <input
                  type="hidden"
                  name="RoutineContaminants[As][Symbol]"
                  value="As">
                <input
                  type="hidden"
                  name="RoutineContaminants[As][Name]"
                  value="Arsenic">
                <label
                  class="column one-third"
                  for="txt-As"
                  id="lbl-As">Arsenic </label>
                <input
                  class="column one-third"
                  name="RoutineContaminants[As][Value]"
                  type="number"
                  step="0.001"
                  id="txt-As"
                  aria-describedby="ddl-As">
                <select
                  class="column one-third"
                  name="RoutineContaminants[As][Unit]"
                  id="ddl-As"
                  aria-label="Select units for Arsenic ">
                  <option value="g/L">g/L</option>
                  <option
                    value="mg/L"
                    selected=""
                    class="default">mg/L
                  </option>
                  <option value="µg/L">µg/L</option>
                  <option value="ppm">ppm</option>
                  <option value="ppb">ppb</option>
                </select>
              </div>
            </div>
            <div class="row section">
              <div class="contaminant-wrapper">
                <input
                  type="hidden"
                  name="RoutineContaminants[Fe][Symbol]"
                  value="Fe">
                <input
                  type="hidden"
                  name="RoutineContaminants[Fe][Name]"
                  value="Iron">
                <label
                  class="column one-third"
                  for="txt-Fe"
                  id="lbl-Fe">Iron </label>
                <input
                  class="column one-third"
                  name="RoutineContaminants[Fe][Value]"
                  type="number"
                  step="0.001"
                  id="txt-Fe"
                  aria-describedby="ddl-Fe">
                <select
                  class="column one-third"
                  name="RoutineContaminants[Fe][Unit]"
                  id="ddl-Fe"
                  aria-label="Select units for Iron ">
                  <option value="g/L">g/L</option>
                  <option
                    value="mg/L"
                    selected=""
                    class="default">mg/L
                  </option>
                  <option value="µg/L">µg/L</option>
                  <option value="ppm">ppm</option>
                  <option value="ppb">ppb</option>
                </select>
              </div>
            </div>
          </div>
          <div class="usa-width-one-half">
            <div class="row section">
              <div class="contaminant-wrapper">
                <input
                  type="hidden"
                  name="RoutineContaminants[Pb][Symbol]"
                  value="Pb">
                <input
                  type="hidden"
                  name="RoutineContaminants[Pb][Name]"
                  value="Lead">
                <label
                  class="column one-third"
                  for="txt-Pb"
                  id="lbl-Pb">Lead </label>
                <input
                  class="column one-third"
                  name="RoutineContaminants[Pb][Value]"
                  type="number"
                  step="0.001"
                  id="txt-Pb"
                  aria-describedby="ddl-Pb">
                <select
                  class="column one-third"
                  name="RoutineContaminants[Pb][Unit]"
                  id="ddl-Pb"
                  aria-label="Select units for Lead ">
                  <option value="g/L">g/L</option>
                  <option
                    value="mg/L"
                    selected=""
                    class="default">mg/L
                  </option>
                  <option value="µg/L">µg/L</option>
                  <option value="ppm">ppm</option>
                  <option value="ppb">ppb</option>
                </select>
              </div>
            </div>
            <div class="row section">
              <div class="contaminant-wrapper">
                <input
                  type="hidden"
                  name="RoutineContaminants[PbSt][Symbol]"
                  value="PbSt">
                <input
                  type="hidden"
                  name="RoutineContaminants[PbSt][Name]"
                  value="Lead Stagnant">
                <label
                  class="column one-third"
                  for="txt-PbSt"
                  id="lbl-PbSt">Lead Stagnant </label>
                <input
                  class="column one-third"
                  name="RoutineContaminants[PbSt][Value]"
                  type="number"
                  step="0.001"
                  id="txt-PbSt"
                  aria-describedby="ddl-PbSt">
                <select
                  class="column one-third"
                  name="RoutineContaminants[PbSt][Unit]"
                  id="ddl-PbSt"
                  aria-label="Select units for Lead Stagnant ">
                  <option value="g/L">g/L</option>
                  <option
                    value="mg/L"
                    selected=""
                    class="default">mg/L
                  </option>
                  <option value="µg/L">µg/L</option>
                  <option value="ppm">ppm</option>
                  <option value="ppb">ppb</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="interactive-prompts"></div>
      <div class="row usa-width-one-whole reset-submit">
        <div class="column"></div>
        <div class="column right">
          <button
            id="water_analysis_reset"
            class="usa-button usa-button-outline"
            type="button">Reset
          </button>
          <button
            id="water_analysis_submit"
            class="usa-button-primary ga-tracking"
            data-ga-event-label="bwi MA submit"
            type="button">Submit
          </button>
        </div>
      </div>-->
    </form>
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
