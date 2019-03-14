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
  getMsgpFormData(state) {
    return state.msgpFormData;
  },
  getCgpFormData(state) {
    return state.cgpFormData;
  },
  getMsgpResultsLoaded(state) {
    return state.msgpResultsLoaded;
  },
  getCgpResultsLoaded(state) {
    return state.cgpResultsLoaded;
  },
  getPermitType(state) {
    return state.permitType;
  },
  getFacilityName(state) {
    return state.facilityName;
  },
  getNpdesId(state) {
    return state.npdesId;
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
  getSector(state) {
    return state.sector;
  },
  getSubmissionType(state) {
    return state.submissionType;
  },
  getCoverageType(state) {
    return state.coverageType;
  },
  getCoverageStatus(state) {
    return state.coverageStatus;
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
  getMsgpFormResults(state) {
    return state.msgpFormResults;
  },
  getCgpFormResults(state) {
    return state.cgpFormResults;
  },
  getTotalRows(state) {
    if (state.permitType === 'Multi-Sector General Permit') {
      return state.msgpFormResults.length;
    } else if (state.permitType === 'Construction General Permit') {
      return state.cgpFormResults.length;
    }
    return 0;
  },
};
