<template>
  <div
    class="be-well-informed-result-wrapper row"
    v-if="waterAnalysisResult">

    <!--
      Title & About the Results
    -->
    <div class="container-fluid mb-3">
      <div class="row">
        <div class="col-12">
          <h5
            class="text-center"
            v-html="infoXmlResults.Heading._cdata"></h5>
          <template
            class="introduction"
            :html="infoXmlResults.Introduction._cdata"></template>
        </div>
      </div>
    </div>

    <!--
      About the Results
    -->
    <div class="container-fluid mb-3">
      <div class="row">
        <div class="col-12">
          <h4 class="heading-bar">
            About the Results
          </h4>
          <div
            class="aboutTheResults container"
            v-html="infoXmlResults.AboutTheResults._cdata"></div>
        </div>
      </div>
    </div>

    <!--
      Result Summary
    -->
    <div class="container-fluid mb-3">

      <div class="row">
        <div class="col-12">
          <h4 class="heading-bar">
            Result Summary
          </h4>
        </div>
      </div>

      <ResultLegend :keys="infoXmlResults.Key"/>

      <div class="border-primary border-bottom d-none d-md-flex my-2">
        <div
          class="col-sm-12 col-md-1 py-1">
          <h6>Results</h6>
        </div>
        <div
          class="col-sm-12 col-md-1 py-1">
          <h6>Name</h6>
        </div>
        <div
          class="col-sm-12 col-md-2 py-1">
          <h6>Your Entry</h6>
        </div>
        <div
          class="col-sm-12 col-md-2 py-1">
          <h6>Limit</h6>
        </div>
        <div
          class="col-sm-12 col-md-6 py-1">
          <h6>About Your Well Water</h6>
        </div>
      </div>

      <div class="container">
        <template v-for="(result, key, index) in waterAnalysisResult.ResultEvaluations">
          <resultRow
            :index="index"
            :a-key="key"
            :is-summary="true"
            :process-guideline-icon="processGuidelineIcon(result.GuidelineIcon)"
            :result="result"/>
        </template>
      </div>

    </div>

    <!--
      Water Treatment Systems
    -->
    <div class="container-fluid mb-3">
      <div class="row">
        <div class="col-12">
          <h4
            class="heading-bar"
            v-html="getWaterTreatmentTitle()">
          </h4>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p class="border p-2">
            The following water treatment is based on the water quality
            information you entered.
            <br>
            <span
              class='text-danger'>
            Details concerning water treatment are below.
          </span>
          </p>
          <h4 class="text-danger">Treatment Order</h4>
        </div>
      </div>

      <div class="container ">
        <template
          v-for="(treatment, key, index) in waterAnalysisResult.TreatmentSteps">
          <div
            :key="key"
            class="row my-2">
            <div class="col-sm-2 col-md-1 wt-step bg-danger text-white text-center">
              <div class="vertical-align-center">
                <h6 class="my-0 d-none d-md-inline">Step</h6>
                <h1 class="text-white text-center"><span class="d-inline d-md-none">Step </span>{{
                  ++index }}</h1>
              </div>

            </div>
            <div class="col-sm-8 col-md-10 bg-light">
              <div class="container-fluid">
                <div class="row justify-content-center text-center">
                  <template
                    v-for="(instruction, key, index) in treatment.OrInstructions"
                  >
                    <div
                      :key="key"
                      class="col-sm-5 col-md-4 border bg-white p-2 my-2">
                      {{ instruction.Recommendation }}
                    </div>
                    <div class="col-sm-2 col-md-1 px-1 wt-or">
                      <span class="vertical-align-center d-inline-block">Or</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="col-sm-2 col-md-1 wt-step bg-primary text-white">
              <div class="vertical-align-center text-center h3">
                <i
                  v-if="hasPointOfUseTreatment(treatment)"
                  class="fas fa-tint"></i>
                <i
                  v-if="hasWholeHomeTreatment(treatment)"
                  class="fas fa-home"></i>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="row">
        <div
          class="col-12 aboutTheResults container"
          v-if="infoXmlResults.WaterTreatmentSystem"
          v-html="infoXmlResults.WaterTreatmentSystem._cdata">
        </div>
      </div>
    </div>

    <!--
      Result Details
    -->
    <div class="container-fluid mb-3">

      <div class="row">
        <div class="col-12">
          <h4 class="heading-bar">
            Result Details
          </h4>
        </div>
      </div>

      <ResultLegend :keys="infoXmlResults.Key"/>
      <div class="border-primary border-bottom d-none d-md-flex my-2">
        <div
          class="col-sm-12 col-md-1 py-1">
          <h6>Results</h6>
        </div>
        <div
          class="col-sm-12 col-md-1 py-1">
          <h6>Name</h6>
        </div>
        <div
          class="col-sm-12 col-md-2 py-1">
          <h6>Your Entry</h6>
        </div>
        <div
          class="col-sm-12 col-md-2 py-1">
          <h6>Limit</h6>
        </div>
        <div
          class="col-sm-12 col-md-6 py-1">
          <h6>About Your Well Water</h6>
        </div>
      </div>

      <div class="container">
        <template v-for="(result, key, index) in waterAnalysisResult.ResultEvaluations">
          <resultRow
            :index="index"
            :a-key="key"
            :is-summary="false"
            :process-guideline-icon="processGuidelineIcon(result.GuidelineIcon)"
            :result="result"/>
        </template>
      </div>
    </div>

  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import { AppWrapper, AppModal } from '../../adk/ADK';
  import types from '../store/types';
  import { EventBus } from '../../../EventBus';
  import ResultLegend from './ResultLegend.vue';
  import ResultRow from './ResultRow.vue';

  export default {
    name: 'WaterAnalysisResult',
    components: { ResultRow, ResultLegend },
    props: {
      waterAnalysisResult: {
        required: true,
        type: Object,
      },
    },
    created() {
    },
    computed: {
      ...mapGetters({
        partners: 'BeWellInformed/getPartners',
        partnerXmls: 'BeWellInformed/getPartnerXmls',
        selectedPartner: 'BeWellInformed/getSelectedPartner',
        partnerResource: 'BeWellInformed/getPartnerResource',
      }),
      infoXmlResults() {
        const xmls = this.partnerXmls;
        const pr = xmls[this.waterAnalysisResult.StateCode];
        const r = (pr
          && pr.info
          && pr.info.Partner.Results
        ) ? pr.info.Partner.Results : null;
        return r;
      },
      resultSummary() {
        const results = this.waterAnalysisResult.ResultEvaluations;
        const r = {};
        Object.keys(results).forEach((key) => {
          if (results[key].UserContaminatValue) {
            r[key] = results[key];
          }
        });
        return r;
      },
    },
    methods: {
      isReady() {
        return !!this.infoXmlResults;
      },
      processGuidelineIcon(guidelineIcon) {
        let r = '';
        switch (guidelineIcon) {
          case 'Images/water/check4.png':
            r = 'MeetsLimit';
            break;
          case 'Images/water/exclamation.png':
            r = 'CloseToLimit';
            break;
          case 'Images/water/orange.png':
            r = 'Factsheet';
            break;
          case 'Images/water/false4.png':
            r = 'AboveLimit';
            break;
          case 'Images/water/blank.png':
            r = 'ReferToOther';
            break;
          default:
            r = 'NoInput';
        }
        return r;
      },
      getWaterTreatmentTitle() {
        let r = 'Water Treatment Systems That Remove ';
        const { waterAnalysisResult: resultEvaluations } = this;
        const treatedContaminants = [];
        Object.keys(resultEvaluations).forEach((symbol) => {
          if (resultEvaluations[symbol].GuidelineColor === 'font-red' ||
            resultEvaluations[symbol].TreatmentMessages) {
            treatedContaminants.push(resultEvaluations[symbol].ContaminantFullName);
          }
        });
        const lastContaminant = treatedContaminants.pop();
        if (treatedContaminants.length > 1) {
          r += treatedContaminants.join(', ');
          r += ' and ';
        }
        r += lastContaminant;
        return r;
      },
      hasWholeHomeTreatment(treatment) {
        let r = [];
        const wholeHomeTreatments = ['home', 'house'];
        const systemTypes = [];
        if (Array.isArray(treatment.OrInstructions)) {
          treatment.OrInstructions.forEach((instruction) => {
            systemTypes.push(instruction.SystemType.toLowerCase());
          });
          r = wholeHomeTreatments.filter(value => -1 !== systemTypes.indexOf(value));
        }
        return r.length;
      },
      hasPointOfUseTreatment(treatment) {
        let r = [];
        const pointOfUseTreatment = ['water', 'facet', 'faucet'];
        const systemTypes = [];
        if (Array.isArray(treatment.OrInstructions)) {
          treatment.OrInstructions.forEach((instruction) => {
            systemTypes.push(instruction.SystemType.toLowerCase());
          });
          r = pointOfUseTreatment.filter(value => -1 !== systemTypes.indexOf(value));
        }
        return r.length;
      },
    },
  };
</script>
<style scoped
  lang="scss">
  @import '../../../styles/bootstrap-variable-overrides.scss';

  .heading-bar {
    // margin: -1.25rem -1.25rem 1.25rem;
    padding: .5rem 1.25rem;
    background-color: #007AC6;
    color: #fff;
  }
  .wt-step {
    background-color: Red;
  }
  .wt-treatment {
    background-color: darkgrey;
  }
  .wt-or {
    &:last-child {
      display: none;
    }
  }
</style>
