/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators.  Async tasks should be created here.
 */

import {AppAxios, commonAppStore} from '../../wadk/WADK';
import types from './types';
import {EventBus} from '../../../EventBus';

export default {
  ...commonAppStore.actions,
  reflectLocationChange(context, newLocation){
    const store = context;
    const newLocationSplitStr = newLocation.split(", ");
    const inputBoxSelectedCity = store.rootGetters.getUser.location.city;
    const inputBoxSelectedState = store.rootGetters.getUser.location.state;
    const correspondingSiteId = store.state.airMonitoringStationsWithSiteIDs[newLocation];

    // do axios ajax call here for the proxy endpoint
    const url = store.state.villageGreenApiUrl + 'siteID=' + correspondingSiteId;

    AppAxios.get(url)
      .then((response) => {
        store.commit(types.CURRENT_SELECTED_LOCATION_INFORMATION, {
          siteid: correspondingSiteId,
          locationCity: inputBoxSelectedCity,
          locationState: inputBoxSelectedState,
          curHumUnit: ((response.data.curHumUnit === "PERCENT") ? '%' : response.data.curHumUnit),
          curHumValue: response.data.curHumValue,
          curOzoneUnit: response.data.curOzoneUnit,
          curOzoneValue: response.data.curOzoneValue,
          curPmUnit: response.data.curPmUnit,
          curPmValue: response.data.curPmValue,
          curTempUnit: response.data.curTempUnit,
          curTempValue: response.data.curTempValue,
          curWDValue: response.data.curWDValue,
          curWSUnit: response.data.curWSUnit,
          curWSValue: response.data.curWSValue,
          currentDateTime: response.data.currentDateTime,
          currentDateTimeUTCMillis: response.data.currentDateTimeUTCMillis,
          timezone: response.data.timezone,
        });
      });
  },
  updateLocationOnInputBoxChange(context){
    const store = context;
    const rootStore = this;

    const newCity = rootStore.state.user.location.city.toLowerCase();
    const stations = store.state.airMonitoringStations;
    const newLocationFormat = newCity.charAt(0).toUpperCase() +
      newCity.substring(1, newCity.length + 1) + ', ' + rootStore.state.user.location.state;

    // Loop through current locations in drop down to validate the new location
    if (stations.indexOf(newLocationFormat) > -1) {
      store.commit(types.NEW_UPDATED_LOCATION, newLocationFormat);
      store.dispatch('reflectLocationChange', newLocationFormat);
    }
  },
};
