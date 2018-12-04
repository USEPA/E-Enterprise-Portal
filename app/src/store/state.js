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
    }
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


