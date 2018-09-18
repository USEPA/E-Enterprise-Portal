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
  partnerResource: null,
  partners: [],
  partnerXmls: {},
  urls: {
    getPartners: 'sample_data/stateAndTribes.json',
    getPartnerXML: 'sample_data/partner-',
    getFlowchartXML: 'sample_data/flowchart-',
  },
  waterAnalysisRequest: null,
};
