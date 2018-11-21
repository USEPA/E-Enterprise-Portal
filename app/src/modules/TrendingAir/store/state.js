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
  airMonitoringStations: ['Chicago, IL', 'Durham, NC', 'Hartford, CT', 'Kansas City, KS',
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
  lastWeatherReading: 'Mon 1:36 PM EDT',
};
