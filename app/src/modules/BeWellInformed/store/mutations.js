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
import { commonAppStore } from '../../wadk/WADK';
import types from './types';

export default {
  ...commonAppStore.mutations,
  [types.PUSH_WATER_ANALYSIS_RESULT](state, obj) {
    state.waterAnalysisResults.push(obj);
  },
  [types.UPDATE_PARTNERS](state, obj) {
    state.partners = obj;
  },
  [types.UPDATE_PARTNER_RESOURCE](state) {
    state.partnerResource = (
      state.selectedPartner
      && state.selectedPartner.code
      && state.partnerXmls
      && state.partnerXmls[state.selectedPartner.code]
    )
      ? state.partnerXmls[state.selectedPartner.code]
      : {};
  },
  [types.UPDATE_PARTNER_XML](state, obj) {
    const partner = {};
    Object.assign(partner, obj.partner);

    Vue.set(
      state.partnerXmls,
      partner.code,
      state.partnerXmls[partner.code] || partner,
    );
    Vue.set(
      state.partnerXmls[partner.code],
      'info',
      obj.partnerJson,
    );
  },
  [types.UPDATE_PARTNER_FLOWCHART_XML](state, obj) {
    const partner = {};
    Object.assign(partner, obj.partner);

    Vue.set(
      state.partnerXmls,
      partner.code,
      state.partnerXmls[partner.code] || partner,
    );
    Vue.set(
      state.partnerXmls[partner.code],
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
  [types.UPDATE_QUESTION_RESPONSE](state, obj) {
    if (obj.index === null) {
      state.waterAnalysisRequest[obj.type].push(obj.response);
    }
    else {
      Vue.set(
        state.waterAnalysisRequest[obj.type],
        obj.index,
        obj.response,
      );
    }
  },
  [types.UPDATE_RESULT_EVALUATION](state, obj) {
    state.resultEvaluation = obj;
  },
  [types.UPDATE_TREATMENT_STEPS](state, obj) {
    state.treatmentSteps = obj;
  },
  [types.UNSHIFT_WATER_ANALYSIS_RESULT](state, obj) {
    state.waterAnalysisResults.unshift(obj);
  },
  [types.SET_SELECTED_PARTNER](state, obj) {
    state.selectedPartner = obj;
  },
  [types.SET_WATER_ANALYSIS_REQUEST](state, obj) {
    state.waterAnalysisRequest = obj;
  },
  [types.SET_WATER_ANALYSIS_RESULT](state, obj) {
    state.waterAnalysisResult = obj;
  },
};
