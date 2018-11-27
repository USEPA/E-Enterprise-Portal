/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly.  Methods may provide
 * calculations based off the store's state values, such as filters.
 *
 * @SEE https://vuex.vuejs.org/guide/getters.html
 */

import { commonAppStore } from '../../wadk/WADK';
export default {
  ...commonAppStore.getters,
  getAirMonitoringStations(state){
    return state.airMonitoringStations;
  },
  getlastWeatherReading(state){
    return state.lastWeatherReading;
  },
  getDefaultDropDownSelection(state){
    return state.defaultSeletcedLocation;
  },
  getNewUpdatedLocation(state){
    return state.newUpdatedLocation;
  },
  getCurrentSelectedLocationInformation(state){
    return state.currentSelectedLocationInforation;
  },
  getSelectedLocationForLink(state){
    return state.currentLocation;
  }
};
