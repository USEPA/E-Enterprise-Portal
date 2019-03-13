/**
 * Values added here are available to all workbench applications.  These
 * should be initial data states and values. No methods.
 *
 * @SEE https://vuex.vuejs.org/guide/state.html
 */

export default {
  permitType: 'Select...',
  facilityName: '',
  npdesId: '',
  sector: 'Select...',
  facilityAddressLine1: '',
  facilityCity: '',
  facilityState: 'Select...',
  facilityZip: '',
  status: '',
  formType: '',
  operatorName: '',
  federalFacility: '',
  dateSelection: '',
  submittedDateFrom: '',
  submittedDateTo: '',
  tribalIndicator: '',
  federalIndicator: '',
  tribalName: 'Select...',
  facilityCounty: '',
  masterPermitNumber: '',
  issuer: 'Select...',
  submissionType: 'Select...',
  coverageType: 'Select...',
  coverageStatus: 'Select...',
  subsector: 'Select a Sector...',
  sicCode: '',
  address: '',
  msgpFormData: {
    submissionType: '',
    issuer: '',
    coverageType: '',
    coverageStatus: '',
    npdesId: '',
    sector: '',
    facilityState: '',
    tribalName: '',
    sicCode: '',
    facilityName: '',
    facilityAddressLine1: '',
    facilityCity: '',
    facilityZip: '',
    operatorName: '',
    masterPermitNumber: '',
    tribalIndicator: '',
    federalIndicator: '',
  },
  formOptions: {
    permitType: [
      'Construction General Permit',
      'Multi-sector General Permit',
    ],
    tribalIndicator: [
      { text: 'Yes', value: true },
      { text: 'No', value: false },
    ],
    federalIndicator: [
      { text: 'Yes', value: true },
      { text: 'No', value: false },
    ],
    baseFormOptions: {},
    msgpFormOptions: {},
    cgpFormOptions: {},
  },
  msgpFormResults: {},
  msgpResultsLoaded: false,
  msgpStateSelected: false,
  downloadApiUrls: {
    LOCAL: 'https://devngn.epacdxnode.net/net-msgp/api/public/v1',
    DEV: 'https://devngn.epacdxnode.net/net-msgp/api/public/v1',
    TEST: '',
    PROD: '',
  },
  downloadApiUrl: {},
};
