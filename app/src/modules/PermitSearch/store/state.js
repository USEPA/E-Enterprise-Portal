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
  zip: '',
  status: '',
  formType: '',
  facilityOperator: '',
  federalFacility: '',
  dateSelection: '',
  startDate: '',
  endDate: '',
  tribalLandsConstruction: '',
  tribeSelection: '',
  formOptions: {
    permitType: [
      'Construction General Permit',
      'Multi-sector General Permit',
    ],
    stateTerritory: [
      'cool place',
      'cooler place',
    ],
    status: [
      'good status',
      'bad status',
    ],
    formType: [
      'form1',
      'form2',
    ],
    federalFacilitySelections: [
      {text: 'Yes', value: true},
      {text: 'No', value: false},
    ],
    dateSelections: [
      'Submitted',
      'uuughughuguh',
    ],
    tribalLandsConstruction: [
      {text: 'Yes', value: true},
      {text: 'No', value: false},
    ],
    tribeSelections: [
      'tribe1',
      'tribe2',
    ],
  },
};
