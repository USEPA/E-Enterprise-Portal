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
      geolocationSearch: 'http://localhost:8080/eep/proxy/service/geolocation',
    },
    DEV: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location',
      geolocationSearch: 'http://apidev2.e-enterprise.gov/eep/proxy/service/geolocation',
    },
    TEST: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location',
      geolocationSearch: 'http://apitest.e-enterprise.gov/eep/proxy/service/geolocation',
    },
    PROD: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location',
      geolocationSearch: 'http://api.e-enterprise.gov/eep/proxy/service/geolocation',
    },
  },
  user: {
    id: 0,
    location: {
      zipcode: '',
      city: '',
      state: '',
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
  urls: {
    LOCAL: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location?',
    },
    DEV: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location?',
    },
    TEST: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location?',
    },
    PROD: {
      locationSearch: 'https://apidev2.e-enterprise.gov/eep/proxy/service/location?',
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
      suffix: ''
    },
  },
};

export default state;


