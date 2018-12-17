export default {
  /**
   * Provides a way to grab the app to the store.
   * @param state
   * @returns {*}
   */
  getApp(state) {
    return state.app;
  },
  getUserAuthentication(state) {
    return state.user.authenticated;
  },
  getUserFullName(state) {
    let fullname = '';
    const userName = state.user.name;
    const nameParts = [userName.prefix, userName.first, userName.last, userName.suffix];
    fullname = nameParts
      .filter((namePart) => (namePart && namePart.length))
      .join(' ');
    return fullname;
  },
  /**
   * gets users TAndCCookie state
   */
  getTAndCCookieDismiss() {
    const cookieState = document.cookie.match('(^|;) ?userTandC=([^;]*)(;|$)');
    console.log(cookieState);
    return cookieState;
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
    return state.user.location;
  },
  getUser(state) {
    return state.user;
  },
  getURL: (state, ref) => urlName => state.urls[ref.getEnvironment][urlName],
  getBridgeURL(state, ref) {
    const env = ref.getEnvironment;
    let url = '#';
    const bridgeSettings = state.bridgeSettings[env];
    if (bridgeSettings) {
      url = `${bridgeSettings.issuer}?wtrealm=${encodeURI(bridgeSettings.relyingParty)
      }&wreply=${encodeURI(bridgeSettings.sendBridgeBackTo)}&whr=urn:ENNAAS&wa=${bridgeSettings.signInMethod}`;
    }
    return url;
  },
  getloginBtnHoverMessage(state){
    return state.loginBtnHoverMessage;
  },
  getnavMargin(state){
    return state.navMargin;
  },
  getloginPageAccounts(state){
    return state.loginPageAccounts;
  },
};
