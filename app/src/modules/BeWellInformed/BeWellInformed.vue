<template
  ref="bwi">
  <div>
    <AppWrapper
      :eep-app="eepApp">
      <template>
        <p class="check-water-message pt-1">
          Have a well and wonder what your water testing results mean? Enter
          water test results and get feedback about health concerns and water treatment choices.</p>
      </template>
      <b-form
        class="needs-validation"
        @submit="onCheckYourWater"
        novalidated>
        <label
          for="partner-selection"
        >State/Tribe</label>
        <b-row>
          <b-col md="8">
            <b-form-select
              id="partner-selection"
              :value="selectedPartner"
              :options="partners"
              ref="partnerDropdown"
              @change="setSelectedPartner"
              class="mb-3"
              required>
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option
                  :value="null"
                  disabled>Select...
                </option>
              </template>
            </b-form-select>
          </b-col>
          <b-col md="4">
            <b-btn
              variant="primary"
              ref="btnCheckYourWater"
              type="submit">
              Go
            </b-btn>
          </b-col>
        </b-row>
      </b-form>
      <!-- Various Modals required for the workbench app-->

      <!-- Main BWI Modal-->
      <AppModal
        id="bwi-modal"
        modal-ref="bwi-modal"
        title="Be Well Informed Water Analysis Tool"
        :hide-footer="true">

        <b-tabs
          v-model="tabIndex"
          ref="bwi-tabs">

          <!-- BWI primary form & placeholder -->
          <b-tab
            title="Entry"
            active
            class="py-3">
            <PartnerForm v-if="isFlowchartReady"/>
            <AppPlaceholderContent
              v-if="!isFlowchartReady"
              :repeatitions="3">
              <div
                v-for="i in 3"
                :key="i"
                class="row my-5">
                <h5 class="col-md-12 pulse"></h5>
                <div
                  v-for="j in 3"
                  :key="`${j}-left`"
                  class="col-md-6">
                  <div class="row m-2">
                    <div class="col-12 pulse"></div>
                  </div>
                </div>
                <div
                  v-for="j in 3"
                  :key="`${j}-right`"
                  class="col-md-6">
                  <div class="row m-2">
                    <div class="col-12 pulse"></div>
                  </div>
                </div>
              </div>
              <hr>
            </AppPlaceholderContent>
          </b-tab>

          <!-- BWI Partner Information and Additional Resources -->
          <b-tab
            title="State/Tribe Resources"
            class="py-3">
            <PartnerResources v-if="isFlowchartReady"/>
            <AppPlaceholderContent v-if="!isFlowchartReady"/>
          </b-tab>

          <!-- BWI Results -->
          <b-tab
            title="Results"
            class="py-3"
            :disabled="!hasResults">
            <template
              v-if="hasWaterAnalysisResults()">
              <WaterAnalysisResult
                :water-analysis-result="waterAnalysisResults[0]"/>
            </template>
          </b-tab>
        </b-tabs>

        <!-- NBSP is used to prevent the default modal buttons from rendering -->
        <template
          slot="footer">&nbsp;
        </template>
      </AppModal>

      <!-- Additional Information Request Modals -->
      <AppModal
        id="bwi-modal-interactive"
        modal-ref="bwi-modal-interactive"
        title="Additional Information Needed">
        <div class="row">
          <h3 class="col-md-12">Enter the Results of Your Drinking Water Test</h3>

          <!-- Requested prompts form the BWI Service -->
          <template
            v-if="interactivePrompts"
            v-for="(question) in interactivePrompts">
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
                      value="true">Yes
                    </b-form-radio>
                    <b-form-radio
                      class="radio-btn radio-btn-primary"
                      value="false">No
                    </b-form-radio>
                  </b-form-radio-group>
                </div>
              </div>
            </div>
          </template>

          <!-- Requested missing contaminant information from the BWI Service -->
          <template
            v-if="additionalContaminantRequests"
            v-for="(question) in additionalContaminantRequests">
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
                      event:$event })"/>
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
                    <template
                      v-for="unit in getContaminantUnits(question)">
                      <option
                        :key="unit"
                        :value="unit">{{ unit }}
                      </option>
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
            type="submit"
            variant="primary"
            @click="onSubmit">Submit
          </b-button>
        </template>
      </AppModal>
    </AppWrapper>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal, AppPlaceholderContent } from '../wadk/WADK';
  import storeModule from './store/index';
  import PartnerForm from './components/PartnerForm.vue';
  import PartnerResources from './components/PartnerResources.vue';
  import { EventBus } from '../../EventBus';
  import WaterAnalysisResult from './components/WaterAnalysisResult.vue';

  const moduleName = 'BeWellInformed';

  export default {
    name: moduleName,
    components: {
      WaterAnalysisResult,
      AppWrapper,
      AppModal,
      AppPlaceholderContent,
      PartnerForm,
      PartnerResources,
    },
    beforeCreate() {
      require.context('./images', false, /\.png$/);
    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
      this.fetchPartners();

      // Custom event listeners
      EventBus.$on('bwi::showWaterAnalysisResults', this.showWaterAnalysisResults);

      // Update location in BWI app
      EventBus.$on('locationService::update', this.updateSelectedPartner);

      // Partner modal submit button clicked
      EventBus.$on('bwi::partnerModalSubmit', this.onPartnerModalSubmit);
    },
    data() {
      return {
        tabIndex: 0,
        hasResults: false,
        partnerModalSubmit: false,
        interactiveModalSubmit: false,
      };
    },
    mounted() {
    },
    computed: {
      ...mapGetters({
        additionalContaminantRequests: 'BeWellInformed/getAdditionalContaminantRequests',
        interactivePrompts: 'BeWellInformed/getInteractivePrompts',
        isWaterAnalysisRequestEmpty: 'BeWellInformed/isWaterAnalysisRequestEmpty',
        partnerResource: 'BeWellInformed/getPartnerResource',
        partners: 'BeWellInformed/getPartners',
        partnerXmls: 'BeWellInformed/getPartnerXmls',
        selectedPartner: 'BeWellInformed/getSelectedPartner',
        waterAnalysisRequest: 'BeWellInformed/getWaterAnalysisRequest',
        waterAnalysisResults: 'BeWellInformed/getWaterAnalysisResults',
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
      ...mapActions(moduleName, [
        'createWaterAnalysisRequest',
        'setSelectedPartner',
        'fetchPartners',
        'fetchPartnerAndFlowchartXML',
        'submitPartnersData',
        'updateAdditionalContaminantProperty',
        'updatePromptResponses',
        'updateSelectedPartner',
        'updateWaterAnalysisRequestProperty',
        'downloadPDF',
      ]),
      onCheckYourWater(evt) {
        evt.preventDefault();
        const partner = this.selectedPartner;
        if (partner) {
          EventBus.$emit('grid::modalOpen', this.eepApp.field_vue_component_name, this.eepApp);
          this.fetchPartnerAndFlowchartXML(partner.code);
          this.$root.$emit(
            'bv::show::modal', 'bwi-modal', this.$refs.btnCheckYourWater,
          );
          this.$ga.event('eportal', 'click', `BWI Partner Load- ${partner.code}`, 1)
        }
      },
      getContaminantUnits(question) {
        return this.getContaminantFromSymbol(question.Symbol)._attributes.Units.split('|');
      },
      getContaminantFromSymbol(symbol) {
        const { partnerResource } = this;
        const Contaminants = partnerResource.flowchart.FlowCharts.Contaminants.Contaminant;
        let contaminant = null;

        const contaminantArray = Contaminants.filter(c => c._attributes.Value === symbol);

        if (Array.isArray(contaminantArray) && contaminantArray.length) {
          [contaminant] = contaminantArray;
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
        this.interactiveModalSubmit = true;
        this.partnerModalSubmit= false;
        const partner = this.selectedPartner;
        const vm = this;
        const isRequestEmpty = vm.isWaterAnalysisRequestEmpty();
        if (!isRequestEmpty) {
          evt.preventDefault();
          vm.submissionErrorMessage = '';
          vm.submitPartnersData({ vm, evt });
          vm.$root.$emit(
            'bv::hide::modal',
            'bwi-modal-interactive',
            vm.$refs.bwiModalInteractive
          );
          this.$ga.event('eportal', 'click', `BWI Submit Form- ${partner.code}`, 1)
        } else {
          this.submissionErrorMessage = 'Please enter values for some of the contaminants.';
        }
      },
      showWaterAnalysisResults(event) {
        const vm = this;
        const bwiModal = vm.$refs.bwi_modal;

        vm.$root.$emit(
          'bv::show::modal', 'bwi-modal', bwiModal,
        );

        vm.hasResults = true;
        vm.$nextTick(() => {
          vm.tabIndex = event.value;
        });
      },
      hasWaterAnalysisResults() {
        return this.waterAnalysisResults
          && this.waterAnalysisResults.length
          && this.waterAnalysisResults[0];
      },
      onPartnerModalSubmit() {
        this.partnerModalSubmit = true;
      },
    },
    props: {
      eepApp: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
  lang="scss">
  .check-water-message {
    font-size: .875rem; //14px
    line-height: 1.2;
    margin-top: .5rem;
  }
  .wapp {
    form {
      margin-top: .5rem;
      label {
        margin-bottom: 0;
      }
      label,
      .custom-select,
      .btn-primary {
        font-size: 0.9375rem; //15px
      }
      .custom-select {
        line-height: 1.5;
      }
      .btn-primary {
        line-height: 1;
      }
    }
  }
  #bwi-modal {
    h3 {
      font-family: "Source Sans Pro Web", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }
    h4 {
      font-size: 1rem;
      font-weight: bold;
    }
  }

</style>
