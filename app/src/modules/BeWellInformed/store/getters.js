import { commonAppStore } from '../../adk/ADK';

export default {
  ...commonAppStore.getters,
  getStateAndTribes(state) {
    return state.stateAndTribes;
  },
};
