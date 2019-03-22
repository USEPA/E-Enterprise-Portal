/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly.  Methods may provide
 * calculations based off the store's state values, such as filters.
 *
 * @SEE https://vuex.vuejs.org/guide/getters.html
 */
export default {
  getLayout(state) {
    return state.layout;
  },
  isLayoutReady(state) {
    let ready = false;
    if (state.layout.length) {
      ready = true;
    }
    return ready;
  },
  /**
   * Matching the alias (direct link) with the wapp id needed to jump to the app
   * @param state
   * @returns {function(*=) : any}
   */
  getDirectLinksMappings: (state) => (alias) => {
    const keys = Object.keys(state.directLinkMappings);
    const links = keys.filter(key => state.directLinkMappings[key].indexOf(alias) > -1);
    return (links.length) ? links[0] : null;
  },
};
