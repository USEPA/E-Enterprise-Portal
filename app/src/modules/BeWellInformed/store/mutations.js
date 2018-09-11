/* eslint no-param-reassign: ["error", { "props": false }] */
import { commonAppStore } from '../../adk/ADK';
import types from './types';

export default {
  ...commonAppStore.mutations,
  [types.SET_SELECTED_PARTNER](state, obj) {
    // eslint-disable-next-line no-param-reassign
    state.selectedPartner = obj;
  },
  [types.UPDATE_PARTNERS](state, obj) {
    // eslint-disable-next-line no-param-reassign
    state.partners = obj;
  },
  [types.UPDATE_PARTNER_XML](state, obj) {
    // eslint-disable-next-line no-param-reassign
    state.partnerXmls[obj.partner.code] = state.partnerXmls[obj.partner.code] || {};
    state.partnerXmls[obj.partner.code].info = obj.partnerJson;
  },
  [types.UPDATE_PARTNER_FLOWCHART_XML](state, obj) {
    // eslint-disable-next-line no-param-reassign
    state.partnerXmls[obj.partner.code] = state.partnerXmls[obj.partner.code] || {};
    state.partnerXmls[obj.partner.code].flowchart = obj.partnerJson;
  },
};
