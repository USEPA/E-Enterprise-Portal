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
import { AppAxios, commonAppStore } from '../../wadk/WADK';
import parseXml from '../../wadk/utils/xmlTools';
import types from './types';
import { EventBus } from '../../../EventBus';

export default {
  /**
   * Importing shared actions from the WADK's store
   */
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
    const partnerUrl = store.getters.getApiUrl('getPartnerXML');
    const flowchartUrl = store.getters.getApiUrl('getFlowchartXML');

    if (!state.partnerXmls[partnerCode]) {
      AppAxios.get(`${partnerUrl + partnerCode}.xml`)
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

      AppAxios.get(`${flowchartUrl + partnerCode}.xml`)
        .then((response) => {
          // @todo add sanity check for returned data
          const partnerJsonString = convert.xml2json(response.data, { compact: true });
          const partnerJson = JSON.parse(partnerJsonString);
          store.commit(types.UPDATE_PARTNER_FLOWCHART_XML, {
            partner,
            partnerJson,
          });

          const xml = parseXml(response.data);
          const request = {
            path: `BeWellInformed.partnerXmls[${partnerCode}]`,
            property: 'flowchartXML',
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
  },
  fetchPartners(context) {
    const rootStore = this;
    const env = rootStore.getters.getEnvironment;
    const store = context;
    const app = store.rootGetters.getApp;

    if (!store.state.partners.length) {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      const partnersUrl = store.getters.getApiUrl('getPartners');

      AppAxios.get(partnersUrl)
        .then((response) => {
          // @todo add sanity check for returned data
          store.commit(types.UPDATE_PARTNERS, response.data);
        }).catch((...args) => {
        // @todo add sanity check for errors & visual prompt to the user
          app.$Progress.fail();
          console.warn('AppAxios fail: ', args);
        });
    }
  },
  submitPartnersData(context, payload) {
    const rootStore = this;
    const env = rootStore.getters.getEnvironment;
    const { vm } = payload;

    const store = context;
    const app = store.rootGetters.getApp;
    const { waterAnalysisRequest } = store.state;
    const selectedPartner = store.getters.getSelectedPartner;
    const partnerCode = selectedPartner.code;

    if (waterAnalysisRequest) {
      const rawWaterAnalysisRequest = store.getters.getRawWaterAnalysisRequest();
      const isRequestEmpty = store.getters.isWaterAnalysisRequestEmpty();

      if (!isRequestEmpty) {
        const axiosConfig = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const bwiServiceUrl = store.getters.getApiUrl('bwiService');

        // eslint-disable-next-line vue/no-async-in-computed-properties
        AppAxios
          .post(
            bwiServiceUrl,
            JSON.stringify(rawWaterAnalysisRequest),
            axiosConfig,
          )
          .then((response) => {
            if (response.status === 200 && !!response.data) {
              const { data } = response;
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
              if (data.InteractivePrompts.length
                || data.AdditionalContaminantRequests.length) {
                const bwiModalInteractive = vm.$refs.bwi_modal_interactive;

                vm.$root.$emit(
                  'bv::show::modal', 'bwi-modal-interactive', bwiModalInteractive,
                );
              }
              /**
               * See if the response returns results for the test and proceed to
               * render as necessary
               */

              const hasResultEvaluation = !!Object.keys(data.ResultEvaluations).length;
              const hasTreatmentSteps = !!Object.keys(data.TreatmentSteps).length;

              // Check if we have a fully formed response then add it to the
              if (hasResultEvaluation || hasTreatmentSteps) {
                data.StateCode = partnerCode;
                store.commit(types.SET_WATER_ANALYSIS_RESULT, data);
                store.commit(types.UNSHIFT_WATER_ANALYSIS_RESULT, data);
                EventBus.$emit('bwi::showWaterAnalysisResults', {
                  callee: this,
                  value: 2,
                });
              }
            }
          })
          .catch((...args) => {
            // @todo add sanity check for errors & visual prompt to the user
            const res = Array.prototype.shift.call(args);

            if (res instanceof Error) {
              console.warn(res.message);
            }

            app.$Progress.fail();
            console.warn('AppAxios fail: ', args);
          });
      }
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
  updateWaterAnalysisRequestProperty(context, payload) {
    const rootStore = this;
    const request = {
      path: `BeWellInformed.waterAnalysisRequest.${payload.section}.${payload.contaminant._attributes.Value}`,
      property: payload.property,
      value: payload.event,
      defaultValue: payload.defaultValue || '',
    };

    rootStore.commit('SET_DEEP_PROPERTY', request);
  },
  setSelectedPartner(context, payload) {
    const store = context;
    store.commit(types.SET_SELECTED_PARTNER, payload);
    store.commit(types.UPDATE_PARTNER_RESOURCE);
  },
  updateSelectedPartner(context) {
    const store = context;
    const rootStore = this;

    // So if the dropdown is already selected we do nothing
    if (store.selectedPartner == null) {
      // If there is an option we can update to it; the select options are
      // driven by "partners"
      const { partners } = store.state;
      const { state } = rootStore.state.user.location;
      const newSelectedpartners = partners.filter(partner => partner.code == state);
      if (newSelectedpartners.length) {
        store.commit(types.SET_SELECTED_PARTNER, newSelectedpartners[0]);
      }
    }
  },
  downloadPDF(context) {
    // @todo this form submission method can be extracted because it duplicates code from My Reporting
    const store = context;
    const rootStore = this;
    const apiURL = rootStore.getters.getEnvironmentApiURL;
    let waterResults = store.getters.getWaterAnalysisResults;
    let infoXML = store.getters.getPartnerXmls;
    const payload = {'results': waterResults, 'info': infoXML, 'treatment_title': store.getters.getWaterTreatmentTitle}
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', `${apiURL}/eep_generate_pdf/water_analysis_results_pdf_template`);
    form.setAttribute('target', '_blank');
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'payload';
    input.value = JSON.stringify(payload);
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
};
