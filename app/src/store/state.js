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
        isLoggedIn: false,
        id: 0,
        userName: '',
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
        UserPolicyCookieDismiss: false,
        userObject: {},
    },
    loginBtnHoverMessage: 'Use an EPA, CDX, or a social media account to login',
    navMargin: {
        'margin-top': 0,
    },
    loginPageAccounts:{
        epa: [],
        socialmedia: [],


    },
    // loginPageAccounts: {
    //     EPA: {
    //         cdx: {
    //             name: 'CDX/Exchange Network',
    //         },
    //         wam: {
    //             name: 'EPA LAN / WAM ID',
    //         },
    //         smartCard: {
    //             name: 'PIV Smart Card',
    //         },
    //     },
    //     socialmedia: {
    //         facebook: {
    //             name: 'Facebook',
    //             sitePath: 'https://www.facebook.com/login.php?skip_api_login=1&api_key=955372744509154&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.9%2Fdialog%2Foauth%3Fredirect_uri%3Dhttps%253A%252F%252Fextauthdev.epacdxnode.net%252Fresponse%26scope%3Dpublic_profile%252Cemail%252Cemail%26client_id%3D955372744509154%26ret%3Dlogin%26logger_id%3Df18394d1-1187-58dc-cde9-74dc31c87961&cancel_url=https%3A%2F%2Fextauthdev.epacdxnode.net%2Fresponse%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%23_%3D_&display=page&locale=en_US&logger_id=f18394d1-1187-58dc-cde9-74dc31c87961',
    //         },
    //         twitter: {
    //             name: 'Twitter',
    //             sitePath: 'https://api.twitter.com/oauth/authorize?oauth_token=cdXz2wAAAAAAgDSdAAABZ8ckyXQ',
    //         },
    //     },
    //     state: {
    //         NM: {
    //             name: 'New Mexico DEQ',
    //             sitePath: 'https://sep.net-t.env.nm.gov/sep-envt/login-form?applicationId=OPEN_ID',
    //         },
    //     },
    //     tribal: {},
    // },
    loginViewAccounts: {
        epa: [],
        socialMedia: [],
        state: [],
        tribal: []
    },
    GETHeaders: {
        'crossDomain': true,
        'cache-control': 'no-cache',
        'Content-Type': 'application/hal+json',
    },
    taxonomy_data: {},
};

export default state;
