/* eslint-disable import/prefer-default-export */

const state = {
  app: null,
  bridgeSettings: {
    LOCAL: {
      relyingParty: 'https://apidev2.e-enterprise.gov/',
      issuer: 'https://extauthdev.epacdxnode.net',
      sendBridgeBackTo: 'https://apidev2.e-enterprise.gov/user/authenticate',
      signInMethod: 'wsignin1.0',
    },
    DEV: {
      relyingParty: 'https://apidev2.e-enterprise.gov/',
      issuer: 'https://extauthdev.epacdxnode.net',
      sendBridgeBackTo: 'https://apidev2.e-enterprise.gov/user/authenticate',
      signInMethod: 'wsignin1.0',
    },
    TEST: {
      relyingParty: 'https://apitest2.e-enterprise.gov/',
      issuer: 'https://extauthtest.epacdxnode.net',
      sendBridgeBackTo: 'https://apitest2.e-enterprise.gov/user/authenticate',
      signInMethod: 'wsignin1.0',
    },
  },
  ui: {
    hasLocationSearch: true,
  },
  urls: {
    LOCAL: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location',
      geolocationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/geolocation',
    },
    DEV: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location',
      geolocationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/geolocation',
    },
    TEST: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location',
      geolocationSearch: 'https://apitest.e-enterprise.gov/eep/proxy/service/geolocation',
    },
    PROD: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location',
      geolocationSearch: 'https://api.e-enterprise.gov/eep/proxy/service/geolocation',
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
    authenticated: false,
    id: 0,
    location: {
      zipcode: '',
      city: '',
      state: '',
    },
    name: {
      prefix: '',
      first: '',
      last: '',
      suffix: '',
    },
    tAndCCookieDismiss: false,
  },
  loginBtnHoverMessage: 'Use an EPA, CDX, or a social media account to login',
  navMargin: {
    'margin-top': 0
  },
  loginPageAccounts: {
    EPA: {},
    socialmedia: {},
    state: {
      NM: {
        name: 'New Mexico DEQ',
        sitePath: 'https://sep.net-t.env.nm.gov/sep-envt/login-form?applicationId=OPEN_ID',
      },
    },
    tribal: {}
  },
};

export default state;
