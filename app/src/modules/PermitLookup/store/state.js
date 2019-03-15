/**
 * Values added here are available to all workbench applications.  These
 * should be initial data states and values. No methods.
 *
 * @SEE https://vuex.vuejs.org/guide/state.html
 */

export default {
  permitType: 'Select...',
  msgpFormData: {
    submissionType: 'Select...',
    issuer: 'Select...',
    coverageType: 'Select...',
    coverageStatus: 'Select...',
    npdesId: '',
    sector: 'Select...',
    subsector: 'Select...',
    facilityState: 'Select...',
    tribalName: 'Select...',
    sicCode: '',
    facilityName: '',
    facilityAddressLine1: '',
    facilityCity: '',
    facilityZip: '',
    facilityCounty: 'Select...',
    federalIndicator: 'false',
    operatorName: '',
    masterPermitNumber: '',
    submittedDateFrom: '',
    submittedDateTo: '',
    tribalIndicator: 'false',
  },
  cgpFormData: {
    projectSiteName: '',
    npdesId: '',
    projectCity: '',
    projectState: 'Select...',
    projectZip: '',
    projectStatus: 'Select...',
    formType: 'Select...',
    operatorName: '',
    federalIndicator: 'false',
    dateSelection: 'Select...',
    submittedDateFrom: '',
    submittedDateTo: '',
    tribalIndicator: 'false',
    tribalName: 'Select...',
    projectCounty: 'Select...',
  },
  msgpFormDataDefaults: {
    submissionType: 'Select...',
    issuer: 'Select...',
    coverageType: 'Select...',
    coverageStatus: 'Select...',
    npdesId: '',
    sector: 'Select...',
    subsector: 'Select...',
    facilityState: 'Select...',
    tribalName: 'Select...',
    sicCode: '',
    facilityName: '',
    facilityAddressLine1: '',
    facilityCity: '',
    facilityZip: '',
    facilityCounty: 'Select...',
    federalIndicator: 'false',
    operatorName: '',
    masterPermitNumber: '',
    submittedDateFrom: '',
    submittedDateTo: '',
    tribalIndicator: 'false',
  },
  cgpFormDataDefaults: {
    projectSiteName: '',
    npdesId: '',
    projectCity: '',
    projectState: 'Select...',
    projectZip: '',
    projectStatus: 'Select...',
    formType: 'Select...',
    operatorName: '',
    federalIndicator: 'false',
    dateSelection: 'Select...',
    submittedDateFrom: '',
    submittedDateTo: '',
    tribalIndicator: 'false',
    tribalName: 'Select...',
    projectCounty: 'Select...',
  },
  formOptions: {
    permitType: [
      'Construction General Permit',
      'Multi-Sector General Permit',
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
  cgpFormResults: {},
  cgpResultsLoaded: false,
  resultsError: false,
};
