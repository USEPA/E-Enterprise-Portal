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
  [types.TERMS_AND_CONDITIONS_COOKIE](state) {
    Vue.set(
      state.user,
      'termsAndConditionsCookie',
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
      'organizations',
      obj.field_organization);
    Vue.set(state.user,
      'roles',
      obj.field_role);
    Vue.set(state.user,
      'userFavoriteLocation',
        obj.field_userfavoritelocations);
    Vue.set(state.user,
      'userLocationsFromLoad',
      obj.field_userlocation);
  },
  [types.SET_USER_OBJECT_ORGANIZATIONS](state, obj) {
    Vue.set(state.user.userObject,
      'field_organization',
      obj);
  },
  [types.SET_USER_OBJECT_ROLES](state, obj) {
    Vue.set(state.user.userObject,
      'field_role',
      obj);
  },
  [types.SET_USER_OBJECT_USERLOCATIONS](state, obj) {
    Vue.set(state.user.userObject,
      'field_userlocation',
      obj);
  },
  [types.SET_USER_OBJECT_USERFAVORITELOCATIONS](state, obj) {
    Vue.set(state.user.userObject,
      'field_userfavoritelocations',
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
      'isAfterInputDropdownDisplayed',
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
    console.log(newLocation);
    state.user.userLocationsFromLoad.push(newLocation);
  },
  [types.DELETE_USER_SELECTED_LOCATION](state, deletedSelection) {
    // Filter the array with the location that they want deleted
    let filteredLocations = [];

    state.user.userLocationsFromLoad.forEach(function(location){
      if(parseInt(location.second) !== parseInt(deletedSelection.second)
          && location.first.trim !== deletedSelection.first.trim() ||
          parseInt(location.second) === parseInt(deletedSelection.second)
          && location.first.trim() !== deletedSelection.first.trim()){
        filteredLocations.push(location);
      }
    })
    // Save back to state
    Vue.set(state.user,
      'userLocationsFromLoad',
      filteredLocations);
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
      'isMainInputDisplayed',
      css_prop);
  },
  [types.ITERATE_FIRST_TIME_SELECT_BUTTON](state, amount) {
    state.user.firstTimeSelectButtonClicked += amount;
  },
  [types.IS_CURRENT_DROPDOWN_ZIPCODE_WITH_TRIBES](state, choice){
    Vue.set(state.user,
      'isCurrentDropdownZipcodeWithTribes',
      choice);
  },
  [types.SET_EXTEND_SESSION_MESSAGE](state, message){
    Vue.set(state.user,
      'extendSessionModalMessage',
      message);
  },
  [types.SET_DISPLAY_LOGIN_AGAIN_BUTTON_ON_MODAL](state, css_prop){
    Vue.set(state.user,
      'displayLoginAgainButtonOnModal',
      css_prop);
  },
  [types.SET_TRIBES_ARRAY](state, obj){
    Vue.set(state.user,
      'tribesArray',
      obj);
  },
  [types.SET_DISPLAY_NEW_LOCATION](state, display){
    Vue.set(state.user,
      'displayNewLocation',
      display);
  },
  [types.SET_USER_FAV_LOCATION](state, userFavLocation){
    console.log('hit here');
    Vue.set(state.user,
      'userFavoriteLocation',
      userFavLocation);
  },
};
