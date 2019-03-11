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
  getFormOptions(state) {
    return state.formOptions;
  },
  getPermitType(state) {
    return state.permitType;
  },
  getFacilityName(state) {
    return state.facilityName;
  },
  getNPDESID(state) {
    return state.NPDESID;
  },
  getCityName(state) {
    return state.cityName;
  },
  getStateTerritory(state) {
    return state.stateTerritory;
  },
  getZip(state) {
    return state.zip;
  },
  getStatus(state) {
    return state.status;
  },
  getFormType(state) {
    return state.formType;
  },
  getFacilityOperator(state) {
    return state.facilityOperator;
  },
  getFederalFacility(state) {
    return state.federalFacility;
  },
  getDateSelection(state) {
    return state.dateSelection;
  },
  getStartDate(state) {
    return state.startDate;
  },
  getEndDate(state) {
    return state.endDate;
  },
  getTribalLandsConstruction(state) {
    return state.tribalLandsConstruction;
  },
  getTribeSelection(state) {
    return state.tribeSelection;
  },
  getCountySelection(state) {
    return state.countySelection;
  },

};
