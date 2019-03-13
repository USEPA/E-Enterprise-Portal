import Vue from 'vue';
import { commonAppStore } from '../../wadk/WADK';
import types from './types';

/**
 * Methods added here are available to the workbench applications. There
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

export default {
  ...commonAppStore.mutations,
  [types.SET_PERMIT_TYPE](state, str) {
    Vue.set(
      state,
      'permitType',
      str,
    );
  },
  [types.SET_STATUS](state, str) {
    Vue.set(
      state,
      'status',
      str,
    );
  },
  [types.SET_FORM_TYPE](state, str) {
    Vue.set(
      state,
      'formType',
      str,
    );
  },

  [types.SET_FEDERAL_INDICATOR](state, str) {
    Vue.set(
      state,
      'federalFacility',
      str,
    );
  },
  [types.SET_DATE_SELECTION](state, str) {
    Vue.set(
      state,
      'dateSelection',
      str,
    );
  },
  [types.SET_START_DATE](state, str) {
    Vue.set(
      state,
      'submittedDateFrom',
      str,
    );
  },
  [types.SET_END_DATE](state, str) {
    Vue.set(
      state,
      'submittedDateTo',
      str,
    );
  },
  [types.SET_TRIBAL_INDICATOR](state, str) {
    Vue.set(
      state,
      'tribalIndicator',
      str,
    );
  },
  [types.SET_TRIBE_SELECTION](state, str) {
    Vue.set(
      state,
      'tribeSelection',
      str,
    );
  },
  [types.SET_FACILITY_COUNTY](state, str) {
    Vue.set(
      state,
      'facilityCounty',
      str,
    );
  },
  [types.SET_MSGP_FACILITY_NAME](state, str) {
    Vue.set(
      state.msgpFormData,
      'facilityName',
      str,
    );
  },
  [types.SET_MSGP_NPDESID](state, str) {
    Vue.set(
      state.msgpFormData,
      'npdesId',
      str,
    );
  },
  [types.SET_MSGP_FACILITY_CITY](state, str) {
    Vue.set(
      state.msgpFormData,
      'facilityCity',
      str,
    );
  },
  [types.SET_MSGP_FACILITY_STATE](state, str) {
    Vue.set(
      state.msgpFormData,
      'facilityState',
      str,
    );
  },
  [types.SET_MSGP_FACILITY_ZIP](state, str) {
    Vue.set(
      state.msgpFormData,
      'facilityZip',
      str,
    );
  },
  [types.SET_MSGP_OPERATOR_NAME](state, str) {
    Vue.set(
      state.msgpFormData,
      'operatorName',
      str,
    );
  },
  [types.SET_MSGP_MASTER_PERMIT_NUMBER](state, str) {
    Vue.set(
      state.msgpFormData,
      'masterPermitNumber',
      str,
    );
  },
  [types.SET_MSGP_TRIBAL_NAME](state, str) {
    Vue.set(
      state.msgpFormData,
      'tribalName',
      str,
    );
  },
  [types.SET_MSGP_ISSUER](state, str) {
    Vue.set(
      state.msgpFormData,
      'issuer',
      str,
    );
  },
  [types.SET_MSGP_SUBMISSION_TYPE](state, str) {
    Vue.set(
      state.msgpFormData,
      'submissionType',
      str,
    );
  },
  [types.SET_MSGP_COVERAGE_TYPE](state, str) {
    Vue.set(
      state.msgpFormData,
      'coverageType',
      str,
    );
  },
  [types.SET_MSGP_COVERAGE_STATUS](state, str) {
    Vue.set(
      state.msgpFormData,
      'coverageStatus',
      str,
    );
  },
  [types.SET_MSGP_SECTOR](state, str) {
    Vue.set(
      state.msgpFormData,
      'sector',
      str,
    );
  },
  [types.SET_MSGP_SUBSECTOR](state, str) {
    Vue.set(
      state.msgpFormData,
      'subsector',
      str,
    );
  },
  [types.SET_MSGP_SIC_CODE](state, str) {
    Vue.set(
      state.msgpFormData,
      'sicCode',
      str,
    );
  },
  [types.SET_MSGP_ADDRESS](state, str) {
    Vue.set(
      state.msgpFormData,
      'facilityAddressLine1',
      str,
    );
  },
  [types.SET_MSGP_FACILITY_COUNTY](state, str) {
    Vue.set(
      state.msgpFormData,
      'facilityCounty',
      str,
    );
  },
  [types.SET_MSGP_FEDERAL_INDICATOR](state, str) {
    Vue.set(
      state.msgpFormData,
      'federalIndicator',
      str,
    );
  },
  [types.SET_MSGP_TRIBAL_INDICATOR](state, str) {
    Vue.set(
      state.msgpFormData,
      'tribalIndicator',
      str,
    );
  },
  [types.SET_MSGP_START_DATE](state, str) {
    Vue.set(
      state.msgpFormData,
      'submittedDateFrom',
      str,
    );
  },
  [types.SET_MSGP_END_DATE](state, str) {
    Vue.set(
      state.msgpFormData,
      'submittedDateTo',
      str,
    );
  },

  [types.SET_CGP_FACILITY_NAME](state, str) {
    Vue.set(
      state.cgpFormData,
      'facilityName',
      str,
    );
  },
  [types.SET_CGP_NPDESID](state, str) {
    Vue.set(
      state.cgpFormData,
      'npdesId',
      str,
    );
  },
  [types.SET_CGP_FACILITY_CITY](state, str) {
    Vue.set(
      state.cgpFormData,
      'facilityCity',
      str,
    );
  },
  [types.SET_CGP_FACILITY_STATE](state, str) {
    Vue.set(
      state.cgpFormData,
      'facilityState',
      str,
    );
  },
  [types.SET_CGP_FACILITY_ZIP](state, str) {
    Vue.set(
      state.cgpFormData,
      'facilityZip',
      str,
    );
  },
  [types.SET_CGP_STATUS](state, str) {
    Vue.set(
      state.cgpFormData,
      'status',
      str,
    );
  },
  [types.SET_CGP_FORM_TYPE](state, str) {
    Vue.set(
      state.cgpFormData,
      'formType',
      str,
    );
  },
  [types.SET_CGP_OPERATOR_NAME](state, str) {
    Vue.set(
      state.cgpFormData,
      'operatorName',
      str,
    );
  },
  [types.SET_CGP_DATE_SELECTION](state, str) {
    Vue.set(
      state.cgpFormData,
      'dateSelection',
      str,
    );
  },
  [types.SET_CGP_FACILITY_COUNTY](state, str) {
    Vue.set(
      state.cgpFormData,
      'facilityCounty',
      str,
    );
  },
  [types.SET_CGP_FEDERAL_INDICATOR](state, str) {
    Vue.set(
      state.cgpFormData,
      'federalIndicator',
      str,
    );
  },
  [types.SET_CGP_TRIBAL_INDICATOR](state, str) {
    Vue.set(
      state.cgpFormData,
      'tribalIndicator',
      str,
    );
  },
  [types.SET_CGP_TRIBAL_NAME](state, str) {
    Vue.set(
      state.cgpFormData,
      'tribalName',
      str,
    );
  },
  [types.SET_CGP_START_DATE](state, str) {
    Vue.set(
      state.cgpFormData,
      'submittedDateFrom',
      str,
    );
  },
  [types.SET_CGP_END_DATE](state, str) {
    Vue.set(
      state.cgpFormData,
      'submittedDateTo',
      str,
    );
  },



  [types.SET_FORM_OPTIONS_MSGP](state, arr) {
    Vue.set(
      state.formOptions,
      'msgpFormOptions',
      arr,
    );
  },
  [types.SET_FORM_OPTIONS_CGP](state, arr) {
    Vue.set(
      state.formOptions,
      'cgpFormOptions',
      arr,
    );
  },
  [types.SET_BASE_FORM_OPTIONS](state, arr) {
    Vue.set(
      state.formOptions,
      'baseFormOptions',
      arr,
    );
  },
  [types.SET_BASE_FORM_OPTION_STATE_NAMES](state, arr) {
    Vue.set(
      state.formOptions.baseFormOptions,
      'stateNames',
      arr,
    );
  },
  [types.SET_BASE_FORM_OPTION_SECTOR_NAMES](state, arr) {
    Vue.set(
      state.formOptions.baseFormOptions,
      'sectorNames',
      arr,
    );
  },
  [types.SET_BASE_FORM_OPTION_TRIAL_NAMES](state, arr) {
    Vue.set(
      state.formOptions.baseFormOptions,
      'tribalNames',
      arr,
    );
  },
  [types.SET_MSGP_RESPONSE](state, arr) {
    Vue.set(
      state,
      'msgpFormResults',
      arr,
    );
  },
  [types.SET_MSGP_RESULTS_LOADED](state, bool) {
    Vue.set(
      state,
      'msgpResultsLoaded',
      bool,
    );
  },

};
