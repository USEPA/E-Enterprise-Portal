import Vue from 'vue';
import _ from 'lodash';
import types from './types';

export default {
  [types.DECODE_JWT_TOKEN](state, token) {
    // Decode the "Header, Payload, Signature" of the complete JWT token
    const tokenParts = token.split('.');
    const decodedTokenParts = tokenParts.map((part, index) => {
      let decodedString = part;
      if (index < 2) {
        try {
          decodedString = atob(part);
        }
        catch (e) {
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
  // Checks if path is already set, if not, uses lodash 'get' to get path
  [types.SET_DEEP_PROPERTY](state, payload) {
    const rootObject = (payload.path) ? _.get(state, payload.path) : state;
    Vue.set(
      rootObject,
      payload.property,
      payload.value || payload.defaultValue,
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
  [types.USER_LOG_IN](state) {
    Vue.set(
      state.user,
      'authentication',
      true,
    );
  },
  [types.USER_LOG_OUT](state) {
    Vue.set(
      state.user,
      'authentication',
      false,
    );
  }
};
