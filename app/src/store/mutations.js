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
    Vue.set(
      state,
      'navMargin',
      obj,
    );
  },
  [types.SET_USER_OBJECT](state, obj) {
    const name = obj.name[0].value;
    const {init} = obj;
    let {mail} = state.user;
    if (obj.mail[0]) {
      mail = obj.mail[0].value;
    }
    const favoriteLinks = obj.field_favorite_links;
    const loaded = true;
    const organization = obj.field_organization;
    const role = obj.field_role;
    const userlocation = obj.field_userlocation;

    Vue.set(state.user,
      'name',
      name);
    Vue.set(state.user,
      'mail',
      mail);
    Vue.set(state.user,
      'favoriteLinks',
      favoriteLinks);
    Vue.set(state.user,
      'loaded',
      loaded);
    Vue.set(state.user,
      'init',
      init);
    Vue.set(state.user,
      'organization',
      organization);
    Vue.set(state.user,
      'role',
      role);
    Vue.set(state.user,
      'userlocation',
      userlocation);
  },
  [types.SET_USER_OBJECT_ORGANIZATION](state, obj) {
    Vue.set(state.user.userObject,
      'field_organization',
      obj);
  },
  [types.SET_USER_OBJECT_ROLE](state, obj) {
    Vue.set(state.user.userObject,
      'field_role',
      obj);
  },
  [types.SET_USER_OBJECT_USERLOCATION](state, obj) {
    Vue.set(state.user.userObject,
      'field_userlocation',
      obj);
  },

  [types.SET_BASIC_PAGES](state, arr) {
    Vue.set(state.basicPages,
      'pagesArray',
      arr);
  },
  [types.SET_BRIDGE_URN](state, obj) {
    Vue.set(
      state,
      'currentBridgeUrn',
      obj,
    );
  },
  [types.SET_LOGIN_VIEW_ACCOUNTS](state, obj) {
    Vue.set(
      state,
      'loginViewAccounts',
      obj,
    );
  },
  [types.SET_UID](state, int) {
    Vue.set(
      state.user,
      'id',
      int,
    );
  },
  [types.IS_USER_LOGGED_IN](state, IsLoggedIn) {
    Vue.set(state.user,
      'isLoggedIn',
      IsLoggedIn);
  },
  [types.SET_LOGGED_IN_TOKEN](state, token) {
    Vue.set(state.token,
      'raw',
      token);
  },
  [types.SET_LOGGED_IN_TIME](state, time) {
    Vue.set(state.user,
      'loggedInTime',
      time);
  },
  [types.TIME_LEFT_UNTIL_LOG_OUT](state, timeAmount) {
    Vue.set(state.user,
      'timeLeftUntilLogout',
      timeAmount);
  },
  [types.SET_COOKIE](state, obj) {
    Vue.set(state.user,
      'cookie',
      obj);
  },
  [types.SET_OPTIONS_AFTER_INPUT](state, obj) {
    Vue.set(state.user,
      'optionsAfterInput',
      obj);
  },
  [types.SET_IS_AFTER_INPUT_DROPDOWN_DISPLAYED](state, isDisplayed) {
    Vue.set(state.user,
      'IsAfterInputDropdownDisplayed',
      isDisplayed);
  },
  [types.SET_INPUT_BOX_TEXT](state, newText) {
    Vue.set(state.user,
      'inputBoxText',
      newText);
  },
  [types.SET_DEEP_LINK](state, deepLink) {
    Vue.set(
      state,
      'deepLink',
      deepLink,
    );
  },
  [types.SET_DROPDOWN_SELECTION](state, dropdownSelection) {
    Vue.set(state.user,
      'dropDownSelection',
      dropdownSelection);
  },
  [types.SAVE_USER_SELECTED_LOCATIONS](state, newLocation) {
    state.user.userSavedLocations.push(newLocation);
  },
  [types.DELETE_USER_SELECTED_LOCATION](state, deletedSelection) {
    // Filter the array with the location that they want deleted
    const filteredLocation = state.user.userSavedLocations
      .filter(location => location.typed_in_location !== deletedSelection.typed_in_location
        && location.selected_location_from_dropdown !== deletedSelection.selected_location_from_dropdown);

    // Save back to state
    Vue.set(state.user,
      'userSavedLocations',
      filteredLocation);
  },
  [types.SET_DISPLAY_WHEN_LOCATION_IS_CLICKED](state, css_prop) {
    Vue.set(state.user,
      'displayWhenNewLocationIsClicked',
      css_prop);
  },
  [types.SET_DROPDOWN_LABEL](state, newText) {
    Vue.set(state.user,
      'dropDownLabel',
      newText);
  },
  [types.SET_IS_MAIN_INPUT_DISPLAYED](state, css_prop) {
    Vue.set(state.user,
      'IsMainInputDisplayed',
      css_prop);
  },
  [types.ITERATE_FIRST_TIME_SELECT_BUTTON](state, amount) {
    state.user.firstTimeSelectButtonClicked += amount;
  },
};
