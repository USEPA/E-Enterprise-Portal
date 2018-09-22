/* eslint-disable no-unused-vars */
/**
 * Methods added here are available to the BeWellInformed application. Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators by using store.commit(). Async tasks should be created here.
 *
 * NOTE: In each action, the variable `context` is the local store from
 * which the action was called.
 *
 * @SEE https://vuex.vuejs.org/guide/actions.html
 */

import convert from 'xml-js';
import { AppAxios, commonAppStore } from '../../adk/ADK';
import types from './types';

export default {
  ...commonAppStore.actions,
  createWaterAnalysisRequest(context) {
    const store = context;
    const { partnerResource } = store.state;
    let { waterAnalysisRequest } = store.state;

    if (!store.state.waterAnalysisRequest && partnerResource) {
      waterAnalysisRequest = {
        stateCode: partnerResource.code,
      };
      Object.keys(partnerResource.flowchart.FlowCharts.Sections)
        .forEach((sectionMachineName) => {
          waterAnalysisRequest[sectionMachineName] = {};
          const contaminants = store.getters
            .getFlowchartContaminants(sectionMachineName);
          Object.keys(contaminants)
            .forEach((index) => {
              // eslint-disable-next-line no-underscore-dangle
              const contaminant = contaminants[index]._attributes;
              // Set default values
              waterAnalysisRequest[sectionMachineName][contaminant.Value] = {
                Symbol: contaminant.Value,
                Name: contaminant.Text,
                Value: '',
                Unit: contaminant.DefaultUnit,
                Present: '',
              };
            });
        });
    }
    store.commit(types.SET_WATER_ANALYSIS_REQUEST, waterAnalysisRequest);
  },
  fetchPartnerAndFlowchartXML(context, partnerCode) {
    const store = context;
    const app = store.rootGetters.getApp;
    const { state } = store;
    const partner = state.selectedPartner;

    if (!state.partnerXmls[partnerCode]) {
      AppAxios.get(`${state.urls.getPartnerXML + partnerCode}.xml`)
        .then((response) => {
          // @todo add sanity check for returned data
          const partnerJsonString = convert.xml2json(response.data, { compact: true });
          const partnerJson = JSON.parse(partnerJsonString);
          store.commit(types.UPDATE_PARTNER_XML, {
            partner,
            partnerJson,
          });
          store.commit(types.UPDATE_PARTNER_RESOURCE);
        })
        .catch(() => {
          // @todo add sanity check for errors & visual prompt to the user
          app.$Progress.fail;
          console.warn('AppAxios fail: ', arguments);
        });

      AppAxios.get(`${state.urls.getFlowchartXML + partnerCode}.xml`)
        .then((response) => {
          // @todo add sanity check for returned data
          const partnerJsonString = convert.xml2json(response.data, { compact: true });
          const partnerJson = JSON.parse(partnerJsonString);
          store.commit(types.UPDATE_PARTNER_FLOWCHART_XML, {
            partner,
            partnerJson,
          });
          store.commit(types.UPDATE_PARTNER_RESOURCE);
        })
        .catch(() => {
          // @todo add sanity check for errors & visual prompt to the user
          app.$Progress.fail;
          console.warn('AppAxios fail: ', arguments);
        });
    }
  },
  fetchPartners(context) {
    const store = context;
    const app = store.rootGetters.getApp;

    if (!store.state.partners.length) {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      AppAxios.get(store.state.urls.getPartners)
        .then((response) => {
          // @todo add sanity check for returned data
          store.commit(types.UPDATE_PARTNERS, response.data);
        })
        .catch(() => {
          // @todo add sanity check for errors & visual prompt to the user
          app.$Progress.fail;
          console.warn('AppAxios fail: ', arguments);
        });
    }
  },
  submitPartnersData(context, payload) {
    const { evt } = payload;
    const { vm } = payload;

    const store = context;
    const app = store.rootGetters.getApp;
    const { waterAnalysisRequest } = store.state;

    if (waterAnalysisRequest) {
      /* const axiosConfig = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        transformRequest: [data => JSON.stringify(data.data)],
      };

      // eslint-disable-next-line vue/no-async-in-computed-properties
      AppAxios.post(
        store.state.urls.submitPartnersData,
        waterAnalysisRequest,
        axiosConfig,
      ) */
      AppAxios.get(store.state.urls.submitPartnersData)
        .then((response) => {
          if (response.status === 200 && !!response.data) {
            const data = response.data;
            if (data.InteractivePrompts.length) {
              store.commit(types.UPDATE_INTERACTIVE_PROMPTS, data.InteractivePrompts);
            }
            if (data.AdditionalContaminantRequests.length) {
              store.commit(types.UPDATE_ADDITIONAL_CONTAMINANT_REQUESTS,
                data.AdditionalContaminantRequests);
            }
            if (!!data.InteractivePrompts.length
              || !!data.AdditionalContaminantRequests.length) {
              const bwiModalInteractive = vm.$refs.bwi_modal_interactive;

              vm.$root.$emit(
                'bv::show::modal', 'bwi-modal-interactive', bwiModalInteractive,
              );
            }
          }
        })
        .catch(() => {
          // @todo add sanity check for errors & visual prompt to the user
          app.$Progress.fail;
          console.warn('AppAxios fail: ', arguments);
        });
    }
  },
  updateWaterAnalysisRequestProperty(context, payload) {
    const store = context;
    const r = {
      path: `BeWellInformed.waterAnalysisRequest.${payload.section}.${payload.contaminant._attributes.Value}`,
      property: payload.property,
      value: payload.event,
      defaultValue: payload.defaultValue || '',
    };

    this.commit('SET_DEEP_PROPERTY', r);
  },
  setSelectedPartner(context, payload) {
    const store = context;
    store.commit(types.SET_SELECTED_PARTNER, payload);
  },
};
