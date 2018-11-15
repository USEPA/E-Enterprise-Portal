export default {
  /**
   * Provides a way to grab the app to the store.
   * @param state
   * @returns {*}
   */
  getApp(state) {
    return state.app;
  },
  /**
   * This function tests the domain name to help determine the environment
   * that the app is running under.
   * @returns {string}
   */
  getEnvironment() {
    let env = 'LOCAL';
    const { host } = window.location;
    let m;

    const regex = {
      LOCAL: /(localhost|local|^e-enterprise$)/gm,
      DEV: /dev\d?\.e-enterprise/gm,
      TEST: /test\d?\.e-enterprise/gm,
      PROD: /^e-enterprise\.gov/gm,
    };

    Object.keys(regex).forEach((envName) => {
      m = regex[envName].exec(host);
      if (m !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.length) {
          env = envName;
        }
      }
    });

    // FORCING ENV FOR TESTING
    // env = 'DEV';
    return env;
  },
  getLocation(state) {
    return state.location;
  },
  getUser(state){
    return state.user;
  },
  getLocationSearchURL(state, ref){
    const locationSearchURL = state.urls[ref.getEnvironment].locationSearch;
    return locationSearchURL;
  },
  getBridgeURL(state, ref) {
    const env = ref.getEnvironment;
    let url = '#';
    const bridgeSettings = state.bridgeSettings[env];
    if (bridgeSettings) {
      url = bridgeSettings.issuer + "?wtrealm=" + encodeURI(bridgeSettings.relyingParty) +
        '&wreply=' + encodeURI(bridgeSettings.sendBridgeBackTo) + "&whr=urn:ENNAAS&wa=" + bridgeSettings.signInMethod;
    }
    return url;
  }
};
