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
  setStatus(context, payload) {
    const store = context;

    store.commit(types.SET_STATUS, payload);
  },
  setFormType(context, payload) {
    const store = context;

    store.commit(types.SET_FORM_TYPE, payload);
  },
  setMsgpOperatorName(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_OPERATOR_NAME, payload);
  },
  setFederalIndicator(context, payload) {
    const store = context;

    store.commit(types.SET_FEDERAL_INDICATOR, payload);
  },
  setDateSelection(context, payload) {
    const store = context;

    store.commit(types.SET_DATE_SELECTION, payload);
  },
  setStartDate(context, payload) {
    const store = context;

    store.commit(types.SET_START_DATE, payload);
  },
  setEndDate(context, payload) {
    const store = context;

    store.commit(types.SET_END_DATE, payload);
  },
  setTribalIndicator(context, payload) {
    const store = context;

    store.commit(types.SET_TRIBAL_INDICATOR, payload);
  },
  setTribeSelection(context, payload) {
    const store = context;

    store.commit(types.SET_TRIBE_SELECTION, payload);
  },
  setFacilityCounty(context, payload) {
    const store = context;

    store.commit(types.SET_FACILITY_COUNTY, payload);
  },
  setMsgpMasterPermitNumber(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_MASTER_PERMIT_NUMBER, payload);
  },
  setTribalName(context, payload) {
    const store = context;

    store.commit(types.SET_TRIBAL_NAME, payload);
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
  loadBaseFormOption(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-svc-ref?tribes&states&sectors`)
      .then((response) => {
        const formOptions = response.data.helperQueryResponse.oecaSvc;
        console.log(formOptions);
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

        console.log(formOptions);
        console.log(formStateNames);
        console.log(formTribalNames);
        store.commit(types.SET_BASE_FORM_OPTIONS, formOptions);
        store.commit(types.SET_BASE_FORM_OPTION_STATE_NAMES, formStateNames.sort());
        store.commit(types.SET_BASE_FORM_OPTION_SECTOR_NAMES, formSectorNames.sort());
        store.commit(types.SET_BASE_FORM_OPTION_TRIAL_NAMES, formTribalNames.sort());
        console.log(state.formOptions.baseFormOptions);
      });
  },
  loadMsgpFormOptions(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-msgp?formTypes&formStatuses&coverageTypes&submissionTypes&issuers&coverageStatuses&form`)
      .then((response) => {
        const formOptions = response.data.helperQueryResponse;
        console.log(formOptions);
        store.commit(types.SET_FORM_OPTIONS_MSGP, formOptions);
        console.log(state.formOptions.msgpFormOptions);
      });
  },
  loadCgpFormOptions(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-cgp?formTypes&formStatuses`)
      .then((response) => {
        const formOptions = response.data.helperQueryResponse;
        console.log(formOptions);
        store.commit(types.SET_FORM_OPTIONS_CGP, formOptions);
        console.log(state.formOptions.cgpFormOptions);
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
        console.log('inside first');
        console.log(`Key: ${key}; Value: ${msgpFormData[key]}`);
        // Map State Name to State Code
        if (key === 'facilityState') {
          console.log('inside second');
          console.log(baseFormOptions[1]);
          baseFormOptions[1].forEach((subKeyA) => {
            console.log(subKeyA.stateName);
            console.log(msgpFormData);
            if (subKeyA.stateName === msgpFormData.facilityState) {
              console.log('inside third');
              urlQueries = `facilityState=${subKeyA.stateCode}`;
            }
          });
        } else {
          urlQueries = `${urlQueries + key}=${msgpFormData[key]}`;
        }
        urlQueries += '&';
      }
    });
    urlQueries = encodeURI(urlQueries);
    console.log(urlQueries);
    const axiosUrl = axiosUrlBase + urlQueries;
    console.log(axiosUrl);
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
