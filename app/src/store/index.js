/**
 * Default boiler plate code required to create the Vuex store.
 */

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const namespaced = true;

// @todo: This file is a repeat of store.js and should be deleted and code refactored
export default {
  namespaced,
  state,
  actions,
  getters,
  mutations,
};
