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
    const { flowchart } = getters.getPartnerResource;
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
  getContaminantFromSymbol: (state, getters) => (symbol) => {
    const partnerResource = getters.getPartnerResource;
    const Contaminants = partnerResource.flowchart.FlowCharts.Contaminants.Contaminant;
    let contaminant = null;

    const contaminantArray = Contaminants.filter(c => c._attributes.Value === symbol);

    if (Array.isArray(contaminantArray) && contaminantArray.length) {
      [contaminant] = contaminantArray;
    }

    return contaminant;
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
    return state.partners.map(c => ({ value: c, text: c.name }));
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
  getRawWaterAnalysisRequest: (state, getters) => {
    const waterAnalysisRequest = getters.getWaterAnalysisRequest;
    const partner = getters.getSelectedPartner;
    const r = {};
    const sections = getters.getPartnerSectors;

    // Purge unused values and return a clean object
    Object.keys(sections).forEach((section) => {
      r[section] = {};
      Object.keys(waterAnalysisRequest[section]).forEach((symbol) => {
        if ((waterAnalysisRequest[section][symbol].Value && waterAnalysisRequest[section][symbol].Value !== -9999)
          || waterAnalysisRequest[section][symbol].Present) {
          r[section][symbol] = {};
          Object.assign(r[section][symbol], waterAnalysisRequest[section][symbol]);
        }
      });
    });

    if (waterAnalysisRequest.InteractivePromptResponses) {
      r.InteractivePromptResponses = waterAnalysisRequest.InteractivePromptResponses;
    }

    // Set the partner specific information
    r.StateCode = partner.code;

    return r;
  },
  isWaterAnalysisRequestEmpty: (state, getters) => () => {
    const waterAnalysisRequest = getters.getRawWaterAnalysisRequest;
    let isEmpty = true;
    Object.keys(waterAnalysisRequest).forEach((section) => {
      // eslint-disable-next-line no-bitwise
      isEmpty &= _.isEmpty(waterAnalysisRequest[section]);
    });
    return isEmpty;
  },
  getWaterTreatmentTitle(state, getters) {
    let r = 'Water Treatment Systems';
    const results = getters.getWaterAnalysisResults;

    if (results.length && results[0]) {
      r += ' That Remove ';
      const resultEvaluations = results[0].ResultEvaluations;
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
    }

    return r;
  },
};
