/**
 * Values added here are available to all BeWellInformed application.  These
 * should be initial data states and values. No methods.
 *
 * @SEE https://vuex.vuejs.org/guide/state.html
 */

import { commonAppStore } from '../../adk/ADK';

export default {
  ...commonAppStore.state,
  selectedPartner: null,
  partnerResource: {},
  partners: [],
  partnerXmls: {},
  useSampleData: true,
  urls: {
    LOCAL: {
      getPartners: 'sample_data/stateAndTribes.json',
      getPartnerXML: 'sample_data/partner-',
      getFlowchartXML: 'sample_data/flowchart-',
      submitPartnersData: 'sample_data/bwievaluation-1.json',
      submitPartnersData2: 'sample_data/bwievaluation-2.json',
      submitPartnersData3: 'sample_data/bwievaluation-3.json',
    },
    DEV: {
      getPartners: 'sample_data/stateAndTribes.json',
      getPartnerXML: 'http://e-enterprise/be_well_informed/get_bwi_xml/partner-',
      getFlowchartXML: 'http://e-enterprise/be_well_informed/get_bwi_xml/flowchart-',
      submitPartnersData: 'https://nodeweb.epacdxnode.net/BWIService/bwievaluation',
    },
    TEST: {
      getPartners: 'sample_data/stateAndTribes.json',
      getPartnerXML: 'http://e-enterprise/be_well_informed/get_bwi_xml/partner-',
      getFlowchartXML: 'http://e-enterprise/be_well_informed/get_bwi_xml/flowchart-',
      submitPartnersData: 'https://nodeweb.epacdxnode.net/BWIService/bwievaluation',
    },
    PROD: {
      getPartners: 'sample_data/stateAndTribes.json',
      getPartnerXML: 'http://e-enterprise/be_well_informed/get_bwi_xml/partner-',
      getFlowchartXML: 'http://e-enterprise/be_well_informed/get_bwi_xml/flowchart-',
      submitPartnersData: 'https://nodeweb.epacdxnode.net/BWIService/bwievaluation',
    },
  },
  waterAnalysisRequest: {},
  interactivePrompts: [],
  additionalContaminantRequests: [],
  resultEvaluations: {},
  treatmentSteps: {},
};
