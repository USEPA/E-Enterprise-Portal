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
  facilityCity: '',
  facilityState: '',
  facilityZip: '',
  status: '',
  formType: '',
  operatorName: '',
  federalFacility: '',
  dateSelection: '',
  submittedDateFrom: '',
  submittedDateTo: '',
  tribalIndicator: '',
  tribeSelection: '',
  facilityCounty: '',
  masterPermitNumber: '',
  tribalName: '',
  issuer: '',
  submissionType: '',
  applicationType: '',
  formStatus: '',
  subsector: '',
  sicCode: '',
  address: '',
  formOptions: {
    permitType: [
      'Construction General Permit',
      'Multi-sector General Permit',
    ],
    facilityState: [
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
    federalIndicator: [
      {text: 'Yes', value: true},
      {text: 'No', value: false},
    ],
    dateSelections: [
      'Submitted',
      'uuughughuguh',
    ],
    tribalIndicator: [
      {text: 'Yes', value: true},
      {text: 'No', value: false},
    ],
    tribeSelections: [
      'tribe1',
      'tribe2',
    ],
    tribalNameSelections: [
      'tribe1',
      'tribe2',
    ],
    countySelections: [
      'All',
      'county1',
    ],
    issuerSelections: [
      'issuer1',
      'issuer2',
    ],
    coverageTypeSelections: [
      'type1',
      'type2',
    ],
    formStatusSelections: [
      'status1',
      'status2',
    ],
    sectorSelections: [
      'sector1',
      'sector2',
    ],
  },
};
