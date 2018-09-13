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
