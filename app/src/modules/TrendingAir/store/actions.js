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
    
    // do axios ajax call here for the proxy endpoint that i created


    // if (newLocationSplitStr[0].toLowerCase().trim() === inputBoxSelectedCity.toLowerCase().trim() &&
    //   newLocationSplitStr[1].toLowerCase().trim() === inputBoxSelectedState.toLowerCase().trim()) {
    //   console.log("hit if");
    //
    // } else {
    //
    //   console.log("hit else");
    //
    //
    // }

  },
  updateLocationOnInputBoxChange(context){
    const store = context;
    const rootStore = this;

    console.log("hit here");

    if (store.defaultSeletcedLocation != 'Chicago, IL') {
      const newCity = rootStore.state.user.location.city;
      const newState = rootStore.state.user.location.state;
      const newLocationFormat = newCity + ', ' + newState;
      if(store.state.airMonitoringStations.includes(newLocationFormat)){
        store.commit('CURRENT_SELECTED_LOCATION', newLocationFormat);
      }
    }
  },
};
