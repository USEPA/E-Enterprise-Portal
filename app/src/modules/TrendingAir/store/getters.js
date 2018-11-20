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
  getDefaultSelectedValue(state){
    return state.locationDropdownDefaultValue;
  },
  getlastWeatherReading(state){
    return state.lastWeatherReading;
  },
  getCurrentDropDownSelection(state){
    return state.currentSeletcedLocation;
  },
};
