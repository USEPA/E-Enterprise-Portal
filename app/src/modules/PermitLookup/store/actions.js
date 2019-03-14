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

    store.commit(types.SET_PERMIT_TYPE, payload);
  },
  setMsgpFacilityName(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_FACILITY_NAME, payload);
  },
  setMsgpNpdesId(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_NPDESID, payload);
  },
  setMsgpFacilityCity(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_FACILITY_CITY, payload);
  },
  setMsgpFacilityState(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_FACILITY_STATE, payload);
    store.commit(types.SET_MSGP_STATE_SELECTED, true);
  },
  setMsgpFacilityZip(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_FACILITY_ZIP, payload);
  },
  setCgpStatus(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_STATUS, payload);
  },
  setCgpFormType(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_FORM_TYPE, payload);
  },
  setMsgpOperatorName(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_OPERATOR_NAME, payload);
  },
  setMsgpFederalIndicator(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_FEDERAL_INDICATOR, payload);
  },
  setDateSelection(context, payload) {
    const store = context;

    store.commit(types.SET_DATE_SELECTION, payload);
  },
  setStartDate(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_START_DATE, payload);
  },
  setEndDate(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_END_DATE, payload);
  },
  setMsgpTribalIndicator(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_TRIBAL_INDICATOR, payload);
  },
  setTribeSelection(context, payload) {
    const store = context;

    store.commit(types.SET_TRIBE_SELECTION, payload);
  },
  setMsgpFacilityCounty(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_FACILITY_COUNTY, payload);
  },
  setMsgpMasterPermitNumber(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_MASTER_PERMIT_NUMBER, payload);
  },
  setMsgpTribalName(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_TRIBAL_NAME, payload);
  },
  setIssuer(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_ISSUER, payload);
  },
  setMsgpSubmissionType(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_SUBMISSION_TYPE, payload);
  },
  setMsgpCoverageType(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_COVERAGE_TYPE, payload);
  },
  setMsgpCoverageStatus(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_COVERAGE_STATUS, payload);
  },
  setMsgpSector(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_SECTOR, payload);
  },
  setSubsector(context, payload) {
    const store = context;

    store.commit(types.SET_SUBSECTOR, payload);
  },
  setMsgpSicCode(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_SIC_CODE, payload);
  },
  setMsgpAddress(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_ADDRESS, payload);
  },
  setMsgpDateTo(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_END_DATE, payload);
  },
  setMsgpDateFrom(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_START_DATE, payload);
  },
  loadBaseFormOption(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-svc-ref?tribes&states&sectors`)
      .then((response) => {
        const formOptions = response.data.helperQueryResponse.oecaSvc;
        const formSectorOptions = formOptions[0];
        const formStateOptions = formOptions[1];
        const formTribalOptions = formOptions[2];
        const formSectorNames = [];
        const formStateNames = [];
        const formTribalNames = [];

        formSectorOptions.forEach((sectorOption) => {
          formSectorNames.push(sectorOption.sectorName);
        });
        formStateOptions.forEach((stateOption) => {
          formStateNames.push(stateOption.stateName);
        });
        formTribalOptions.forEach((tribeOption) => {
          formTribalNames.push(tribeOption.tribalName);
        });

        store.commit(types.SET_BASE_FORM_OPTIONS, formOptions);
        store.commit(types.SET_BASE_FORM_OPTION_STATE_NAMES, formStateNames.sort());
        store.commit(types.SET_BASE_FORM_OPTION_SECTOR_NAMES, formSectorNames.sort());
        store.commit(types.SET_BASE_FORM_OPTION_TRIAL_NAMES, formTribalNames.sort());
      });
  },
  loadMsgpFormOptions(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-msgp?formTypes&formStatuses&coverageTypes&submissionTypes&issuers&coverageStatuses&form&msgpDownloadUrlBase`)
      .then((response) => {
        const formOptions = response.data.helperQueryResponse;
        store.commit(types.SET_FORM_OPTIONS_MSGP, formOptions);
      });
  },
  loadCgpFormOptions(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-cgp?formTypes&formStatuses`)
      .then((response) => {
        const formOptions = response.data.helperQueryResponse;
        store.commit(types.SET_FORM_OPTIONS_CGP, formOptions);
      });
  },
  msgpFormGetResults(context, payload) {
    const store = context;
    const { vm } = payload;
    const apiURL = store.rootGetters.getEnvironmentApiURL;
    const { msgpFormData } = store.state;
    const { baseFormOptions } = store.state.formOptions;
    const axiosUrlBase = `${apiURL}/eep/proxy/service/oeca-msgp?`;
    let urlQueries = '';

    // Set msgp form inputs that aren't empty or default as queries
    Object.keys(msgpFormData).forEach((key) => {
      if (msgpFormData[key] !== 'Select...' && msgpFormData[key] !== '') {
        // Map State Name to State Code
        if (key === 'facilityState') {
          baseFormOptions[1].forEach((subKeyA) => {
            if (subKeyA.stateName === msgpFormData.facilityState) {
              urlQueries += `facilityState=${subKeyA.stateCode}`;
            }
          });
        } else if (key === 'submittedDateTo') {
          const unformattedDate = new Date(msgpFormData[key]);
          urlQueries += `${key}=${unformattedDate.toISOString()}`;
        } else if (key === 'submittedDateFrom') {
          const unformattedDate = new Date(msgpFormData[key]);
          urlQueries += `${key}=${unformattedDate.toISOString()}`;
        } else {
          urlQueries += `${urlQueries + key}=${msgpFormData[key]}`;
        }
        urlQueries += '&';
      }
    });
    urlQueries = encodeURI(urlQueries);
    const axiosUrl = axiosUrlBase + urlQueries;
    vm.$root.$emit('bv::hide::modal', 'permit-search-modal');
    // get stuff
    AppAxios.get(axiosUrl)
      .then((response) => {
        const msgpResponse = response.data.formQueryResponse;
        store.commit(types.SET_MSGP_RESPONSE, msgpResponse);
        store.commit(types.SET_MSGP_RESULTS_LOADED, true);
        vm.$root.$emit('bv::show::modal', 'permit-results-modal');
      });
  },
};
