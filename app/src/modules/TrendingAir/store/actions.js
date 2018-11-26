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
    const url = store.state.villageGreenApiUrl + 'siteId=' + correspondingSiteId;

    AppAxios.get(url)
      .then((response) => {
        console.log(response.data);
      });

    // finish up with axios request
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
    }
  },
};
