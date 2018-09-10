import { commonAppStore } from '../../adk/ADK';
import types from './types';

export default {
  ...commonAppStore.mutations,
  [types.UPDATE_STATE_AND_TRIBE](state, obj) {
    // eslint-disable-next-line no-param-reassign
    state.stateAndTribes = obj;
  },
};
