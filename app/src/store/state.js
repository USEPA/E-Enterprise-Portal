/* eslint-disable import/prefer-default-export */

const state = {
  app: null,
  user: {
    id: 0,
    location: {
      zipcode: '',
      city: '',
      state: '',
    },
  },
  location: '',
  url: 'http://e-enterprise/eep/proxy/service/location?',
  //url: 'http://localhost:8082/sample_data/LocationSearch-1.json',
  bridgeSettings: {
    LOCAL: {
      relyingParty: 'https://apidev2.e-enterprise.gov/',
      issuer: 'https://extauthdev.epacdxnode.net',
      sendBridgeBackTo: 'https://apidev2.e-enterprise.gov/user/authenticate',
      signInMethod: 'wsignin1.0'
    },
    DEV: {
      relyingParty: 'https://apidev2.e-enterprise.gov/',
      issuer: 'https://extauthdev.epacdxnode.net',
      sendBridgeBackTo: 'https://apidev2.e-enterprise.gov/user/authenticate',
      signInMethod: 'wsignin1.0'
    },
    TEST: {
      relyingParty: 'https://apitest2.e-enterprise.gov/',
      issuer: 'https://extauthtest.epacdxnode.net',
      sendBridgeBackTo: 'https://apitest2.e-enterprise.gov/user/authenticate',
      signInMethod: 'wsignin1.0'
    }
  }
};

export default state;
