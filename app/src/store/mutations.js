import Vue from 'vue';
import _ from 'lodash';
import types from './types';
import { commonAppStore } from '../modules/wadk/WADK';


export default {
  ...commonAppStore.mutations,
  [types.SET_APP](state, obj) {
    Vue.set(
      state,
      'app',
      obj,
    );
  },
  [types.SET_DEEP_PROPERTY](state, obj) {
    Vue.set(
      _.get(state, obj.path),
      obj.property,
      obj.value || obj.defaultValue,
    );
  },
  [types.SET_USER_LOCATION](state, obj) {
    if (obj.zipcode && obj.zipcode.length > 1) {
      Vue.set(
        state,
        'zipcodes',
        obj,
      );
    }
    if (obj.city && obj.city.length > 1) {

    }
    if (obj.state && obj.state.length > 1) {

    }

  },

};
