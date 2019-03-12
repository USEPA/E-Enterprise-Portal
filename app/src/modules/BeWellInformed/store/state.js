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
  urls: {
    LOCAL: {
      getPartners: 'sample_data/stateAndTribes.json',
      getPartnerXML: 'get_bwi_xml/partner-',
      getFlowchartXML: 'get_bwi_xml/flowchart-',
      submitPartnersData: 'https://dev.e-enterprise.gov/TestRest/bwievaluation',
    },
    DEV: {
      getPartners: 'sample_data/stateAndTribes.json',
      getPartnerXML: 'get_bwi_xml/partner-',
      getFlowchartXML: 'get_bwi_xml/flowchart-',
      submitPartnersData: 'https://dev.e-enterprise.gov/TestRest/bwievaluation',
    },
    TEST: {
      getPartners: 'sample_data/stateAndTribes.json',
      getPartnerXML: 'get_bwi_xml/partner-',
      getFlowchartXML: 'get_bwi_xml/flowchart-',
      submitPartnersData: 'https://dev.e-enterprise.gov/TestRest/bwievaluation',
    },
    PROD: {
      getPartners: 'sample_data/stateAndTribes.json',
      getPartnerXML: 'https://e-enterprise.gov/be_well_informed/get_bwi_xml/partner-',
      getFlowchartXML: 'https://e-enterprise.gov/be_well_informed/get_bwi_xml/flowchart-',
      submitPartnersData: 'https://nodeweb.epacdxnode.net/BWIService/bwievaluation',
    },
  },
  waterAnalysisRequest: {},
  waterAnalysisResults: [],
};
