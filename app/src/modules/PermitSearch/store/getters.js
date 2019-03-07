/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly.  Methods may provide
 * calculations based off the store's state values, such as filters.
 *
 * @SEE https://vuex.vuejs.org/guide/getters.html
 */
import { commonAppStore } from '../../wadk/WADK';

export default {
  ...commonAppStore.getters,
  sampleGetter(state) {
    return state.sampleProperty;
  },
  sampleGetterWithParam: (state, getters) => (propertyName) => {
    const name = getters.sampleGetter[propertyName];
    return name;
  },
};
