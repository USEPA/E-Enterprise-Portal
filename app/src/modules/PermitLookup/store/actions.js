import _ from 'lodash';
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

  setStatus(context, payload) {
    const store = context;

    store.commit(types.SET_STATUS, payload);
  },
  setFormType(context, payload) {
    const store = context;

    store.commit(types.SET_FORM_TYPE, payload);
  },

  setDateSelection(context, payload) {
    const store = context;

    store.commit(types.SET_DATE_SELECTION, payload);
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
    const { vm } = payload;
    const apiURL = store.rootGetters.getEnvironmentApiURL;
    store.commit(types.SET_MSGP_FACILITY_STATE, payload);
    const { facilityState } = store.state.msgpFormData;
    const { baseFormOptions } = store.state.formOptions;
    let stateCode = '';

    baseFormOptions[1].forEach((key) => {
      if (key.stateName === facilityState) {
        stateCode = key.stateCode;
      }
    });

    const axiosUrlBase = `${apiURL}/eep/proxy/service/oeca-svc-ref?counties=${stateCode}`;

    AppAxios.get(axiosUrlBase).then((response) => {
      const counties = response.data.helperQueryResponse.oecaSvcWithParams[0];
      const countyNames = [];
      counties.forEach((key) => {
        if (key.stateCode === stateCode) {
          countyNames.push(key.countyName);
        }
      });
      store.commit(types.SET_MSGP_COUNTIES, countyNames);
    });
  },
  setMsgpFacilityZip(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_FACILITY_ZIP, payload);
  },
  setMsgpStartDate(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_START_DATE, payload);
  },
  setMsgpEndDate(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_END_DATE, payload);
  },
  setMsgpTribalIndicator(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_TRIBAL_INDICATOR, payload);
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
  setMsgpIssuer(context, payload) {
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
    const { vm } = payload;
    const apiURL = store.rootGetters.getEnvironmentApiURL;
    store.commit(types.SET_MSGP_SECTOR, payload);
    const { sector } = store.state.msgpFormData;
    const { baseFormOptions } = store.state.formOptions;
    let sectorCode = '';
    baseFormOptions[0].forEach((key) => {
      if (sector === key.sectorName) {
        sectorCode = key.sectorCode;
      }
    });

    const axiosUrlBase = `${apiURL}/eep/proxy/service/oeca-svc-ref?subsectors=${sectorCode}`;

    AppAxios.get(axiosUrlBase).then((response) => {
      const subSectors = response.data.helperQueryResponse.oecaSvcWithParams[0];
      const subSectorNames = [];
      subSectors.forEach((key) => {
        if (key.sectorCode === sectorCode) {
          subSectorNames.push(key.subsectorName);
        }
      });
      store.commit(types.SET_BASE_FORM_OPTION_SUB_SECTOR_NAMES, subSectorNames);
    });
  },
  setMsgpSubsector(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_SUBSECTOR, payload);
  },
  setMsgpSicCode(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_SIC_CODE, payload);
  },
  setMsgpAddress(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_ADDRESS, payload);
  },
  setMsgpOperatorName(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_OPERATOR_NAME, payload);
  },
  setMsgpFederalIndicator(context, payload) {
    const store = context;

    store.commit(types.SET_MSGP_FEDERAL_INDICATOR, payload);
  },
  setCgpFacilityName(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_FACILITY_NAME, payload);
  },
  setCgpNpdesId(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_NPDESID, payload);
  },
  setCgpFacilityCity(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_FACILITY_CITY, payload);
  },
  setCgpFacilityState(context, payload) {
    const store = context;
    const { vm } = payload;
    const apiURL = store.rootGetters.getEnvironmentApiURL;
    store.commit(types.SET_CGP_FACILITY_STATE, payload);
    const { projectState } = store.state.cgpFormData;
    const { baseFormOptions } = store.state.formOptions;
    let stateCode = '';

    baseFormOptions[1].forEach((key) => {
      if (key.stateName === projectState) {
        stateCode = key.stateCode;
      }
    });

    const axiosUrlBase = `${apiURL}/eep/proxy/service/oeca-svc-ref?counties=${stateCode}`;

    AppAxios.get(axiosUrlBase).then((response) => {
      const counties = response.data.helperQueryResponse.oecaSvcWithParams[0];
      const countyNames = [];
      counties.forEach((key) => {
        if (key.stateCode === stateCode) {
          countyNames.push(key.countyName);
        }
      });
      store.commit(types.SET_CGP_COUNTIES, countyNames);
    });
  },
  setCgpFacilityZip(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_FACILITY_ZIP, payload);
  },
  setCgpStatus(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_STATUS, payload);
  },
  setCgpFormType(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_FORM_TYPE, payload);
  },
  setCgpOperatorName(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_OPERATOR_NAME, payload);
  },
  setCgpFederalIndicator(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_FEDERAL_INDICATOR, payload);
  },
  setCgpDateSelection(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_DATE_SELECTION, payload);
  },

  setCgpStartDate(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_START_DATE, payload);
  },
  setCgpEndDate(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_END_DATE, payload);
  },
  setCgpTribalIndicator(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_TRIBAL_INDICATOR, payload);
  },
  setCgpTribalName(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_TRIBAL_NAME, payload);
  },
  setCgpFacilityCounty(context, payload) {
    const store = context;

    store.commit(types.SET_CGP_FACILITY_COUNTY, payload);
  },

  loadBaseFormOption(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-svc-ref?tribes&states&sectors&subsectors`)
      .then((response) => {
        const formOptions = response.data.helperQueryResponse.oecaSvc;
        let isValid = false;
        const formSectorOptions = formOptions[0];
        const formStateOptions = formOptions[1];
        const formTribalOptions = formOptions[2];
        const formSectorNames = [];
        const formStateNames = [];
        const formTribalNames = [];

        if (formSectorOptions && formStateOptions && formTribalOptions){
          isValid = true;
        }

        // If response is as expected, populate fields as normal. Otherwise, set the options error.
        if (isValid) {
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
        } else {
          let errorResponse = 'Shared form services unavailable at this time.';
          console.warn('Check if oeca base endpoint is running. Form options are unable to be loaded from this endpoint at this time.');
          store.commit(types.SET_OPTIONS_ERROR, errorResponse);
        }
      });
  },
  loadMsgpFormOptions(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-msgp?formTypes&formStatuses&coverageTypes&submissionTypes&issuers&coverageStatuses&msgpDownloadUrlBase`)
      .then((response) => {
        let isValid = true;
        const formOptions = response.data.helperQueryResponse;
        // Check each option. If any option was not recieved (null value), then mark as invalid and stop checking
        for (let option in formOptions){
          if (!formOptions[option]){
            isValid = false;
            break;
          }
        }
        // If response is as expected, populate fields as normal. Otherwise, set the options error.
        if (isValid){
          store.commit(types.SET_FORM_OPTIONS_MSGP, formOptions);
        } else {
          let errorResponse = 'MSGP form services unavailable at this time.';
          console.warn('Check if msgp endpoint is running. Form options are unable to be loaded from this endpoint at this time.\n' +
            'Current end point is: ', formOptions['msgpDownloadUrlBase']);
          store.commit(types.SET_OPTIONS_ERROR, errorResponse);
        }
      });
  },
  loadCgpFormOptions(context) {
    const store = context;
    const { state } = store;
    const apiURL = store.rootGetters.getEnvironmentApiURL;

    AppAxios.get(`${apiURL}/eep/proxy/service/oeca-cgp?formTypes&formStatuses&cgpDownloadUrlBase`)
      .then((response) => {
        let isValid = true;
        const formOptions = response.data.helperQueryResponse;
        // Check each option. If any option was not recieved (null value), then mark as invalid and stop checking
        for (let option in formOptions){
          if (!formOptions[option]){
            isValid = false;
            break;
          }
        }
        // If response is as expected, populate fields as normal. Otherwise, set the options error.
        if (isValid){
          store.commit(types.SET_FORM_OPTIONS_CGP, formOptions);
        } else {
          let errorResponse = 'CGP form services unavailable at this time.';
          console.warn('Check if cgp endpoint is running. Form options are unable to be loaded from this endpoint at this time.\n' +
            'Current end point is: ', formOptions['cgpDownloadUrlBase']);
          store.commit(types.SET_OPTIONS_ERROR, errorResponse);
        }
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
      if (msgpFormData[key] !== 'Select...' && msgpFormData[key] !== '' && msgpFormData[key] !== 'null') {
        // Map State Name to State Code
        if (key === 'facilityState') {
          baseFormOptions[1].forEach((subKey) => {
            if (subKey.stateName === msgpFormData.facilityState) {
              urlQueries += `facilityState=${subKey.stateCode}`;
            }
          });
        } else if (key === 'subsector') {
          baseFormOptions[0].forEach((subKey) => {
            if (subKey.sectorName === msgpFormData.sector) {
              urlQueries += `subsector=${subKey.sectorCode}`;
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
        let msgpResponse = response.data.formQueryResponse;
        if (msgpResponse) {
          store.commit(types.SET_NO_RESULTS, false);
          // Massage dates to only include Year, month, and day
          msgpResponse.forEach(function(data_object){
            data_object['certifiedDate'] = data_object['certifiedDate'].substring(0, 10);
          });
          if (msgpResponse.code === 'E_InternalError') {
            msgpResponse = 'Error Loading Results...';
            store.commit(types.SET_MSGP_RESPONSE, msgpResponse);
            store.commit(types.SET_RESULTS_ERROR, true);
          } else {
            store.commit(types.SET_RESULTS_ERROR, false);
            store.commit(types.SET_MSGP_RESPONSE, msgpResponse);
            store.commit(types.SET_MSGP_RESULTS_LOADED, true);
          }
        } else {
          store.commit(types.SET_NO_RESULTS, true);
        }
        vm.$root.$emit('bv::show::modal', 'permit-results-modal');
      });
  },
  cgpFormGetResults(context, payload) {
    const store = context;
    const { vm } = payload;
    const apiURL = store.rootGetters.getEnvironmentApiURL;
    const { cgpFormData } = store.state;
    const { baseFormOptions } = store.state.formOptions;
    const axiosUrlBase = `${apiURL}/eep/proxy/service/oeca-cgp?`;
    let urlQueries = '';

    // Set cgp form inputs that aren't empty or default as queries
    Object.keys(cgpFormData).forEach((key) => {
      if (cgpFormData[key] !== 'Select...' && cgpFormData[key] !== '' && cgpFormData[key] !== 'null') {
        // Map State Name to State Code
        if (key === 'projectState') {
          baseFormOptions[1].forEach((subKey) => {
            if (subKey.stateName === cgpFormData.projectState) {
              urlQueries += `projectState=${subKey.stateCode}`;
            }
          });
        } else if (key === 'submittedDateTo') {
          const unformattedDate = new Date(cgpFormData[key]);
          urlQueries += `${key}=${unformattedDate.toISOString()}`;
        } else if (key === 'submittedDateFrom') {
          const unformattedDate = new Date(cgpFormData[key]);
          urlQueries += `${key}=${unformattedDate.toISOString()}`;
        } else if (key === 'updatedDateTo') {
          const unformattedDate = new Date(cgpFormData[key]);
          urlQueries += `${key}=${unformattedDate.toISOString()}`;
        } else if (key === 'updatedDateFrom') {
          const unformattedDate = new Date(cgpFormData[key]);
          urlQueries += `${key}=${unformattedDate.toISOString()}`;
        } else if (key === 'dateSelection') {
          urlQueries += '';
        } else {
          urlQueries += `${urlQueries + key}=${cgpFormData[key]}`;
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
        let cgpResponse = response.data.formQueryResponse;
        if (cgpResponse){
          store.commit(types.SET_NO_RESULTS, false);
          // Massage dates to only include Year, month, and day
          cgpResponse.forEach(function(data_object){
            data_object['certifiedDate'] = data_object['certifiedDate'].substring(0, 10);
          });
          if (cgpResponse.code === 'E_InternalError') {
            cgpResponse = 'Error Loading Results...';
            store.commit(types.SET_CGP_RESPONSE, cgpResponse);
            store.commit(types.SET_RESULTS_ERROR, true);
          } else {
            store.commit(types.SET_RESULTS_ERROR, false);
            store.commit(types.SET_CGP_RESPONSE, cgpResponse);
            store.commit(types.SET_CGP_RESULTS_LOADED, true);
          }
        } else {
          store.commit(types.SET_NO_RESULTS, true);
        }
        vm.$root.$emit('bv::show::modal', 'permit-results-modal');
      });
  },
  resetResultsLoaded(context) {
    const store = context;
    store.commit(types.SET_RESULTS_ERROR, false);
    store.commit(types.SET_NO_RESULTS, false);
    store.commit(types.SET_CGP_RESULTS_LOADED, false);
    store.commit(types.SET_MSGP_RESULTS_LOADED, false);
  },
  setMsgpFormToDefaults(context) {
    const store = context;
    const defaults = _.clone(store.state.msgpFormDataDefaults, true);
    store.commit(types.SET_MSGP_FORM_DATA, defaults);
  },
  setCgpFormToDefaults(context) {
    const store = context;
    const defaults = _.clone(store.state.cgpFormDataDefaults, true);
    store.commit(types.SET_CGP_FORM_DATA, defaults);
  },
};
