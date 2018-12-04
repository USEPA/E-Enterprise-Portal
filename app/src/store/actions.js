import Vue from 'vue';
import { AppAxios, commonAppStore } from '../modules/wadk/WADK';
import { EventBus } from '../EventBus';
import types from './types';
import _ from 'lodash';

export default {
  ...commonAppStore.actions,
  createLocationRequest(context, location) {
    // Variable declerations
    const store = context;
    const userLocation = {
      zipcode: '',
      city: '',
      state: '',
    };
    const app = store.rootGetters.getApp;
    let url = store.getters.getLocationSearchURL;

    // Input validation for URL formation
    if (/^\d{5}(-\d{4})?$/.test(location)) {
      url += `zipcode=${location}`;
      // @todo clean string/trim
      userLocation.zipcode = location.trim();
    } else if (/([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/.test(location)
      || /([A-Za-z]+(?: [A-Za-z]+)*),?([A-Za-z]{2})/.test(location)) {
      const decoupled_location = location.split(',');
      const city = decoupled_location[0].toUpperCase().trim();
      const state = decoupled_location[1].toUpperCase().trim();
      url += `city=${
        city
        }&state=${state}`;
      userLocation.city = city.trim();
      userLocation.state = state.trim();
    }

    // Make the request to retrieve the correct location information
    AppAxios.get(url).then((response) => {
      const { data } = response;
      EventBus.$emit('locationSearch::showUserConfirmationModal', {
        callee: this,
        value: data,
      });
    });
  },
  // Set a function to initialize JWT for user authentication
  initializeToken(context) {
    // Get Token (if exist)
    const store = context;
    const queryParams = window.location.search.substr(1).split('&');

    // Parse query for token ie 'move=true'
    const tokenResult = queryParams.map((paramString) => {
      if (paramString.search(/^token=/igm) > -1) {
        const token = paramString.split('=').pop();
        return token;
      }
    });
    const token = tokenResult.pop();

    // Place in store
    store.commit(types.SET_JWT_TOKEN, token);
    // Process the token (decode)
    store.commit(types.DECODE_JWT_TOKEN, token);
    // @todo confirm user token
    store.dispatch('processJWTPayload');
    // if user is legit, log them in (add IF statement)
    store.commit('USER_LOG_IN');
  },
  userLogOut(context) {
    const store = context;

    // add additional logout logic here
    store.commit('USER_LOG_OUT');
  },
  //Function to prcoess the payload of the JWT token, which contains the user
  // info. This will set the state, verify the path exists and is definedm then
  // decode the payload and split into parts for processing
  processJWTPayload(context) {
    const store = context;
    const tokenPayload = store.state.token.decoded.payload;
    // Sanity Check: confirm payload makes sense (path exists)
    const exist = _.get(store, tokenPayload.path);
    if (exist !== undefined) {
      // Split the path, handle empty string case, handle deep property case
      const pathParts = tokenPayload.path.split('.');
      // don't need 'state' part of the path, so we shift it off
      pathParts.shift();
      const payloadProperty = pathParts.pop();
      const payloadPath = pathParts.join('.');

      const payload = {
        path: payloadPath,
        property: payloadProperty,
        value: tokenPayload.value,
        defaultValue: null,
      };

      // if deep property
      store.commit('SET_DEEP_PROPERTY', payload);
    }
  },
};
