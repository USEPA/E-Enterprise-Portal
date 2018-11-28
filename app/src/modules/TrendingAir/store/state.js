/**
 * Values added here are available to all workbench applications.  These
 * should be initial data states and values. No methods.
 *
 * @SEE https://vuex.vuejs.org/guide/state.html
 */

export default {
  // @todo Remove POC "user" and add meaningful intial state values
  user: {
    id: 0,
    roles: [
      'admin',
      'logged in',
      'authenitcated',
    ],
  },
  airMonitoringStations: ['Chicago, IL', 'Durham, NC', 'Hartford, CT', 'Houston, TX', 'Kansas City, KS',
    'Oklahoma City, OK', 'Philadelphia, PA', 'Washington, DC'],
  airMonitoringStationsWithSiteIDs: {
    'Chicago, IL': 24607,
    'Durham, NC': 24290,
    'Hartford, CT': 24538,
    'Houston, TX': 24945,
    'Kansas City, KS': 24294,
    'Oklahoma City, OK': 24291,
    'Philadelphia, PA': 24292,
    'Washington, DC': 24293,
  },
  defaultSeletcedLocation: 'Chicago, IL',
  newUpdatedLocation: '',
  currentLocation: 'Chicago, IL',

  urls: {
    LOCAL: {
      villageGreenApiUrl: 'https://e-enterprise/eep/proxy/service/vg',
    },
    DEV: {
      villageGreenApiUrl: 'https://apidev2.e-enterprise.gov/eep/proxy/service/vg',
    },
    TEST: {
      villageGreenApiUrl: 'https://apitest.e-enterprise.gov/eep/proxy/service/vg',
    },
    PROD: {
      villageGreenApiUrl: 'https://api.e-enterprise.gov/eep/proxy/service/vg',
    },
  },
  currentEnviroment: 'DEV',
  currentSelectedLocationInforation: {
    siteid: '',
    locationCity: '',
    locationState: '',
    curHumUnit: '',
    curHumValue: '',
    curOzoneUnit: '',
    curOzoneValue: '',
    curPmUnit: '',
    curPmValue: '',
    curTempUnit: '',
    curTempValue: '',
    curWDValue: '',
    curWSUnit: '',
    curWSValue: '',
    currentDateTime: '',
    currentDateTimeUTCMillis: '',
    timezone: '',
  },
};

