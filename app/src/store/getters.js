export default {
  /**
   * Provides a way to grab the app to the store.
   * @param state
   * @returns {*}
   */
  getApp(state) {
    return state.app;
  },
  getIsLoggedIn(state) {
    const logInCookie = document.cookie.match('(^|;) ?Token=([^;]*)(;|$)');
    return !!logInCookie;
  },
  /**
   * gets users TAndCCookie state
   */
  getTAndCCookieDismiss() {
    const cookieState = document.cookie.match('(^|;) ?userTandC=([^;]*)(;|$)');
    return cookieState;
  },
  /**
   * gets users login preference state
   */
  getUserPolicyCookieDismiss() {
    const cookieState = document.cookie.match('(^|;) ?userPolicy=([^;]*)(;|$)');
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
  getUser(state) {
    return state.user;
  },
  getApiUrl: (state, ref) => (urlName) => {
    const envApiUrl = ref.getEnvironmentApiURL;
    return `${envApiUrl}/${state.api.urls[urlName]}`;
  },
  getBridgeURL(state, ref) {
    const env = ref.getEnvironment;
    let url = '#';
    const bridgeSettings = state.bridgeSettings[env];
    if (bridgeSettings) {
      url = `${bridgeSettings.issuer}?wtrealm=${encodeURI(bridgeSettings.relyingParty) 
        }&wreply=${encodeURI(bridgeSettings.sendBridgeBackTo)}&whr=urn:${state.currentBridgeUrn
        }&wa=${bridgeSettings.signInMethod}`;
    }
    return url;
  },
  getloginBtnHoverMessage(state) {
    return state.loginBtnHoverMessage;
  },
  getnavMargin(state) {
    return state.navMargin;
  },
  getLoginPageAccounts(state) {
    return state.loginPageAccounts;
  },
  getUserObject(state) {
    return state.user.userObject;
  },
  getEnvironmentApiURL(state, ref) {
    const environment = ref.getEnvironment;
    let environmentApiURL = 'https://apidev2.e-enterprise.gov';
    if (environment === 'LOCAL') {
      environmentApiURL = 'http://e-enterprise';
    } else if (environment === 'DEV') {
      environmentApiURL = 'https://apidev2.e-enterprise.gov';
    } else if (environment === 'TEST') {
      environmentApiURL = 'https://apitest2.e-enterprise.gov';
    }
    return environmentApiURL;
  },
  getBasicPagesArray(state) {
    return state.basicPages.pagesArray;
  },
  getLoginViewAccounts(state){
      return state.loginViewAccounts;
  },
  getDisplayLoggedInElements(state){
      let loggedIn = false;
      if(state.user){
          loggedIn = state.user.isLoggedIn;
      }
      return loggedIn;
  },
  getLoggedInToken(state){
    return state.token.raw;
  },
  getEEPAPIURL: (state, ref) => (variables) => {
    console.log(variables.endpoint + '?' + variables.params);
    return variables.endpoint + '?' + variables.params;
  },
};
