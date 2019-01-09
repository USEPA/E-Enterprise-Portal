import Vue from 'vue';
import _ from 'lodash';
import types from './types';
import { EventBus } from '../EventBus';

export default {
  [types.DECODE_JWT_TOKEN](state, token) {
    // Decode the "Header, Payload, Signature" of the complete JWT token
    if (token) {
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
    } else {
      console.warn('Invalid JWT Passed');
    }
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
  [types.TOGGLE_HAS_LOCATION_SEARCH_BAR](state, isLocationSearchBarEnabled = null) {
    const isEnabled = (state.ui.hasLocationSearch == null)
      ? !state.ui.hasLocationSearch
      : isLocationSearchBarEnabled;
    Vue.set(
      state.ui,
      'hasLocationSearch',
      isEnabled,
    );
  },
  [types.SET_USER_LOCATION](state, obj) {
    Vue.set(
      state.user,
      'location',
      obj,
    );
    EventBus.$emit('locationService::update');
  },
  [types.USER_LOG_IN](state) {
    Vue.set(
      state.user,
      'isLoggedIn',
      true,
    );
  },
  [types.USER_LOG_OUT](state) {
    Vue.set(
      state.user,
      'isLoggedIn',
      false,
    );
  },
  [types.USER_TANDC_COOKIE_DISMISS](state) {
    Vue.set(
      state.user,
      'tAndCCookieDismiss',
      true,
    );
  },
  [types.USER_POLICY_COOKIE_DISMISS](state) {
    Vue.set(
      state.user,
      'UserPolicyCookieDismiss',
      true,
    );
  },
  [types.SET_MARGIN_TOP_NAV](state, obj) {
    state.navMargin = obj;
  },
  [types.SET_USERNAME](state, obj) {
    Vue.set(state.user,
      'userName',
      obj);
  },
  [types.SET_USER_OBJECT](state, obj) {
    Vue.set(state.user,
      'userObject',
      obj);
  },
  [types.SET_USER_OBJECT_FAV_LINKS](state, obj) {
    Vue.set(state.user.userObject,
      'field_favorite_links',
      obj);
  },
  [types.SET_BASIC_PAGES](state, obj) {
    Vue.set(state.basicPages,
      'pagesArray',
      obj);
  },
};
