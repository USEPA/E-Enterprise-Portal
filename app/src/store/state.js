/* eslint-disable import/prefer-default-export */

const state = {
  api: {
    urls: {
      locationSearch: 'eep/proxy/service/location',
      geolocationSearch: 'eep/proxy/service/geolocation',
      workbenchApplications: 'api/view/workbench-applications',
      authenticationOptions: 'api/authentication-category-options',
      taxonomyTerms: 'api/authentication_category_taxonomy_terms',
    },
  },
  app: null,
  basicPages: {
    pagesArray: [],
  },
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
      relyingParty: 'https://apitest.e-enterprise.gov/',
      issuer: 'https://extauthtest.epacdxnode.net',
      sendBridgeBackTo: 'https://apitest.e-enterprise.gov/authenticate/user',
      signInMethod: 'wsignin1.0',
    },
  },
  currentBridgeUrn: '',
  deepLinking: null,
  ui: {
    hasLocationSearch: true,
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
    loggedInTime: '',
    name: '',
    mail: '',
    favoriteLinks: [],
    isAfterInputDropdownDisplayed: true,
    firstTimeSelectButtonClicked: 0,
    displayWhenNewLocationIsClicked: '',
    optionsAfterInput: [],
    loaded: false,
    init: [],
    organizations: [],
    roles: [],
    userLocationsFromLoad:[],
    userFavoriteLocation: [],
    location: {
      zipcode: '',
      city: '',
      state: '',
    },
    termsAndConditionsCookie: false,
    UserPolicyCookieDismiss: false,
    userObject: {},
    cookie: {
      time: '',
      time_units: '',
    },
    inputBoxText: '',
    displayNewLocation: true,
    dropDownSelection: '',
    userSavedLocations: [],
    dropDownLabel: '',
    isCurrentDropdownZipcodeWithTribes: false,
    tribesArray: [],
    extendSessionModalMessage: 'Your session will expire in 1 minute(s). If you choose not to extend, then you will be logged out. Would you like to extend your session?',
    displayLoginAgainButtonOnModal: 'none',
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
};

export default state;
