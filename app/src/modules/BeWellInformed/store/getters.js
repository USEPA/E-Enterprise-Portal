import { commonAppStore } from '../../adk/ADK';

export default {
  ...commonAppStore.getters,
  getSelectedPartner(state) {
    return state.selectedPartner;
  },
  getPartnerResource(state) {
    return state.partnerResource;
  },
  getPartnerXmls(state) {
    return state.partnerXmls;
  },
  getPartners(state) {
    return state.partners.map(c => ({ value: c, text: c.name }));
  },
  // getFlowchartContaminants(state, getters, global_state, other) {
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
};
