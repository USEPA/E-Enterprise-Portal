import Vue from 'vue';
import { AppAxios, commonAppStore } from '../modules/wadk/WADK';
import { EventBus } from '../EventBus';

export default {
  ...commonAppStore.actions,
  createLocationRequest(context, location) {
    // Variable declerations
    const rootStore = this;
    const env = rootStore.getters.getEnvironment;
    const store = context;
    const userLocation = {
      zipcode: '',
      city: '',
      state: '',
    };
    const app = store.rootGetters.getApp;
    const url = store.state.url;

    // Input validation for URL formation
    if (/^\d{5}(-\d{4})?$/.test(location)) {
      // url += 'zipcode=' + location;
      // @todo clean string/trim
      userLocation.zipcode = location;
    } else if (/([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/.test(location)
      || /([A-Za-z]+(?: [A-Za-z]+)*),?([A-Za-z]{2})/.test(location)) {
      const decoupled_location = location.split(',');
      const city = decoupled_location[0].toUpperCase().trim();
      const state = decoupled_location[1].toUpperCase().trim();
      // url += 'city=' +
      //   city +
      //   '&state=' + state;
      // @todo clean string/trim
      userLocation.city = city;
      userLocation.state = state;
    }

    // Make the request to retrieve the correct location information
    AppAxios.get(url).then((response) => {
      const { data } = response;
      console.log(data);

      EventBus.$emit('locationSearch::showUserConfirmationModal', {
        callee: this,
        value: data,
      });

      // @todo figure out if has multiple options and ask for user input
      // store.commit('SET_USER_LOCATION', userLocation);
    }).catch((...args) => {
      // @todo add sanity check for errors & visual prompt to the user
      app.$Progress.fail();
      console.warn('AppAxios fail: ', args);
    });
  },
};
