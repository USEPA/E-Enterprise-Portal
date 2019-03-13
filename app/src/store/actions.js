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

    // Reset the cookies
    Vue.cookie.set('Token', false, { expires: '-99s' });
    Vue.cookie.set('uid', false, { expires: '-99s' });
    Vue.cookie.set('userLoggedIn', false, { expires: '-99s' });
    Vue.cookie.set('userLogInTime', '', { expires: '-99s' });

    // Redirect to backend
    if (store.state.user.id != 1) {
      window.location.href = `${store.getters.getEnvironmentApiURL}/authenticate/user/logout`;
    }
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
  onTermsAndConditions(context) {
    const store = context;
    Vue.cookie.set('userTandC', true, { expires: '1Y' });
    store.commit('USER_TANDC_COOKIE_DISMISS');
  },
  setUserPolicyCookie(context) {
    const store = context;
    Vue.cookie.set('userPolicy', true, { expires: '1Y' });
    store.commit('USER_POLICY_COOKIE_DISMISS');
  },
  /**
   * API GET request function
   * Stores basic pages from Drupal in state
   */
  EEPBasicPagesToState(context) {
    const store = context;
    // gets drupal object
    AppAxios.get(`${store.getters.getEnvironmentApiURL}/api/basic_pages?_format=json`, {
      headers: store.getters.getGETHeaders,
    })
      .then((response) => {
        if (response.data) {
          store.commit('SET_BASIC_PAGES', response.data);
        } else {
          console.warn('abnormal response type');
        }
      })
      .catch((error) => {
        if (error.response) {
          const errorHeaders = error.response.headers;
          const errorData = error.response.data;
          console.warn(`Headers: ${errorHeaders}\n Message: ${errorData}`);
        } else {
          console.warn('abnormal error response type');
        }
      });
  },
  navigateToBridge(context, urn) {
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
  EEPAPIGET(context, URL) {
    const store = context;

    // gets drupal object
    AppAxios.get(URL, {
      headers: store.GETHeaders,
    }).then((response) => {
      if (response.data) {
        return response;
      }
      console.warn('abnormal response type');
      return null;
    }).catch((error) => {
      if (error.response) {
        console.error(error);
      } else {
        console.warn('abnormal error response type');
      }
    });
  },
  handleLogin(context) {
    // Declare function variables
    const store = context;

    // Do ajax call to get the correct terms for the Authentication Category
    // Taxonomy
    AppAxios.get(store.getters.getEEPAPIURL({
      endpoint: store.getters.getApiUrl('taxonomyTerms'),
      params: '',
    }), {
      headers: store.getters.getGETHeaders,
    }).then((response) => {
      // Declare variables
      const formattedOption = [];

      // Ajax call to retrieve all of the Login information from
      // /api/authentication-category-options
      AppAxios.get(store.getters.getEEPAPIURL({
        endpoint: store.getters.getApiUrl('authenticationOptions'),
        params: '',
      }), {
        headers: store.getters.getGETHeaders,
      }).then((responseInner) => {
        // Loop through response and match each taxonomy up with each
        // authentication option
        responseInner.data.forEach((respItem) => {
          const associatedTaxonomyWeight = response.data.find(x => x.tid[0].value
            === respItem.field_authentication_category[0].target_id).weight[0].value;

          // save each option to the formatted array variable to pass to
          // mutation
          formattedOption.push({
            weight: associatedTaxonomyWeight,
            tab_order: respItem.field_tab_order[0].value,
            data: respItem,
          });
        });

        formattedOption.sort((a, b) => a.weight - b.weight || a.tab_order - b.tab_order);

        // Commit formatted array to the store
        store.commit('SET_LOGIN_VIEW_ACCOUNTS', formattedOption);
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
  },
  extendSession(context, payload) {
    const store = context;
    const { vm } = payload;

    // Cookie information from the store
    const COOKIE_EXPIRATION_TIME = store.getters.getUser.cookie.time
      + store.getters.getUser.cookie.time_units;

    Vue.cookie.set('userLoggedIn', true, { expires: COOKIE_EXPIRATION_TIME });
    Vue.cookie.set('uid', store.getters.getUser.id, { expires: COOKIE_EXPIRATION_TIME });
    Vue.cookie.set('Token', store.getters.getLoggedInToken, { expires: COOKIE_EXPIRATION_TIME });
    Vue.cookie.set('userLogInTime', new Date(), { expires: COOKIE_EXPIRATION_TIME });

    // Set timeout again to continously check the cookie
    store.dispatch('checkCookie', payload);

    // Close modal
    vm.$root.$emit(
      'bv::hide::modal',
      'cookieModal',
      vm.$refs.cookie_modal,
    );
  },
  getEEPConfigs(context, payload) {
    const store = context;
    const { vm } = payload;

    // Axios call the get all of the configs from drupal
    AppAxios.get(`${store.getters.getEnvironmentApiURL}/eep/configurations`, {
      headers: store.getters.getGETHeaders,
    }).then((response) => {
      // Set the cookie information in the store
      store.commit(types.SET_COOKIE, {
        time: response.data.eepcookieconfig.cookie_expiration_time,
        time_units: response.data.eepcookieconfig.cookie_time_units,
      });

      // Declare the main url that the page is currently on
      const currentUrl = window.location.href;

      if (currentUrl.indexOf('token') > -1 && currentUrl.indexOf('uid') > -1) {
        const vars = {};
        // https://html-online.com/articles/get-url-parameters-javascript/
        currentUrl.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
          vars[key] = value;
        });
        // find the URL params for each one
        const { token } = vars;
        const { uid } = vars;

        const { cookie } = store.getters.getUser;

        // Grabs the static cookie time from the store
        const cookieExpiration = cookie.time + cookie.time_units;

        // Set another cookie saying they logged in
        Vue.cookie.set('userLoggedIn', true, { expires: cookieExpiration });
        // set user token in cookie
        Vue.cookie.set('Token', token, { expires: cookieExpiration });
        Vue.cookie.set('uid', uid, { expires: cookieExpiration });
        Vue.cookie.set('userLogInTime', new Date(), { expires: cookieExpiration });

        // Set login time and token in the store
        store.commit(types.SET_LOGGED_IN_TOKEN, token);

        // Set user id in the store
        store.commit(types.SET_UID, uid);

        // Load EEPUser info and push to workbench if logging in
        store.dispatch('loadEEPUser').then(router.push('/workbench'));
      } else if (Vue.cookie.get('userLoggedIn')) {
        // Log user in and set user name
        store.commit('IS_USER_LOGGED_IN', true);
        store.commit(types.SET_UID, Vue.cookie.get('uid'));

        /**
         * Load EEPUser info and do not push to workbench if already logged in
         * unless loading homepage. This fixes footer links so they dont auto
         * redirect to workbench.
         */
        if (router.history.current.path === '/') {
            store.dispatch('loadEEPUser').then(router.push('/workbench'));
        } else {
            store.dispatch('loadEEPUser');
        }
      }
      store.dispatch('checkCookie', payload);
      //  [App.vue specific] When App.vue is finish loading finish the progress bar
      vm.$Progress.finish();
    }).catch((error) => {
      console.error(error);
    });
  },
  checkCookie(context, payload) {
    const store = context;
    const { vm } = payload;
    const { user } = store.state;
    const { isLoggedIn } = store.state.user;

    const logInTime = new Date(Vue.cookie.get('userLogInTime')).getTime();
    const currentTime = (new Date()).getTime();
    const timeOut = user.cookie.time;


    // logInTime is in milliseconds, timeOut is being converted to
    // milliseconds, we subtract 60000 because that is one minute
    if ((logInTime + (timeOut * 60000) - 60000) > currentTime) {
      setTimeout(() => {
        let minutesDifference = 0;
        if (Vue.cookie.get('userLogInTime')) {
          minutesDifference = (Math.floor((Math.abs(new Date(Vue.cookie.get('userLogInTime')).getTime() +
            ((user.cookie.time) * 60 * 1000)) - (new Date())) / 1000) / 60) % 60;
        }
        // Check to see if there is a minute left
        if (minutesDifference <= 1 && Vue.cookie.get('userLoggedIn')) {
          store.commit(types.TIME_LEFT_UNTIL_LOG_OUT, 1);
          vm.$root.$emit(
            'bv::show::modal',
            'cookieModal',
            vm.$refs.cookie_modal,
          );
        }
      }, logInTime + (timeOut * 60000) - 60000 - currentTime);
      setTimeout(() => {
        const currentLoginUserTime = new Date(Vue.cookie.get('userLogInTime')).getTime();
        const logOutCurrentTime = (new Date()).getTime();
        if (!currentLoginUserTime || currentLoginUserTime > logOutCurrentTime) {
          if (!Vue.cookie.get('userLoggedIn')) {
            store.dispatch('userLogOut');
            store.commit(types.SET_EXTEND_SESSION_MESSAGE, 'You have been logged out.');
            store.commit(types.SET_DISPLAY_LOGIN_AGAIN_BUTTON_ON_MODAL, '');
          }
        }
      }, (logInTime + (timeOut * 60000) - currentTime));
    }
  },
  apiUserPatch(context, body) {
    const store = context;
    const apiURL = store.getters.getEnvironmentApiURL;
    const { id } = store.getters.getUser;
    const token = Vue.cookie.get('Token');
    const userInit = store.getters.getUser.init;
    const updatedBody = body;
    const userInitValid = store.getters.getUserInitValidation;
    if (userInitValid) {
      updatedBody.init =
        {
          value: 'generated-user@e-enterprise',
        };
    } else {
      updatedBody.init = userInit;
    }
    AppAxios.patch(`${apiURL}/user/${id}?_format=json`, updatedBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        crossDomain: true,
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      console.warn('PATCH => success');
    }).catch(() => {
      console.warn('PATCH => failure');
    });
  },
  populateDropdownForUserInput(context) {
    // Declare variables
    const store = context;
    let params = '';
    const userInput = store.getters.getUser.inputBoxText;
    let {userLocationsFromLoad} = store.getters.getUser;

    store.commit('IS_CURRENT_DROPDOWN_ZIPCODE_WITH_TRIBES', false);

    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(userInput)) {
      // handle zipcode
      params = `zipcode=${userInput}`;
    } else if (userInput.indexOf(',') > -1) {
      // handle city and state
      const cityAndState = userInput.split(',');
      const city = cityAndState[0].toUpperCase().trim();
      const state = cityAndState[1].toUpperCase().trim();
      params = `city=${city}&state=${state}`;
    } else {
      params = `tribe=${userInput.toUpperCase().trim()}`;
    }

    AppAxios.get(store.getters.getEEPAPIURL({
      endpoint: store.getters.getApiUrl('locationSearch'),
      params,
    }), {
      headers: store.getters.getGETHeaders,
    }).then((response) => {
      // Declare variables
      let formattedResponseInformation = [];
      let dropDownLabelText = 'Select a zipcode for';

      const returnData = response.data;
      if (params.indexOf('tribe') !== -1) {
        Object.keys(returnData.tribal_information).forEach((key) => {

          let tribeName = key;
          let thisTribeZipcodes = [];
          formattedResponseInformation.push(tribeName);

          returnData.tribal_information[key].forEach((zipcode) => {
            if(!doesUserHaveGivenLocation(tribeName, zipcode)){
              thisTribeZipcodes.push(zipcode);
            }
          });
          if(thisTribeZipcodes.length > 0){
              formattedResponseInformation.push({tribeName: thisTribeZipcodes});
          }
        });
        store.commit(types.IS_CURRENT_DROPDOWN_ZIPCODE_WITH_TRIBES, true);
        store.commit(types.SET_TRIBES_ARRAY, formattedResponseInformation);
      } else if (params.indexOf('zipcode') !== -1) {
        // The if statement handles the case of if a zipcode exist in more than
        // one place
        if (returnData.cities_and_states) {
          let cities_and_states_return_from_ajax = returnData.cities_and_states;
          let cities_and_states = [];
          cities_and_states_return_from_ajax.forEach(function(city_and_state){
            if(!doesUserHaveGivenLocation(city_and_state, userInput.trim())){
              cities_and_states.push(city_and_state);
            }
          });
          formattedResponseInformation = cities_and_states;
        } else {
          const cities = returnData.city;

          for (let i = 0; i < cities.length; i += 1) {
            let formattedCityAndState = `${cities[i]}, ${returnData.state[0]}`;
            if(!doesUserHaveGivenLocation(formattedCityAndState, userInput.trim())){
              formattedResponseInformation.push(formattedCityAndState);
            }
          }
        }
        if (returnData.associated_tribes) {
          const tribes = returnData.associated_tribes;
          for (let i = 0; i < tribes.length; i += 1) {
            let tribe = tribes[i].trim();
            if(!doesUserHaveGivenLocation(tribe, userInput.trim())){
              formattedResponseInformation.push(tribe);
            }
          }
          store.commit('IS_CURRENT_DROPDOWN_ZIPCODE_WITH_TRIBES', true);
        }
        dropDownLabelText = 'Select a location for';
      } else if (params.indexOf('city') !== -1 && params.indexOf('state') !== -1) {
        let zipcodes = [];
        let cityAndState = params.indexOf('city') + ", " + params.indexOf('state');
        returnData.zipcode.forEach(function(zipcode){
          if(!doesUserHaveGivenLocation(userInput.trim(), zipcode)){
            zipcodes.push(zipcode);
          }
        });
        formattedResponseInformation = zipcodes;
      }

      function doesUserHaveGivenLocation(name, zipcode){
        return userLocationsFromLoad.some(function(location){
            return parseInt(location.second) === parseInt(zipcode)
                && location.first.trim() === name.trim();
        });
      }

      // Commit all of the information to the store
      store.commit('SET_OPTIONS_AFTER_INPUT', formattedResponseInformation);
      store.commit('SET_INPUT_BOX_TEXT', store.getters.getUser.inputBoxText);
      store.commit('SET_IS_AFTER_INPUT_DROPDOWN_DISPLAYED', false);
      // Change the label for the dropdown
      store.commit('SET_DROPDOWN_LABEL', dropDownLabelText);
    }).catch((error) => {
      console.warn(error);
    });
  },
  handleSelectButtonClickForLocation(context) {
    const store = context;

    const { inputBoxText } = store.getters.getUser;
    const { dropDownSelection } = store.getters.getUser;
    let typedInLocationToCommit = '';
    let selectedLocationFromDropdownToCommit = '';



    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(inputBoxText)) {
      selectedLocationFromDropdownToCommit = inputBoxText;
      typedInLocationToCommit = dropDownSelection;
    } else if(store.getters.getUser.isCurrentDropdownZipcodeWithTribes) {

      selectedLocationFromDropdownToCommit = dropDownSelection;
      let tribeArray = store.getters.getUser.tribesArray;
      for (let i = 0; i < tribeArray.length; i++){
        if(Array.isArray(tribeArray[i].tribeName)) {
          if(tribeArray[i].tribeName.indexOf(dropDownSelection) > -1){
            typedInLocationToCommit = tribeArray[i - 1];
          }
        }
      }
    } else {
      selectedLocationFromDropdownToCommit = dropDownSelection;
      typedInLocationToCommit = inputBoxText;
    }

    store.commit('SAVE_USER_SELECTED_LOCATIONS', {
      first: typedInLocationToCommit,
      second: selectedLocationFromDropdownToCommit,
    });

    // Clear the inputbox text
    store.commit('SET_INPUT_BOX_TEXT', '');

    // Clear the dropdown list options
    store.commit('SET_OPTIONS_AFTER_INPUT', '');

    store.commit('SET_IS_AFTER_INPUT_DROPDOWN_DISPLAYED', 'none');

    store.commit('SET_IS_MAIN_INPUT_DISPLAYED', false);

    if (store.getters.getUser.firstTimeSelectButtonClicked === 1) {
      store.commit('SET_DISPLAY_WHEN_LOCATION_IS_CLICKED', '');
    }
  },
  handleBackButtonClickForLocation(context) {
    const store = context;

    // Clear the inputbox text
    store.commit('SET_INPUT_BOX_TEXT', '');

    // Clear the dropdown list options
    store.commit('SET_OPTIONS_AFTER_INPUT', '');

    store.commit('SET_IS_AFTER_INPUT_DROPDOWN_DISPLAYED', 'none');
  },
  setDeepLink(context, link) {
    const store = context;
    store.commit('SET_DEEP_LINK', link);
  },
  loadEEPUser(context) {
    const store = context;
    AppAxios.get(`${store.getters.getEnvironmentApiURL}/user/${Vue.cookie.get('uid')}?_format=json`, {
      headers: { Authorization: `Bearer ${Vue.cookie.get('Token')}` },
    }).then((userLoggedInResponse) => {
      store.commit('SET_USER_OBJECT', userLoggedInResponse.data);
      store.commit(types.IS_USER_LOGGED_IN, true);
    }).catch((error) => {
      console.warn(error);
    });
  },
};
