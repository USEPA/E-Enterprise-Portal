export default {
  /**
   * Provides a way to grab the app to the store.
   * @param state
   * @returns {*}
   */
  getApp(state) {
    return state.app;
  },
  getDeepLink(state) {
    return state.deepLink;
  },
  getIsLoggedIn(state) {
    const logInCookie = document.cookie.match('(^|;) ?Token=([^;]*)(;|$)');
    return !!logInCookie;
  },
  /**
   * gets users TAndCCookie state
   */
  getTermsAndConditionsCookie() {
    const cookieState = document.cookie.match('(^|;) ?userTandC=([^;]*)(;|$)');
    return cookieState;
  },
  /**
   * gets users login preference state
   */
  getUserCookiePolicyDismiss() {
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
      environmentApiURL = 'https://apitest.e-enterprise.gov';
    } else {
      environmentApiURL = 'https://api.e-enterprise.gov';
    }
    return environmentApiURL;
  },
  getOldEEPURL(state, ref) {
    const environment = ref.getEnvironment;
    let getOldEEPURL = 'https://www2.e-enterprise.gov';
    if (environment === 'LOCAL') {
      getOldEEPURL = 'http://e-enterprise';
    } else if (environment === 'DEV') {
      getOldEEPURL = 'https://dev.e-enterprise.gov';
    } else if (environment === 'TEST') {
      getOldEEPURL = 'https://test.e-enterprise.gov';
    } else {
      getOldEEPURL = 'https://www2.e-enterprise.gov';
    }
    return getOldEEPURL;
  },
  getBasicPagesArray(state) {
    return state.basicPages.pagesArray;
  },
  getLoginViewAccounts(state) {
    return state.loginViewAccounts;
  },
  getDisplayLoggedInElements(state) {
    let loggedIn = false;
    if (state.user) {
      loggedIn = state.user.isLoggedIn;
    }
    return loggedIn;
  },
  getLoggedInToken(state) {
    return state.token.raw;
  },
  getEEPAPIURL: (state, ref) => variables => ((variables.params !== '') ? `${variables.endpoint}?${variables.params}`
    : `${variables.endpoint}`),
  getUserInitValidation(state) {
    const userInit = state.user.init;
    return (userInit.length > 0 && userInit[0].value.indexOf('@') < 1);
  },
  getFontScaleRatio(state) {
    return state.fontScaleRatio;
  },
};
