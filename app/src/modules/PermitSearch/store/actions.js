import types from './types';
import { AppAxios, commonAppStore } from '../../wadk/WADK';
import { EventBus } from '../../../EventBus';
import convert from "xml-js";
import parseXml from "../../wadk/utils/xmlTools";

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
  setFacilityCity(context, payload) {
    const store = context;

    store.commit(types.SET_FACILITY_CITY, payload);
  },
  setFacilityState(context, payload) {
    const store = context;

    store.commit(types.SET_FACILITY_STATE, payload);
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
  setApplicationType(context, payload) {
    const store = context;

    store.commit(types.SET_APPLICATION_TYPE, payload);
  },
  setFormStatus(context, payload) {
    const store = context;

    store.commit(types.SET_FORM_STATUS, payload);
  },
  setSector(context, payload) {
    const store = context;

    store.commit(types.SET_SECTOR, payload);
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

  // Note: this is not supposed to be in use yet. This is a reference
  // for the backend work that must be linked up to the form
  loadFormOptions(){
    AppAxios.get(state.urls[env].getPartnerXML + partnerCode + '.xml')
      .then((response) => {
        // @todo add sanity check for returned data
        const partnerJsonString = convert.xml2json(response.data, { compact: true });
        const partnerJson = JSON.parse(partnerJsonString);
        store.commit(types.UPDATE_PARTNER_XML, {
          partner,
          partnerJson,
        });

        const xml = parseXml(response.data);
        const request = {
          path: `BeWellInformed.partnerXmls[${partnerCode}]`,
          property: 'infoXML',
          value: xml,
          defaultValue: '',
        };

        rootStore.commit('SET_DEEP_PROPERTY', request);
        store.commit(types.UPDATE_PARTNER_RESOURCE);
      })
      .catch((...args) => {
        // @todo add sanity check for errors & visual prompt to the user
        app.$Progress.fail();
        console.warn('AppAxios fail: ', args);
      });
  }
};
