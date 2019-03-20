import Vue from 'vue';
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
  [types.SET_LAYOUT](state, obj) {
    Vue.set(
      state,
      'layout',
      obj,
    );
  },
  [types.PUSH_DIRECT_LINKS_REGISTRATION](state, registration) {
    Vue.set(
      state.directLinkMappings,
      registration.id,
      registration.direct_links,
    );
  },
};
