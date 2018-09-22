import Vue from 'vue';
import _ from 'lodash';
import types from './types';


export default {
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
};
