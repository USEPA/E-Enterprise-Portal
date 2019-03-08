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

  [types.SET_CITY_NAME](state, str) {
    Vue.set(
      state, // <- state value to change
      'cityName', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_STATE_TERRITORY](state, str) {
    Vue.set(
      state, // <- state value to change
      'stateTerritory', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },

  [types.SET_ZIP](state, str) {
    Vue.set(
      state, // <- state value to change
      'zip', // <- the name of the property on the object the line above
      str, // <- new value to set on that property
    );
  },


};
