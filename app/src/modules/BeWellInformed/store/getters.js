import { commonAppStore } from '../../adk/ADK';

export default {
  ...commonAppStore.getters,
  getSelectedPartner(state) {
    return state.selectedPartner;
  },
  getPartners(state) {
    return state.partners.map(c => ({ value: c, text: c.name }));
  },
};
