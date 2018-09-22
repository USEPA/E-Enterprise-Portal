/**
 * Methods added here are available to the BeWellInformed application. There
 * are no returned values. Changes should be atomic when possible.
 *
 * IMPORTANT: Vue cannot detect property addition or deletion. Vue does not
 * allow dynamically adding new root-level reactive properties to an already
 * created instance. However, it’s possible to add reactive properties to a
 * nested object using the Vue.set(object, key, value) method.
 *
 * IMPORTANT: Mutations Must Be Synchronous. Only Synchronous methods will
 * be created here.
 *
 *  @SEE https://vuejs.org/v2/guide/list.html#Object-Change-Detection-Caveats
 *  @SEE https://vuex.vuejs.org/guide/mutations.html
 */

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
  [types.UPDATE_INTERACTIVE_PROMPTS](state, array) {
    Vue.set(
      state,
      'interactivePrompts',
      array,
    );
  },
  [types.UPDATE_ADDITIONAL_CONTAMINANT_REQUESTS](state, array) {
    Vue.set(
      state,
      'additionalContaminantRequests',
      array,
    );
  },
};
