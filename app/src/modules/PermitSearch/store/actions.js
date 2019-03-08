import types from './types';
import { AppAxios, commonAppStore } from '../../wadk/WADK';
import { EventBus } from '../../../EventBus';

/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators.  Async tasks should be created here.
 */
export default {
  ...commonAppStore.actions,
  setPermitType(context, payload) {
    const store = context;
    const { state } = store;

    store.commit(types.SET_PERMIT_TYPE, payload);
  },
  setFacilityName(context, payload) {
    const store = context;

    store.commit(types.SET_FACILITY_NAME, payload);
  },
  setNPDESID(context, payload) {
    const store = context;

    store.commit(types.SET_NPDESID, payload);
  },
  setCityName(context, payload) {
    const store = context;

    store.commit(types.SET_CITY_NAME, payload);
  },
  setStateTerritory(context, payload) {
    const store = context;

    store.commit(types.SET_STATE_TERRITORY, payload);
  },
  setZip(context, payload) {
    const store = context;

    store.commit(types.SET_ZIP, payload);
  },
};
