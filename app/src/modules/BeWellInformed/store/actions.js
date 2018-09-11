import { AppAxios, commonAppStore } from '../../adk/ADK';
import types from './types';

export default {
  ...commonAppStore.actions,
  fetchStatesAndTribes(context, payload) {
    const store = this;

    if (!store.state.BeWellInformed.stateAndTribes.length) {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      AppAxios.get('http://localhost:8080/sample_data/stateAndTribes.json')
        .then((response) => {
          // @todo add sanity check for returned data
          store.commit(types.NAMESPACE + types.UPDATE_STATE_AND_TRIBE, response.data);
        })
        .catch(() => {
        // @todo add sanity check for errors & visual prompt to the user
      });
    }
  },
};
