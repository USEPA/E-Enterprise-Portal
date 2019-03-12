import types from './types';
import { AppAxios, commonAppStore } from '../../wadk/WADK';
import { EventBus } from '../../../EventBus';
import convert from 'xml-js';
import parseXml from '../../wadk/utils/xmlTools';

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
  setFacilityName(context, payload) {
    const store = context;

    store.commit(types.SET_FACILITY_NAME, payload);
  },
  setNPDESID(context, payload) {
    const store = context;

    store.commit(types.SET_NPDESID, payload);
  },
  setFacilityCity(context, payload) {
    const store = context;

    store.commit(types.SET_FACILITY_CITY, payload);
  },
  setMsgpFacilityState(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_FACILITY_STATE, payload);
    store.commit(types.SET_MSGP_STATE_SELECTED, true);
  },
  setFacilityZip(context, payload) {
    const store = context;

    store.commit(types.SET_FACILITY_ZIP, payload);
  },
  setStatus(context, payload) {
    const store = context;

    store.commit(types.SET_STATUS, payload);
  },
  setFormType(context, payload) {
    const store = context;

    store.commit(types.SET_FORM_TYPE, payload);
  },
  setOperatorName(context, payload) {
    const store = context;

    store.commit(types.SET_OPERATOR_NAME, payload);
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
  setMasterPermitNumber(context, payload) {
    const store = context;

    store.commit(types.SET_MASTER_PERMIT_NUMBER, payload);
  },
  setTribalName(context, payload) {
    const store = context;

    store.commit(types.SET_TRIBAL_NAME, payload);
  },
  setIssuer(context, payload) {
    const store = context;

    store.commit(types.SET_ISSUER, payload);
  },
  setSubmissionType(context, payload) {
    const store = context;

    store.commit(types.SET_SUBMISSION_TYPE, payload);
  },
  setCoverageType(context, payload) {
    const store = context;

    store.commit(types.SET_COVERAGE_TYPE, payload);
  },
  setCoverageStatus(context, payload) {
    const store = context;

    store.commit(types.SET_COVERAGE_STATUS, payload);
  },
  setMsgpSector(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_SECTOR, payload);
  },
  setSubsector(context, payload) {
    const store = context;

    store.commit(types.SET_SUBSECTOR, payload);
  },
  setSicCode(context, payload) {
    const store = context;

    store.commit(types.SET_SIC_CODE, payload);
  },
  setAddress(context, payload) {
    const store = context;

    store.commit(types.SET_ADDRESS, payload);
  },
  loadBaseFormOption(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-svc-ref?states&sectors`)
      .then((response) => {
        const formOptions = response.data.helperQueryResponse.oecaSvc;
        const formSectorOptions = formOptions[0];
        const formStateOptions = formOptions[1];
        const formSectorNames = [];
        const formStateNames = [];

        formSectorOptions.forEach((sectorOption) => {
          formSectorNames.push(sectorOption.sectorName);
        });
        formStateOptions.forEach((stateOption) => {
          formStateNames.push(stateOption.stateName);
        });

        console.log(formOptions);
        console.log(formStateNames);
        store.commit(types.SET_BASE_FORM_OPTIONS, formOptions);
        store.commit(types.SET_BASE_FORM_OPTION_STATE_NAMES, formStateNames);
        store.commit(types.SET_BASE_FORM_OPTION_SECTOR_NAMES, formSectorNames);
        console.log(state.formOptions.baseFormOptions);
      });
  },
  loadMsgpFormOptions(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-msgp?formTypes&formStatuses&coverageTypes&issuers&coverageStatuses`)
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
    let queriesRemaining = Object.keys(msgpFormData).length;
    Object.keys(msgpFormData).forEach((key) => {
      if (msgpFormData[key] !== 'Select...' && msgpFormData[key] !== '') {
        console.log('inside first');
        console.log(`Key: ${key}; Value: ${msgpFormData[key]}`);
        if (key === 'facilityState') {
          console.log('inside second');
          console.log(baseFormOptions[1]);
          baseFormOptions[1].forEach((subKey) => {
            console.log(subKey.stateName);
            console.log(msgpFormData);
            if (subKey.stateName === msgpFormData.facilityState) {
              console.log('inside third');
              urlQueries = `facilityState=${subKey.stateCode}`;
            }
          });
        } else {
          urlQueries = `${urlQueries + key}=${msgpFormData[key]}`;
        }
      }
      queriesRemaining -= 1;
      if (queriesRemaining > 0) {
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
