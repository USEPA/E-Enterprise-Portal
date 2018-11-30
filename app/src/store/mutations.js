import Vue from 'vue';
import _ from 'lodash';
import types from './types';

export default {
  [types.DECODE_JWT_TOKEN](state, token) {
    // Decode the "Header, Payload, Signature"
    const tokenParts = token.split('.');
    const decodedTokenParts = tokenParts.map((part, index) => {
      let decodedString = part;
      if (index < 2) {
        try {
          decodedString = atob(part);
        } catch (e) {
          console.warn(e);
        }
      }
      return decodedString;
    });
    Vue.set(
      state.token,
      'decoded',
      {
        header: JSON.parse(decodedTokenParts[0]),
        payload: JSON.parse(decodedTokenParts[1]),
        signature: decodedTokenParts[2],
      },
    );
    // @todo validate JWT signature and authenticate user

    Vue.set(
      state.user,
      'authenticated',
      true,
    );
  },
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
  [types.SET_JWT_TOKEN](state, token) {
    Vue.set(
      state.token,
      'raw',
      token,
    );
  },
  [types.SET_USER_LOCATION](state, obj) {
    Vue.set(
      state.user,
      'location',
      obj,
    );
  },
};
