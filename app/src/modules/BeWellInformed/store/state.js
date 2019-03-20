/**
 * Values added here are available to all BeWellInformed application.  These
 * should be initial data states and values. No methods.
 *
 * @SEE https://vuex.vuejs.org/guide/state.html
 */

import { commonAppStore } from '../../wadk/WADK';

export default {
  ...commonAppStore.state,
  additionalContaminantRequests: [],
  currentWaterAnalysisResults: {},
  interactivePrompts: [],
  partnerResource: {},
  partners: [],
  partnerXmls: {},
  resultEvaluation: {},
  resultEvaluations: [],
  selectedPartner: null,
  treatmentSteps: {},
  useSampleData: true,
  api: {
    urls: {
      getPartners: 'internal:get_bwi_xml/stateAndTribes.json',
      getPartnerXML: 'internal:get_bwi_xml/partner-',
      getFlowchartXML: 'internal:get_bwi_xml/flowchart-',
      bwiService: 'eep/proxy/service/be-well-informed',
    },
  },
  waterAnalysisRequest: {},
  waterAnalysisResults: [],
};
