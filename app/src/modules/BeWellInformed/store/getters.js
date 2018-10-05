/**
 * Methods added here are available to all BeWellInformed application.  Methods
 * do not directly modify any Store value. Methods may provide calculations
 * based off the store's state values, such as filters.
 *
 * IMPORTANT: You can also pass arguments to getters by returning a function.
 * This is particularly useful when you want to query an array in the store.
 * @SEE https://vuex.vuejs.org/guide/getters.html#method-style-access
 *
 * @SEE https://vuex.vuejs.org/guide/getters.html
 */

import _ from 'lodash';
import { commonAppStore } from '../../wadk/WADK';

export default {
  ...commonAppStore.getters,

  getAdditionalContaminantRequests(state) {
    return state.additionalContaminantRequests;
  },
  getFlowchartContaminants: (state, getters) => (section) => {
    const {flowchart} = getters.getPartnerResource;
    const r = (flowchart
      && flowchart.FlowCharts
      && flowchart.FlowCharts.Contaminants
      && flowchart.FlowCharts.Contaminants.Contaminant)
      ? flowchart.FlowCharts.Contaminants.Contaminant
      // eslint-disable-next-line no-underscore-dangle
        .filter(item => item._attributes.Section.match(section))
      : [];
    return r;
  },
  getInteractivePrompts(state) {
    return state.interactivePrompts;
  },
  getPartnerResource(state) {
    return state.partnerResource;
  },
  getPartnerSectors(state, getters) {
    const partnerResource = getters.getPartnerResource;
    const r = (
      partnerResource
      && partnerResource.flowchart
      && partnerResource.flowchart.FlowCharts
      && partnerResource.flowchart.FlowCharts.Sections)
      ? partnerResource.flowchart.FlowCharts.Sections
      : {};
    return r;
  },
  getPartners(state) {
    return state.partners.map(c => ({value: c, text: c.name}));
  },
  getPartnerXmls(state) {
    return state.partnerXmls;
  },
  getSelectedPartner(state) {
    return state.selectedPartner;
  },
  getWaterAnalysisRequest(state) {
    return state.waterAnalysisRequest;
  },
  getTreatmentSteps(state) {
    return state.treatmentSteps;
  },
  getResultEvaluations(state) {
    return state.resultEvaluations;
  },
  getWaterAnalysisResults(state) {
    return state.waterAnalysisResults;
  },

  getRawWaterAnalysisRequest: (state, getters) => () => {
    const {waterAnalysisRequest} = state;
    const r = {};
    const sections = getters.getPartnerSectors;

    // Purge unused values and return a clean object
    Object.keys(sections).forEach((section) => {
      r[section] = {};
      Object.keys(waterAnalysisRequest[section]).forEach((symbol) => {
        if (waterAnalysisRequest[section][symbol].Value
          || waterAnalysisRequest[section][symbol].Present) {
          r[section][symbol] = {};
          Object.assign(r[section][symbol], waterAnalysisRequest[section][symbol]);
        }
      });
    });

    if (waterAnalysisRequest.InteractivePromptResponses) {
      r.InteractivePromptResponses = waterAnalysisRequest.InteractivePromptResponses;
    }

    return r;
  },
  isWaterAnalysisRequestEmpty: (state, getters) => () => {
    const waterAnalysisRequest = getters.getRawWaterAnalysisRequest();
    let isNotEmpty = false;
    Object.keys(waterAnalysisRequest).forEach((section) => {
      isNotEmpty += !_.isEmpty(waterAnalysisRequest[section]);
    });
    return !isNotEmpty;
  },
};
