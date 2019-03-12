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
    // synchronise changes to the state of the store

    // Example of how to change properties on the state object
    Vue.set(
      state, // <- state value to change
      'permitType', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },
  [types.SET_FACILITY_NAME](state, str) {
    Vue.set(
      state, // <- state value to change
      'facilityName', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_NPDESID](state, str) {
    Vue.set(
      state, // <- state value to change
      'NPDESID', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_FACILITY_CITY](state, str) {
    Vue.set(
      state, // <- state value to change
      'facilityCity', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_MSGP_FACILITY_STATE](state, str) {
    Vue.set(
      state.msgpFormData, // <- state value to change
      'facilityState', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_FACILITY_ZIP](state, str) {
    Vue.set(
      state, // <- state value to change
      'facilityZip', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_STATUS](state, str) {
    Vue.set(
      state, // <- state value to change
      'status', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_FORM_TYPE](state, str) {
    Vue.set(
      state, // <- state value to change
      'formType', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_OPERATOR_NAME](state, str) {
    Vue.set(
      state, // <- state value to change
      'operatorName', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_FEDERAL_INDICATOR](state, str) {
    Vue.set(
      state, // <- state value to change
      'federalFacility', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_DATE_SELECTION](state, str) {
    Vue.set(
      state, // <- state value to change
      'dateSelection', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_START_DATE](state, str) {
    Vue.set(
      state, // <- state value to change
      'submittedDateFrom', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_END_DATE](state, str) {
    Vue.set(
      state, // <- state value to change
      'submittedDateTo', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_TRIBAL_INDICATOR](state, str) {
    Vue.set(
      state, // <- state value to change
      'tribalIndicator', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_TRIBE_SELECTION](state, str) {
    Vue.set(
      state, // <- state value to change
      'tribeSelection', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_FACILITY_COUNTY](state, str) {
    Vue.set(
      state, // <- state value to change
      'facilityCounty', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_MASTER_PERMIT_NUMBER](state, str) {
    Vue.set(
      state, // <- state value to change
      'masterPermitNumber', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_TRIBAL_NAME](state, str) {
    Vue.set(
      state, // <- state value to change
      'tribalName', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_ISSUER](state, str) {
    Vue.set(
      state, // <- state value to change
      'issuer', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_SUBMISSION_TYPE](state, str) {
    Vue.set(
      state, // <- state value to change
      'submissionType', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_COVERAGE_TYPE](state, str) {
    Vue.set(
      state, // <- state value to change
      'coverageType', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_COVERAGE_STATUS](state, str) {
    Vue.set(
      state, // <- state value to change
      'coverageStatus', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_MSGP_SECTOR](state, str) {
    Vue.set(
      state.msgpFormData, // <- state value to change
      'sector', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_SUBSECTOR](state, str) {
    Vue.set(
      state, // <- state value to change
      'subsector', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_SIC_CODE](state, str) {
    Vue.set(
      state, // <- state value to change
      'sicCode', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_ADDRESS](state, str) {
    Vue.set(
      state, // <- state value to change
      'address', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_FORM_OPTIONS_MSGP](state, arr) {
    Vue.set(
      state.formOptions, // <- state value to change
      'msgpFormOptions', // <- the name of the property on the object the line above
      arr, // <- new value to set on that property
    );
  },

  [types.SET_FORM_OPTIONS_CGP](state, arr) {
    Vue.set(
      state.formOptions, // <- state value to change
      'cgpFormOptions', // <- the name of the property on the object the line above
      arr, // <- new value to set on that property
    );
  },

  [types.SET_BASE_FORM_OPTIONS](state, arr) {
    Vue.set(
      state.formOptions, // <- state value to change
      'baseFormOptions', // <- the name of the property on the object the line above
      arr, // <- new value to set on that property
    );
  },

  [types.SET_BASE_FORM_OPTION_STATE_NAMES](state, arr) {
    Vue.set(
      state.formOptions.baseFormOptions, // <- state value to change
      'stateNames', // <- the name of the property on the object the line above
      arr, // <- new value to set on that property
    );
  },

  [types.SET_BASE_FORM_OPTION_SECTOR_NAMES](state, arr) {
    Vue.set(
      state.formOptions.baseFormOptions, // <- state value to change
      'sectorNames', // <- the name of the property on the object the line above
      arr, // <- new value to set on that property
    );
  },

  [types.SET_MSGP_RESPONSE](state, arr) {
    Vue.set(
      state, // <- state value to change
      'msgpFormResults', // <- the name of the property on the object the line above
      arr, // <- new value to set on that property
    );
  },

  [types.SET_MSGP_STATE_SELECTED](state, bool) {
    Vue.set(
      state, // <- state value to change
      'msgpStateSelected', // <- the name of the property on the object the line above
      bool, // <- new value to set on that property
    );
  },

  [types.SET_MSGP_RESULTS_LOADED](state, bool) {
    Vue.set(
      state, // <- state value to change
      'msgpResultsLoaded', // <- the name of the property on the object the line above
      bool, // <- new value to set on that property
    );
  },

};
