import convert from 'xml-js';
import { AppAxios, commonAppStore } from '../../adk/ADK';
import types from './types';

export default {
  ...commonAppStore.actions,
  // eslint-disable-next-line no-unused-vars
  setSelectedPartner(context, payload) {
    const store = this;
    store.commit(types.NAMESPACE + types.SET_SELECTED_PARTNER, payload);
  },
  // eslint-disable-next-line no-unused-vars
  fetchPartners(context, payload) {
    const store = this;

    if (!store.state.BeWellInformed.partners.length) {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      AppAxios.get(store.state.BeWellInformed.urls.getPartners)
        .then((response) => {
          // @todo add sanity check for returned data
          store.commit(types.NAMESPACE + types.UPDATE_PARTNERS, response.data);
        })
        .catch(() => {
        // @todo add sanity check for errors & visual prompt to the user
        // eslint-disable-next-line indent
      });
    }
  },
  fetchPartnerAndFlowchartXML(context, partnerCode) {
    const store = this;
    const state = store.state.BeWellInformed;
    const partner = state.selectedPartner;

    if (!state.partnerXmls[partnerCode]) {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      AppAxios.get(`${state.urls.getPartnerXML + partnerCode}.xml`)
        .then((response) => {
          // @todo add sanity check for returned data
          const partnerJsonString = convert.xml2json(response.data, { compact: true });
          const partnerJson = JSON.parse(partnerJsonString);
          store.commit(types.NAMESPACE + types.UPDATE_PARTNER_XML, {
            partner,
            partnerJson,
          });
          store.commit(types.NAMESPACE + types.UPDATE_PARTNER_RESOURCE);
        })
        .catch(() => {
          // @todo add sanity check for errors & visual prompt to the user
        });

      AppAxios.get(`${state.urls.getFlowchartXML + partnerCode}.xml`)
        .then((response) => {
          // @todo add sanity check for returned data
          const partnerJsonString = convert.xml2json(response.data, { compact: true });
          const partnerJson = JSON.parse(partnerJsonString);
          store.commit(types.NAMESPACE + types.UPDATE_PARTNER_FLOWCHART_XML, {
            partner,
            partnerJson,
          });
          store.commit(types.NAMESPACE + types.UPDATE_PARTNER_RESOURCE);
        })
        .catch(() => {
        // @todo add sanity check for errors & visual prompt to the user
        // eslint-disable-next-line indent
      });
    }
  },
  createWaterAnalysisRequest() {
    const store = this;
    const { state: { partnerResource } } = store;
    let { state: { waterAnalysisRequest } } = store;

    if (!store.state.waterAnalysisRequest && partnerResource) {
      waterAnalysisRequest = {
        stateCode: partnerResource.code,
      };
      Object.keys(partnerResource.flowchart.Flowcharts.Sections)
        .forEach((sectionMachineName) => {
          waterAnalysisRequest[sectionMachineName] = {};
          const contaminants = store.getters
            .getFlowchartContaminants(store.state, sectionMachineName);
          Object.keys(contaminants)
            .forEach((contaminant) => {
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
    store.commit(types.NAMESPACE + types.SET_WATER_ANALYSIS_REQUEST, waterAnalysisRequest);
  },
};
