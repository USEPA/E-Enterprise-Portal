/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import { commonAppStore } from '../../adk/ADK';
import types from './types';

export default {
  ...commonAppStore.mutations,
  [types.SET_SELECTED_PARTNER](state, obj) {
    state.selectedPartner = obj;
  },
  [types.SET_WATER_ANALYSIS_REQUEST](state, obj) {
    state.waterAnalysisRequest = obj;
  },
  [types.UPDATE_PARTNERS](state, obj) {
    state.partners = obj;
  },
  [types.UPDATE_PARTNER_RESOURCE](state) {
    state.partnerResource = (state.selectedPartner)
      ? state.partnerXmls[state.selectedPartner.code]
      : null;
  },
  [types.UPDATE_PARTNER_XML](state, obj) {
    Vue.set(
      state.partnerXmls,
      obj.partner.code,
      state.partnerXmls[obj.partner.code] || obj.partner,
    );
    Vue.set(
      state.partnerXmls[obj.partner.code],
      'info',
      obj.partnerJson,
    );
  },
  [types.UPDATE_PARTNER_FLOWCHART_XML](state, obj) {
    Vue.set(
      state.partnerXmls,
      obj.partner.code,
      state.partnerXmls[obj.partner.code] || obj.partner,
    );
    Vue.set(
      state.partnerXmls[obj.partner.code],
      'flowchart',
      obj.partnerJson,
    );
  },
};
