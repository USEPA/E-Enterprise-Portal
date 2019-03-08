/**
 * Values added here are available to all workbench applications.  These
 * should be initial data states and values. No methods.
 *
 * @SEE https://vuex.vuejs.org/guide/state.html
 */

export default {
  permitType: 'Select...',
  facilityName: '',
  NPDESID: '',
  cityName: '',
  stateTerritory: '',
  zip:'',
  formOptions: {
    permitType: [
      'Construction General Permit',
      'Multi-sector General Permit',
    ],
    stateTerritory: [
      'cool place',
      'cooler place',
    ]
  },
};
