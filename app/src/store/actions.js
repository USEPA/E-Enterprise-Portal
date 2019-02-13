import _ from 'lodash';
import VueCookie from 'vue-cookie';
import Vue from 'vue';
import { AppAxios } from '../modules/wadk/WADK';
import { EventBus } from '../EventBus';
import types from './types';
import router from '../router';

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
    let url = store.getters.getApiUrl('locationSearch');

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
        let url = store.getters.getApiUrl('geolocationSearch');
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
    Vue.cookie.set('Token', false, {expires: '-99s'});
    Vue.cookie.set('uid', false, {expires: '-99s'});
    Vue.cookie.set('userLoggedIn', false, {expires: '-99s'});

    store.commit('IS_USER_LOGGED_IN', false);

    // Reset login token and time
    store.commit(types.SET_LOGGED_IN_TOKEN, '');
    store.commit(types.SET_LOGGED_IN_TIME, '');

    // Use router.push here to get rid of the token in the redirect URL
    router.push('/');
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
  EEPBasicPagesToState(context){
    const store = context;
    // gets drupal object
    AppAxios.get( store.getters.getEnvironmentApiURL + '/api/basic_pages?_format=json', {
      headers: store.getters.getGETHeaders,
    })
      .then(response => {
        if(response.data){
          store.commit('SET_BASIC_PAGES', response.data);
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
  /**
   * General API GET request function
   * Accepts URL path to the API and the element you're displaying data in.
   * Input params are an array [ , ]
   */
  EEPAPIGET(context, URL){
    const store = context;

    // gets drupal object
    AppAxios.get( URL, {
      headers: store.GETHeaders,
    }).then(response => {
        if(response.data){
          return response;
        }
        else {
          console.warn('abnormal response type')
        }
      })
      .catch(error =>{
        if(error.response) {
          console.error(error);
        }
        else {
          console.warn('abnormal error response type')
        }
      });
  },
  handleLogin(context){
    // Declare function variables
    const store = context;

    // Do ajax call to get the correct terms for the Authentication Category Taxonomy
    AppAxios.get(store.getters.getEnvironmentApiURL + '/api/authentication_category_taxonomy_terms',{
        headers: store.getters.getGETHeaders,
    }).then(response => {
        // Declare variables
        let formatted_option_array = [];

        // Ajax call to retrieve all of the Login information from /api/authentication-category-options
        AppAxios.get(store.getters.getEnvironmentApiURL +'/api/authentication-category-options', {
            headers: store.getters.getGETHeaders,
        }).then(response_inner => {

            // Loop through response and match each taxonomy up with each authentication option
            response_inner.data.forEach((resp_item) => {
                let associated_taxonomy_weight = response.data.find(x => x.tid[0].value ===
                resp_item.field_authentication_category[0].target_id).weight[0].value;

                // save each option to the formatted array variable to pass to mutation
                formatted_option_array.push({
                    'weight': associated_taxonomy_weight,
                    'tab_order': resp_item.field_tab_order[0].value,
                    'data': resp_item});
            });

            formatted_option_array.sort(function (a, b) {
                return a.weight - b.weight || a.tab_order - b.tab_order;
            });

            // Commit formatted array to the store
            store.commit('SET_LOGIN_VIEW_ACCOUNTS', formatted_option_array);

        }).catch(error =>{
            console.error(error.response);
        });
    }).catch(error => {
        console.error(error.response);
    });
  },
  extendSession(context, payload){
      const store = context;
      const {vm} = payload;

      // Cookie information from the store
      const COOKIE_EXPIRATION_TIME = store.getters.getCookieInfo.time
          + store.getters.getCookieInfo.time_units;

      Vue.cookie.set('userLoggedIn', true, {expires: COOKIE_EXPIRATION_TIME});
      Vue.cookie.set('uid', store.getters.getUser.id, {expires: COOKIE_EXPIRATION_TIME});
      Vue.cookie.set('Token', store.getters.getLoggedInToken, {expires: COOKIE_EXPIRATION_TIME});

      store.commit(types.SET_LOGGED_IN_TIME, new Date());

      // Close modal
      vm.$root.$emit(
        'bv::hide::modal',
        'cookie_modal',
        vm.$refs.cookie_modal
      );
  },
  getEEPConfigs(context, payload){
      const store = context;
      const {vm} = payload;

      // Axios call the get all of the configs from drupal
      AppAxios.get(store.getters.getEnvironmentApiURL + '/eep/configurations', {
          headers: store.getters.getGETHeaders,
      }).then(response => {

          // Set the cookie information in the store
          store.commit(types.SET_COOKIE, {
              time: response.data.eepcookieconfig.cookie_expiration_time,
              time_units: response.data.eepcookieconfig.cookie_time_units
          });

          // do log in stuff here
          // Declare the main url that the page is currently on
          const main_url = window.location.href;

          if (main_url.indexOf("token") > -1 && main_url.indexOf("uid") > -1) {
              // Declare variables
              let vars = {};
              // Extracts the URL params
              // Got this functionality from https://html-online.com/articles/get-url-parameters-javascript/
              let parts = main_url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                  vars[key] = value;
              });
              // find the URL params for each one
              const token = vars["token"];
              const uid = vars["uid"];

              // Grabs the static cookie time from the store
              const COOKIE_EXPIRATION_TIME = store.getters.getCookieInfo.time + store.getters.getCookieInfo.time_units;

              // Set another cookie saying they logged in
              Vue.cookie.set('userLoggedIn', true, {expires: COOKIE_EXPIRATION_TIME});
              // set user token in cookie
              Vue.cookie.set('Token', token, {expires: COOKIE_EXPIRATION_TIME});
              Vue.cookie.set('uid', uid, {expires: COOKIE_EXPIRATION_TIME});

              // Set login time and token in the store
              store.commit(types.SET_LOGGED_IN_TOKEN, token);
              store.commit(types.SET_LOGGED_IN_TIME, new Date());

              // Set user id in the store
              store.commit(types.SET_UID, uid);

              // Log user in
              store.commit(types.IS_USER_LOGGED_IN, true);

              // Set interval instance
              let cookie_check = setInterval(function(){
                  // Comparing dates to find when there is a minute left until cookie expiration
                  let minutes_difference = 0;

                  if(!Vue.cookie.get('userLoggedIn')){
                      store.dispatch('userLogOut');
                  }else{
                      if(!!store.getters.getLogInTime){
                          minutes_difference = Math.floor((Math.abs(new Date((store.getters.getLogInTime.getTime() +
                                      ((store.getters.getCookieInfo.time) * 60 * 1000))) - (new Date)) / 1000) / 60) % 60;
                      }else{
                          clearInterval(cookie_check);
                      }

                      // Check to see if there is a minute left
                      if(minutes_difference <= 1 && store.getters.getDisplayLoggedInElements){
                          store.commit(types.TIME_LEFT_UNTIL_LOG_OUT, 1);
                          vm.$root.$emit(
                              'bv::show::modal',
                              'cookie_modal',
                              vm.$refs.cookie_modal
                          );
                      }
                  }
              }, 5000);
          }else{
              if(Vue.cookie.get('userLoggedIn')){
                  // Log user in and set user name
                  store.commit('IS_USER_LOGGED_IN', true);
                  store.commit(types.SET_UID, Vue.cookie.get('uid'));
              }
          }

          if (Vue.cookie.get('userLoggedIn')) {
              AppAxios.get(`${store.getters.getEnvironmentApiURL}/user/${Vue.cookie.get('uid')}?_format=json`, {
                  headers: { Authorization: `Bearer ${Vue.cookie.get('Token')}` },
              }).then((response) => {
                  store.commit('SET_USER_OBJECT', response.data);
              }).catch((error) => {
                  console.warn(error);
              });
          }

          //  [App.vue specific] When App.vue is finish loading finish the progress bar
          vm.$Progress.finish();
          if(window.location.href.indexOf("token") > -1) {
              router.push('/workbench');
          }

      }).catch(error => {
          console.error(error);
      });
  },
  populateDropdownForUserInput(context, userInput){
      const store = context;
      let endpoint = '';
      let rest_of_url_with_params;


     if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(userInput)){
          console.log("zipcode: " + userInput);
      }else{
          // if city and state

          if(userInput.indexOf(',') > -1){
              endpoint = store.getters.getApiUrl('userLocationLookupByCityState');
              let city_and_state = userInput.split(",");
              let city = city_and_state[0].toUpperCase().trim();
              let state = city_and_state[1].toUpperCase().trim();
              rest_of_url_with_params = '?where=UPPER%28NAME_LABEL%29%3D%27'+
                  city+'%2C+'+
                  state+'%27&outFields=*&orderByFields=ZCTA&f=pjson';
          }
      }

      // Axios request down here after the url is built


      AppAxios.get(endpoint + rest_of_url_with_params, {
          headers: store.getters.getGETHeaders,
      }).then((response) => {
          console.log(response.data);
      }).catch((error) => {
          console.log(error);
      });
  },
};
