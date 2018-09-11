import { commonAppStore } from '../../adk/ADK';

export default {
  ...commonAppStore.state,
  selectedPartner: null,
  partners: [],
  partnerXmls: {},
  urls: {
    getPartners: 'http://localhost:8080/sample_data/stateAndTribes.json',
    getPartnerXML: 'http://localhost:8080/sample_data/partner-',
    getFlowchartXML: 'http://localhost:8080/sample_data/flowchart-',
  },
};
