/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly.  Methods may provide
 * calculations based off the store's state values, such as filters.
 *
 * @SEE https://vuex.vuejs.org/guide/getters.html
 */
export default {
  getApiUrl: (state, getters, rootState, rootGetters) => (urlName) => {
    const envApiUrl = rootGetters.getEnvironmentApiURL;
    let response = `${envApiUrl}/${state.api.urls[urlName]}`;
    if (state.api.urls[urlName].search(/http[s]?:/) > -1) {
      response = state.api.urls[urlName];
    } else if (state.api.urls[urlName].search(/internal:/) > -1) {
      const { origin } = window.location;
      const url = state.api.urls[urlName].replace(/internal:/, '');
      response = `${origin}/${url}`;
    }
    return response;
  },
};
