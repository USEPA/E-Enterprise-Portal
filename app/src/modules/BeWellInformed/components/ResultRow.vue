<template>
  <div
    :key="index"
    v-if="showResultRow"
    :class="`row border ${processGuidelineColor(result.GuidelineColor)} my-2 px-2`">

    <div
      class="col-sm-12 col-md-1 border-bottom py-1 mb-1">
      <h6 class="d-inline d-md-none">Result: </h6>
      <img
        class="key-image-icon"
        :src="includeImage(processGuidelineIcon)"
        :alt="aKey">
    </div>

    <div
      class="col-sm-12 col-md-2 border-bottom py-1 mb-1">
      <h6 class="d-inline d-md-none">Name: </h6>
      <span v-html="result.ContaminantFullName"></span>
    </div>

    <div
      class="col-sm-12 col-md-2 border-bottom py-1 mb-1">
      <h6 class="d-inline d-md-none">Your Entry: </h6>
      <span v-html="result.UserContaminatValue || 'N/A'"></span>
    </div>

    <div
      class="col-sm-12 col-md-2 border-bottom py-1 mb-1">
      <h6 class="d-inline d-md-none">Limit: </h6>
      <span v-html="result.MaximumContaminantLevel"></span>
    </div>

    <div
      class="col-sm-12 col-md-5 border-bottom py-1 mb-1">
      <h6 class="d-md-none">About Your Well Water: </h6>
      <p v-html="result.GuidelineText"></p>
    </div>

    <h6 class="treatment-results-title" v-if="canShowDetail(result.InterpretationMessages, result)">Interpretation of Results:</h6>

    <div
      class="col-12 border border-warning py-1 mb-1"
      v-if="canShowDetail(result.InterpretationMessages, result)"
      v-html="unescape(result.InterpretationMessages)"
    >
    </div>

    <h6 class="treatment-results-title" v-if="canShowDetail(result.InterpretationMessages, result)">Health Concerns:</h6>

    <div
      class="col-12 border border-warning py-1 mb-1"
      v-if="canShowDetail(result.HealthMessages, result)"
      v-html="unescape(result.HealthMessages)"
    >
    </div>

    <h6 class="treatment-results-title" v-if="canShowDetail(result.InterpretationMessages, result)">Treatment Options:</h6>

    <div
      v-if="canShowDetail(result.TreatmentMessages, result)"
      class="col-12 border border-warning py-1 mb-1"
      v-html="unescape(result.TreatmentMessages)"
    >
    </div>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    name: 'ResultSummaryRow',
    props: {
      index: {
        type: Number,
        required: true,
      },
      aKey: {
        type: String,
        required: true,
      },
      isSummary: {
        type: Boolean,
        required: true,
      },
      processGuidelineIcon: {
        type: String,
        required: true,
      },
      result: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        images: null,
      };
    },
    computed: {
      ...mapGetters({
        partnerResource: 'BeWellInformed/getPartnerResource',
      }),
      showResultRow() {
        const showSummary = (this.isSummary && this.result.UserContaminatValue);
        const showAll = (!this.isSummary);
        return (showSummary || showAll);
      },
    },
    methods: {
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
      canShowDetail(msg) {
        return (!this.isSummary && !!msg);
      },
      unescape(msg) {
        return _.unescape(msg);
      },
      processGuidelineColor(GuidelineColor) {
        let r = '';
        switch (GuidelineColor) {
          case 'font-red':
            r = 'border-danger';
            break;
          case 'font-yellow':
            r = 'boarder-warn';
            break;
          default:
            r = 'border-info';
        }
        return r;
      },
      includeImage(processGuidelineIcon) {
        const images = require.context('../images/', false, /\.png$/);
        return images(`./${processGuidelineIcon}.png`);
      },
    },
  };
</script>
<style scoped
  lang="scss">
  @import '../../../styles/bootstrap-variable-overrides.scss';
  .key-image-icon {
    $ratio: 1.5rem;
    width: $ratio;
    height: $ratio
  }
  .treatment-results-title {
    font-weight:bold;
  }
</style>
