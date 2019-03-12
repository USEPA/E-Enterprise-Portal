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
  getFacilityCity(state) {
    return state.facilityCity;
  },
  getFacilityState(state) {
    return state.facilityState;
  },
  getFacilityZip(state) {
    return state.facilityZip;
  },
  getStatus(state) {
    return state.status;
  },
  getFormType(state) {
    return state.formType;
  },
  getOperatorName(state) {
    return state.operatorName;
  },
  getFederalFacility(state) {
    return state.federalFacility;
  },
  getDateSelection(state) {
    return state.dateSelection;
  },
  getStartDate(state) {
    return state.submittedDateFrom;
  },
  getEndDate(state) {
    return state.submittedDateTo;
  },
  getTribalIndicator(state) {
    return state.tribalIndicator;
  },
  getTribeSelection(state) {
    return state.tribeSelection;
  },
  getFacilityCounty(state) {
    return state.facilityCounty;
  },
  getMasterPermitNumber(state) {
    return state.masterPermitNumber;
  },
  getTribalName(state) {
    return state.tribalName;
  },
  getIssuer(state) {
    return state.issuer;
  },
  getSubmissionType(state) {
    return state.submissionType;
  },
  getApplicationType(state) {
    return state.applicationType;
  },
  getFormStatus(state) {
    return state.formStatus;
  },
  getSector(state) {
    return state.sector;
  },
  getSubsector(state) {
    return state.subsector;
  },
  getSicCode(state) {
    return state.sicCode;
  },
  getAddress(state) {
    return state.address;
  },

};
