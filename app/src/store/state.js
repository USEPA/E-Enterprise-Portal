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
        isLoggedIn: false,
        id: 0,
        name: '',
        mail: '',
        favorite_links: [],
        userName: '',
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
    loginViewAccounts: []
    ,GETHeaders: {
        'crossDomain': true,
        'cache-control': 'no-cache',
        'Content-Type': 'application/hal+json',
    },
};

export default state;