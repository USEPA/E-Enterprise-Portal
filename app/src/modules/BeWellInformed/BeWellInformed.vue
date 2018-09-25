<template
  ref="bwi">
  <div>
    <AppWrapper
      :eep-app="eepApp">
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
              disabled>-- Please select an partner --
            </option>
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
        modal-ref="bwi-modal"
        title="Be Well Informed Water Analysis Tool"
        :hide-footer="true">
        <b-tabs
          v-model="tabIndex"
          ref="bwi-tabs">
          <b-tab
            title="Entry"
            active
            class="py-3">
            <PartnerForm v-if="isFlowchartReady"/>
          </b-tab>
          <b-tab
            title="State/Tribe Resources"
            class="py-3">
            <PartnerResources v-if="isFlowchartReady"/>
          </b-tab>
          <b-tab
            title="Results"
            class="py-3"
            :disabled="!hasResults">
            <WaterAnalysisResult/>
          </b-tab>
        </b-tabs>
        <template
          slot="footer">&nbsp;
        </template>
      </AppModal>
      <AppModal
        id="bwi-modal-interactive"
        modal-ref="bwi-modal-interactive"
        title="Additional Information Needed">
        <div class="row">
          <h5 class="col-md-12">Enter the Results of Your Drinking Water Test</h5>

          <template
            v-if="interactivePrompts"
            v-for="(question, key) in interactivePrompts">
            <div
              class="col-md-12"
              :key="question.Symbol">
              <div class="row my-2">
                <div class="col-sm-6">
                  <label class="">{{ question.Interaction }}</label>
                </div>
                <div class="col-sm-6">
                  <b-form-radio-group
                    @change="updatePromptResponses({question, $event,
                                                    promptType:'InteractivePromptResponses'})"
                    :id="`${question.Symbol}-question-Value`"
                    :ref="`${question.Symbol}-question-Value`"
                    name="radioSubComponent"
                    class="text-right">
                    <b-form-radio
                      class="radio-btn radio-btn-primary"
                      value="true">Yes</b-form-radio>
                    <b-form-radio
                      class="radio-btn radio-btn-primary"
                      value="false">No</b-form-radio>
                  </b-form-radio-group>
                </div>
              </div>
            </div>
          </template>

          <template
            v-if="additionalContaminantRequests"
            v-for="(question, key) in additionalContaminantRequests">
            <div
              class="col-md-12"
              :key="question.Symbol">
              <div class="row my-2">
                <div class="col-sm-5">
                  <label class="">{{ question.Interaction }}</label>
                </div>
                <div class="col-sm-3">
                  <b-form-input
                    :ref="`${question.Symbol}-question-Value`"
                    :id="`${question.Symbol}-question-Value`"
                    type="number"
                    step="0.001"
                    size="lg"
                    @change="updateWaterAnalysisRequestProperty( {
                      section: getSectionFromSymbol(question.Symbol),
                      contaminant: getContaminantFromSymbol(question.Symbol),
                      property: 'Value',
                      event:$event })" />
                </div>
                <div class="col-sm-4">
                  <b-form-select
                    :contam="getContaminantFromSymbol(question.Symbol)"
                    :value="getContaminantFromSymbol(question.Symbol)._attributes.DefaultUnit"
                    @change="updateWaterAnalysisRequestProperty( {
                      section: getSectionFromSymbol(question.Symbol),
                      contaminant: getContaminantFromSymbol(question.Symbol),
                      property: 'Unit',
                      event:$event })">
                    <template v-for="unit in getContaminantFromSymbol(question.Symbol)._attributes.Units.split('|')" >
                      <option
                        :key="unit"
                        :value="unit" >{{ unit }}</option>
                    </template>
                  </b-form-select>
                </div>
              </div>
            </div>
          </template>

        </div>
        <template
          slot="footer">
          <b-button
            type="reset"
            variant="danger">Reset</b-button>
          <b-button
            type="submit"
            variant="primary"
            @click="onSubmit">Submit</b-button>
        </template>
      </AppModal>
    </AppWrapper>
  </div>
</template>

<script>
  /* eslint-disable prefer-const,no-underscore-dangle */

  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal } from '../adk/ADK';
  import storeModule from './store/index';
  import PartnerForm from './components/PartnerForm.vue';
  import PartnerResources from './components/PartnerResources.vue';
  import types from './store/types';
  import { EventBus } from '../../EventBus';
  import WaterAnalysisResult from './components/WaterAnalysisResult.vue';

  const name = 'BeWellInformed';

  export default {
    name: 'BeWellInformed',
    components: {
      WaterAnalysisResult,
      AppWrapper,
      AppModal,
      PartnerForm,
      PartnerResources,
    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[name])) {
        store.registerModule(name, storeModule);
      }
      this.fetchPartners();

      // Custom event listeners
      EventBus.$on('bwi::showWaterAnalysisResults', this.showWaterAnalysisResults);
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
        tabIndex: 0,
        hasResults: false,
      };
    },
    computed: {
      ...mapGetters({
        partners: 'BeWellInformed/getPartners',
        partnerXmls: 'BeWellInformed/getPartnerXmls',
        selectedPartner: 'BeWellInformed/getSelectedPartner',
        partnerResource: 'BeWellInformed/getPartnerResource',
        waterAnalysisRequest: 'BeWellInformed/getWaterAnalysisRequest',
        interactivePrompts: 'BeWellInformed/getInteractivePrompts',
        additionalContaminantRequests: 'BeWellInformed/getAdditionalContaminantRequests',
      }),
      currentTab() {
        return this.tabIndex;
      },
      isFlowchartReady() {
        const { partnerResource } = this;
        return !!(partnerResource && partnerResource.flowchart);
      },
    },
    methods: {
      ...mapActions(name, [
        'createWaterAnalysisRequest',
        'setSelectedPartner',
        'fetchPartners',
        'fetchPartnerAndFlowchartXML',
        'submitPartnersData',
        'updateAdditionalContaminantProperty',
        'updatePromptResponses',
        'updateWaterAnalysisRequestProperty',
      ]),
      onCheckYourWater() {
        const partner = this.selectedPartner;
        this.fetchPartnerAndFlowchartXML(partner.code);
        this.$root.$emit(
          'bv::show::modal', 'bwi-modal', this.$refs.btnCheckYourWater,
        );
      },
      getContaminantFromSymbol(symbol) {
        const { partnerResource } = this;
        const Contaminants = partnerResource.flowchart.FlowCharts.Contaminants.Contaminant;
        let contaminant = null;

        let contaminantArray = Contaminants.filter(c => c._attributes.Value === symbol);

        if (Array.isArray(contaminantArray) && contaminantArray.length) {
          contaminant = contaminantArray[0];
        }

        return contaminant;
      },
      getSectionFromSymbol(symbol) {
        const contaminant = this.getContaminantFromSymbol(symbol);
        let section = '';

        if (contaminant) {
          section = contaminant._attributes.Section;
        }
        return section;
      },
      onSubmit(evt) {
        evt.preventDefault();
        const vm = this;
        this.submitPartnersData({ vm, evt });
      },
      showWaterAnalysisResults(event) {
        const vm = this;
        const bwiModal = vm.$refs.bwi_modal;

        vm.$root.$emit(
          'bv::show::modal', 'bwi-modal', bwiModal,
        );

        vm.hasResults = true;
        vm.$nextTick(function () {
          vm.tabIndex = event.value;
        });
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
