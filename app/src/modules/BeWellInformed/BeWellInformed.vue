<template>
  <div>
    <AppWrapper :eep-app="eepApp">
      <b-form
        class="needs-validation"
        validated>
        <b-form-select
          :value="selectedPartner"
          :options="partners"
          @change="setSelectedPartner"
          class="mb-3">
          <template slot="first">
            <!-- this slot appears above the options from 'options' prop -->
            <option
              :value="null"
              disabled>-- Please select an partner --</option>
          </template>
        </b-form-select>
        <div
          id="bwi-widget-state-content"
          class="py-2"
          v-html="eepApp.html.mainCard">
        </div>
        <b-btn
          variant="primary"
          ref="btnCheckYourWater"
          @click="onCheckYourWater">
          Check Your Water
        </b-btn>
      </b-form>
      <!-- Various Modals required for the workbench app-->
      <AppModal
        id="bwi-modal"
        modal-ref="bwi-modal">
        <b-tabs>
          <b-tab
            title="Entry"
            active>
            <h3>Enter the Results of Your Drinking Water Test</h3>
            <div>
              <div class="bs-callout bs-callout-warning hidden">
                <h4>Please correct the errors below:</h4>
              </div>

              <div class="bs-callout bs-callout-info hidden">
                <h4>Everything appears valid</h4>
              </div>

              <form
                action=""
                id="water_analysis_results_form">
                <input
                  type="hidden"
                  name="StateCode"
                  value="MA">
                <div
                  id="routine-contaminants"
                  class="row usa-grid-full">
                  <div class="usa-width-one-whole">
                    <h3>Routine Water Analysis</h3>
                    <div class="usa-width-one-half">
                      <div class="row section"><div class="contaminant-wrapper">
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
                          <option value="g/L">g/L</option><option
                            value="mg/L"
                            selected=""
                            class="default">mg/L</option>
                          <option value="µg/L">µg/L</option>
                          <option value="ppm">ppm</option>
                          <option value="ppb">ppb</option>
                        </select>
                      </div></div>
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
                              class="default">mg/L</option>
                            <option value="µg/L">µg/L</option>
                            <option value="ppm">ppm</option>
                            <option value="ppb">ppb</option>
                          </select>
                        </div>
                      </div>
                    </div><div class="usa-width-one-half">
                      <div class="row section"><div class="contaminant-wrapper">
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
                            class="default">mg/L</option>
                          <option value="µg/L">µg/L</option>
                          <option value="ppm">ppm</option>
                          <option value="ppb">ppb</option>
                        </select>
                      </div></div>
                      <div class="row section"><div class="contaminant-wrapper">
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
                            class="default">mg/L</option>
                          <option value="µg/L">µg/L</option>
                          <option value="ppm">ppm</option>
                          <option value="ppb">ppb</option>
                        </select>
                      </div></div>
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
                </div>
              </form>
            </div>
          </b-tab>
          <b-tab title="State/Tribe Resources" >
            <br>I'm the second tab content
          </b-tab>
          <b-tab
            title="Results"
            disabled>
            <br>Disabled tab!
          </b-tab>
        </b-tabs>
      </AppModal>
    </AppWrapper>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal } from '../adk/ADK';
  import storeModule from './store/index';

  const name = 'BeWellInformed';

  export default {
    name: 'BeWellInformed',
    components: {
      AppWrapper,
      AppModal,
    },
    beforeCreate() {

    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[name])) {
        store.registerModule(name, storeModule);
      }
      this.fetchPartners();
    },
    data() {
      return {
        eepApp: {
          id: 'be-well-informed',
          title: 'Be Well Informed',
          source: {
            text: 'New Hampshire’s Be Well Informed Guide',
            link: 'https://xml2.des.state.nh.us/DWITool/Welcome.aspx',
          },
          html: {
            mainCard:
              '<p>Have a well and wonder what your water testing results mean?</p>\n' +
              '<p>\n' +
              '  Be Well Informed lets you enter your test results and get feedback about health\n' +
              '  concerns and water treatment choices. Be Well Informed includes useful information about\n' +
              '  the most common contaminants that affect wells.\n' +
              '</p>\n' +
              '<p>\n' +
              '  A quick disclaimer before we start: Information provided by the participating States\n' +
              '  is for informational purposes only. It is recommended that you consult a qualified water\n' +
              '  treatment professional if you need to treat your water. They can consider other\n' +
              '  conditions or factors related to your well or home to determine the most appropriate\n' +
              '  water treatment option.\n' +
              '</p>\n' +
              '<p class="widget-note powered-by-nhbwi">Modeled After:\n' +
              '  <a\n' +
              '    href="https://xml2.des.state.nh.us/DWITool/Welcome.aspx"\n' +
              '    target="_blank">New Hampshire’s Be <em>Well</em> Informed Guide</a>\n' +
              '</p>',
          },
        },
      };
    },
    computed: {
      ...mapGetters({
        partners: 'BeWellInformed/getPartners',
        selectedPartner: 'BeWellInformed/getSelectedPartner',
      }),
    },
    methods: {
      ...mapActions(name, [
        'setSelectedPartner',
        'fetchPartners',
        'fetchPartnerAndFlowchartXML',
      ]),
      onCheckYourWater() {
        const partner = this.selectedPartner;
        this.fetchPartnerAndFlowchartXML(partner.code);
        this.$root.$emit(
          'bv::show::modal', 'bwi-modal', this.$refs.btnCheckYourWater,
        );
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
  lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
