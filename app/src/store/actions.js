import _ from 'lodash';
import VueCookie from 'vue-cookie';
import Vue from 'vue';
import { AppAxios } from '../modules/wadk/WADK';
import { EventBus } from '../EventBus';
import types from './types';

Vue.use(VueCookie);

export default {
  /**
   * Creates a request to the EEP API for the location search, either using the
   * zipcode or city and state. After a results is returned, it will fire the
   * user modal for confirmation if needed.
   *
   * @param context
   * @param location
   */
  createLocationRequest(context, location) {
    // Variable declerations
    const store = context;
    const userLocation = {
      zipcode: '',
      city: '',
      state: '',
    };
    let url = store.getters.getURL('locationSearch');

    // Input validation for URL formation
    if (/^\d{5}(-\d{4})?$/.test(location)) {
      url += `?zipcode=${location}`;
      // @todo clean string/trim
      userLocation.zipcode = location.trim();
    } else if (/([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/.test(location)
      || /([A-Za-z]+(?: [A-Za-z]+)*),?([A-Za-z]{2})/.test(location)) {
      const decoupledLocation = location.split(',');
      const city = decoupledLocation[0].toUpperCase().trim();
      const state = decoupledLocation[1].toUpperCase().trim();
      url += `?city=${city}&state=${state}`;
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
  /**
   * Creates the EEP2 API request for the location based ont the browsers
   * geolocation API.
   * @param context
   */
  createGeolocationRequest(context) {
    // Make the request to retrieve the correct location information
    const store = context;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let url = store.getters.getURL('geolocationSearch');
        url = `${url}?f=pjson&location=${position.coords.longitude},${position.coords.latitude}`;
        AppAxios.get(url).then((response) => {
          const { data } = response;

          // Simple sanity check before committing the change to the store
          if (data.address) {
            store.commit('SET_USER_LOCATION', {
              zipcode: data.address.Postal,
              city: data.address.City,
              state: data.address.Region,
            });
          }
        }, (error) => {
          let message = '';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'User denied the request for Geolocation.';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              message = 'The request to get user location timed out.';
              break;
            default:
              message = 'An unknown error occurred.';
          }
          console.warn(message);
        });
      });
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  },
  /**
   * Used to toggle the value that is watched to determine whether the location
   * search bar is visable.
   *
   * @param context
   */
  toggleLocationSearchBar(context) {
    const store = context;
    store.commit('TOGGLE_HAS_LOCATION_SEARCH_BAR');
  },
  userLogOut(context) {
    const store = context;

    // add additional logout logic here
    Vue.cookie.set('userLoggedIn', false, {expires: '-99s'});
    store.commit('USER_LOG_OUT');
    location.reload();
  },
  // Function to process the payload of the JWT token, which contains the user
  // info. This will set the state, verify the path exists and is defined then
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
  setTAndCCookie(context) {
    const store = context;
    Vue.cookie.set('userTandC', true, { expires: '1Y' });
    store.commit('USER_TANDC_COOKIE_DISMISS');
  },
  setUserPolicyCookie(context) {
    const store = context;
    Vue.cookie.set('userPolicy', true, { expires: '1Y' });
    store.commit('USER_POLICY_COOKIE_DISMISS');
  },
  setUserObject(context, userObject) {
    const store = context;
    store.commit('SET_USER_OBJECT', userObject);
  },
  setUserObjectFavLinks(context, userObjectFavLinks) {
    const store = context;
    store.commit('SET_USER_OBJECT_FAV_LINKS', userObjectFavLinks);
  },
  /**
   * API GET request function
   * Stores basic pages from Drupal in state
   */
  drupalBasicPagesToState(context){
    const store = context;

    // gets drupal object
    AppAxios.get( 'http://e-enterprise/api/basic_pages?_format=json', {
      headers: store.GETHeaders,
    })
      .then(response => {
        if(response.data){
          const responseToObject = response.data;
          store.commit('SET_BASIC_PAGES', responseToObject);
        }
        else {
          console.warn('abnormal response type');
        }
      })
      .catch(error =>{
        if(error.response) {
          const errorHeaders = error.response.headers;
          const errorData = error.response.data;
          console.warn('Headers: ' + errorHeaders +
          '\n' + 'Message: ' + errorData);
        }
        else {
          console.warn('abnormal error response type');
        }
      });
  },
  navigateToBridge(context, urn){

    // Declare store
    const store = context;

    // Set URN in the state so that the URN in the bridge URL getter is set
    store.commit('SET_BRIDGE_URN', urn);

    // Redirect to the bridge login for a given urn
    window.location = store.getters.getBridgeURL;

  },
};
