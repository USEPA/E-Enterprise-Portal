import Vue from 'vue';
import { AppAxios, commonAppStore } from '../modules/wadk/WADK';
import { EventBus } from '../EventBus';

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
};
