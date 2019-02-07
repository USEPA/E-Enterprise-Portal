/* eslint-disable import/prefer-default-export */

const state = {
  app: null,
  basicPages: {
    pagesArray: [],
  },
  currentBridgeUrn: '',
  bridgeSettings: {
    LOCAL: {
      relyingParty: 'https://apidev2.e-enterprise.gov/',
      issuer: 'https://extauthdev.epacdxnode.net',
      sendBridgeBackTo: 'https://apidev2.e-enterprise.gov/authenticate/user',
      signInMethod: 'wsignin1.0',
    },
    DEV: {
      relyingParty: 'https://apidev2.e-enterprise.gov/',
      issuer: 'https://extauthdev.epacdxnode.net',
      sendBridgeBackTo: 'https://apidev2.e-enterprise.gov/authenticate/user',
      signInMethod: 'wsignin1.0',
    },
    TEST: {
      relyingParty: 'https://apitest2.e-enterprise.gov/',
      issuer: 'https://extauthtest.epacdxnode.net',
      sendBridgeBackTo: 'https://apitest2.e-enterprise.gov/authenticate/user',
      signInMethod: 'wsignin1.0',
    },
  },
  ui: {
    hasLocationSearch: true,
  },
  api: {
    urls: {
      locationSearch: 'eep/proxy/service/location',
      geolocationSearch: 'eep/proxy/service/geolocation',
      workbenchApplications: 'api/view/workbench-applications',
    },
  },
  token: {
    raw: '',
    decoded: {
      header: null,
      payload: null,
      signature: null,
    },
  },
  user: {
    id: 0,
    isLoggedIn: false,
    timeLeftUntilLogout: 0,
    loggedInTime: null,
    name: '',
    mail: '',
    favorite_links: [],
    organisation:'',
    role:'',
    location: {
      zipcode: '',
      city: '',
      state: '',
    },
    tAndCCookieDismiss: false,
    UserPolicyCookieDismiss: false,
    userObject: {},
  },
  loginBtnHoverMessage: 'Use an EPA, CDX, or a social media account to login',
  navMargin: {
    'margin-top': 0,
  },
  loginViewAccounts: [],
  GETHeaders: {
      'crossDomain': true,
      'cache-control': 'no-cache',
      'Content-Type': 'application/hal+json',
  },
  cookie:{
      time: '',
      time_units: ''
  }

};

export default state;
