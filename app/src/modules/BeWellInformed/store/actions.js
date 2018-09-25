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
import parseXml from '../../adk/utils/xmlTools';
import types from './types';
import { EventBus } from '../../../EventBus';

export default {
  ...commonAppStore.actions,
  createWaterAnalysisRequest(context) {
    const store = context;
    const { partnerResource } = store.state;
    let { waterAnalysisRequest } = store.state;

    if (partnerResource) {
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
    const rootStore = this;
    const env = rootStore.getters.getEnvironment;
    const store = context;
    const app = store.rootGetters.getApp;
    const { state } = store;
    const partner = state.selectedPartner;
    const suffix = (env === 'LOCAL') ? '.xml' : '';

    if (!state.partnerXmls[partnerCode]) {
      AppAxios.get(state.urls[env].getPartnerXML + partnerCode + suffix)
        .then((response) => {
          // @todo add sanity check for returned data
          const partnerJsonString = convert.xml2json(response.data, { compact: true });
          const partnerJson = JSON.parse(partnerJsonString);
          store.commit(types.UPDATE_PARTNER_XML, {
            partner,
            partnerJson,
          });

          const xml = parseXml(response.data);
          const r = {
            path: `BeWellInformed.partnerXmls[${partnerCode}]`,
            property: 'infoXML',
            value: xml,
            defaultValue: '',
          };

          rootStore.commit('SET_DEEP_PROPERTY', r);
          store.commit(types.UPDATE_PARTNER_RESOURCE);
        })
        .catch(() => {
          // @todo add sanity check for errors & visual prompt to the user
          app.$Progress.fail;
          console.warn('AppAxios fail: ', arguments);
        });

      AppAxios.get(state.urls[env].getFlowchartXML + partnerCode + suffix)
        .then((response) => {
          // @todo add sanity check for returned data
          const partnerJsonString = convert.xml2json(response.data, { compact: true });
          const partnerJson = JSON.parse(partnerJsonString);
          store.commit(types.UPDATE_PARTNER_FLOWCHART_XML, {
            partner,
            partnerJson,
          });

          const xml = parseXml(response.data);
          const r = {
            path: `BeWellInformed.partnerXmls[${partnerCode}]`,
            property: 'flowchartXML',
            value: xml,
            defaultValue: '',
          };

          rootStore.commit('SET_DEEP_PROPERTY', r);
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
    const rootStore = this;
    const env = rootStore.getters.getEnvironment;
    const store = context;
    const app = store.rootGetters.getApp;

    if (!store.state.partners.length) {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      AppAxios.get(store.state.urls[env].getPartners)
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
    const rootStore = this;
    const env = rootStore.getters.getEnvironment;
    const { evt } = payload;
    const { vm } = payload;

    const store = context;
    const app = store.rootGetters.getApp;
    const { waterAnalysisRequest } = store.state;

    if (waterAnalysisRequest) {
      // Purge unsed values
      // const sections = store.getters.getPartnerSectors(store.state,
      // store.getters);
      const r = {};
      const sections = store.getters.getPartnerSectors;

      Object.keys(sections).forEach((section) => {
        r[section] = {};
        Object.keys(waterAnalysisRequest[section]).forEach((symbol) => {
          if (waterAnalysisRequest[section][symbol].Value
            || waterAnalysisRequest[section][symbol].Present) {
            r[section][symbol] = waterAnalysisRequest[section][symbol];
          }
        });
      });

      if (waterAnalysisRequest.InteractivePromptResponses) {
        r.InteractivePromptResponses = waterAnalysisRequest.InteractivePromptResponses;
      }

      let aa = null;
      if (env !== 'LOCAL') {
        const axiosConfig = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          transformRequest: [data => JSON.stringify(data.data)],
        };

        // eslint-disable-next-line vue/no-async-in-computed-properties
        aa = AppAxios.post(
          store.state.urls[env].submitPartnersData,
          r,
          axiosConfig,
        );
      } else {
        // handle local env endpoints when there is no service
        let endpoint = store.state.urls[env].submitPartnersData;
        if (store.state.interactivePrompts) {
          endpoint = store.state.urls[env].submitPartnersData2;
        }
        aa = AppAxios.get(endpoint);
      }

      aa.then((response) => {
        if (response.status === 200 && !!response.data) {
          const data = response.data;
          /**
             * If we get InteractivePrompts or AdditionalContaminantRequests
             * handle the various states of the returns from the service
              */

          if (data.InteractivePrompts.length) {
            store.commit(types.UPDATE_INTERACTIVE_PROMPTS, data.InteractivePrompts);
          } else {
            store.commit(types.UPDATE_INTERACTIVE_PROMPTS, []);
          }
          if (data.AdditionalContaminantRequests.length) {
            store.commit(types.UPDATE_ADDITIONAL_CONTAMINANT_REQUESTS,
              data.AdditionalContaminantRequests);
          } else {
            store.commit(types.UPDATE_ADDITIONAL_CONTAMINANT_REQUESTS, []);
          }
          if (!!data.InteractivePrompts.length
              || !!data.AdditionalContaminantRequests.length) {
            const bwiModalInteractive = vm.$refs.bwi_modal_interactive;

            vm.$root.$emit(
              'bv::show::modal', 'bwi-modal-interactive', bwiModalInteractive,
            );
          }
          /**
             * See if the response returns results for the test and proceed to
             * render as necessary
             */

          const hasResultEvaluations = !!Object.keys(data.ResultEvaluations).length;
          if (hasResultEvaluations) {
            store.commit(types.UPDATE_RESULT_EVALUATIONS, data.ResultEvaluations);
          } else {
            store.commit(types.UPDATE_RESULT_EVALUATIONS, {});
          }

          const hasTreatmentSteps = !!Object.keys(data.TreatmentSteps).length;
          if (hasTreatmentSteps) {
            store.commit(types.UPDATE_TREATMENT_STEPS,
              data.TreatmentSteps);
          } else {
            store.commit(types.UPDATE_TREATMENT_STEPS, {});
          }
          if (hasResultEvaluations || hasTreatmentSteps) {
            EventBus.$emit('bwi::showWaterAnalysisResults', {
              callee: this,
              value: 2,
            });
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
  updatePromptResponses(context, payload) {
    const store = context;
    const { question } = payload;
    const { promptType } = payload;
    const value = payload.$event;
    const { waterAnalysisRequest } = store.state;
    if (!Array.isArray(waterAnalysisRequest.InteractivePromptResponses)) {
      waterAnalysisRequest.InteractivePromptResponses = [];
    }
    let index = null;
    waterAnalysisRequest.InteractivePromptResponses.forEach((c, i) => {
      if (c.InteractionIdentifier === question.InteractionIdentifier) {
        index = i;
      }
    });

    const response = {};
    response.Symbol = question.Symbol;
    response.Interaction = value;
    response.InteractionIdentifier = question.InteractionIdentifier;

    const obj = {};
    obj.type = promptType;
    obj.response = response;
    obj.index = index;
    store.commit(types.UPDATE_QUESTION_RESPONSE, obj);
  },
  updateAdditionalContaminantProperty(context, payload) {
    const store = context;
  },
  updateWaterAnalysisRequestProperty(context, payload) {
    const rootStore = this;
    const r = {
      path: `BeWellInformed.waterAnalysisRequest.${payload.section}.${payload.contaminant._attributes.Value}`,
      property: payload.property,
      value: payload.event,
      defaultValue: payload.defaultValue || '',
    };

    rootStore.commit('SET_DEEP_PROPERTY', r);
  },
  setSelectedPartner(context, payload) {
    const store = context;
    store.commit(types.SET_SELECTED_PARTNER, payload);
  },
};
