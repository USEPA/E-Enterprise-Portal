/**
 * This allows the code to take advantage of tooling like linters, and putting
 * all constants in a single file allows your collaborators to get an
 * at-a-glance view of what mutations are possible in the entire application.
 *
 *  @SEE https://vuex.vuejs.org/guide/mutations.html
 */

export default {
  NAMESPACE: 'ModuleTemplate/',
  // base grid
  SET_PERMIT_TYPE: 'SET_PERMIT_TYPE',

  // helpers
  SET_MSGP_RESULTS_LOADED: 'SET_MSGP_RESULTS_LOADED',
  SET_CGP_RESULTS_LOADED: 'SET_CGP_RESULTS_LOADED',
  SET_MSGP_FORM_DEFAULTS: 'SET_MSGP_FORM_DEFAULTS',
  SET_CGP_FORM_DEFAULTS: 'SET_CGP_FORM_DEFAULTS',

  // form options and response
  SET_FORM_OPTIONS_MSGP: 'SET_FORM_OPTIONS_MSGP',
  SET_FORM_OPTIONS_CGP: 'SET_FORM_OPTIONS_CGP',
  SET_BASE_FORM_OPTIONS: 'SET_BASE_FORM_OPTIONS',
  SET_BASE_FORM_OPTION_STATE_NAMES: 'SET_BASE_FORM_OPTION_STATE_NAMES',
  SET_BASE_FORM_OPTION_SECTOR_NAMES: 'SET_BASE_FORM_OPTION_SECTOR_NAMES',
  SET_BASE_FORM_OPTION_SUB_SECTOR_NAMES: 'SET_BASE_FORM_OPTION_SUB_SECTOR_NAMES',
  SET_BASE_FORM_OPTION_TRIAL_NAMES: 'SET_BASE_FORM_OPTION_TRIAL_NAMES',
  SET_BASE_FORM_OPTION_COUNTY_NAMES: 'SET_BASE_FORM_OPTION_COUNTY_NAMES',
  SET_MSGP_RESPONSE: 'SET_MSGP_RESPONSE',
  SET_CGP_RESPONSE: 'SET_CGP_RESPONSE',

  // general setters (remove these later)
  SET_STATUS: 'SET_STATUS',
  SET_FORM_TYPE: 'SET_FORM_TYPE',
  SET_FEDERAL_INDICATOR: 'SET_FEDERAL_INDICATOR',
  SET_DATE_SELECTION: 'SET_DATE_SELECTION',
  SET_START_DATE: 'SET_START_DATE',
  SET_END_DATE: 'SET_END_DATE',
  SET_TRIBAL_INDICATOR: 'SET_TRIBAL_INDICATOR',
  SET_TRIBE_SELECTION: 'SET_TRIBE_SELECTION',
  SET_FACILITY_COUNTY: 'SET_FACILITY_COUNTY',
  SET_TRIBAL_NAME: 'SET_TRIBAL_NAME',
  SET_SUBSECTOR: 'SET_SUBSECTOR',

  SET_MSGP_OPERATOR_NAME: 'SET_MSGP_OPERATOR_NAME',
  SET_MSGP_FACILITY_NAME: 'SET_MSGP_FACILITY_NAME',
  SET_MSGP_NPDESID: 'SET_MSGP_NPDESID',
  SET_MSGP_FACILITY_CITY: 'SET_MSGP_FACILITY_CITY',
  SET_MSGP_FACILITY_STATE: 'SET_MSGP_FACILITY_STATE',
  SET_MSGP_FACILITY_ZIP: 'SET_MSGP_FACILITY_ZIP',
  SET_MSGP_MASTER_PERMIT_NUMBER: 'SET_MSGP_MASTER_PERMIT_NUMBER',
  SET_MSGP_SUBMISSION_TYPE: 'SET_MSGP_SUBMISSION_TYPE',
  SET_MSGP_COVERAGE_TYPE: 'SET_MSGP_COVERAGE_TYPE',
  SET_MSGP_COVERAGE_STATUS: 'SET_MSGP_COVERAGE_STATUS',
  SET_MSGP_SECTOR: 'SET_MSGP_SECTOR',
  SET_MSGP_SUBSECTOR: 'SET_MSGP_SUBSECTOR',
  SET_MSGP_SIC_CODE: 'SET_MSGP_SIC_CODE',
  SET_MSGP_ADDRESS: 'SET_MSGP_ADDRESS',
  SET_MSGP_TRIBAL_INDICATOR: 'SET_MSGP_TRIBAL_INDICATOR',
  SET_MSGP_ISSUER: 'SET_MSGP_ISSUER',
  SET_MSGP_FEDERAL_INDICATOR: 'SET_MSGP_FEDERAL_INDICATOR',
  SET_MSGP_FACILITY_COUNTY: 'SET_MSGP_FACILITY_COUNTY',
  SET_MSGP_START_DATE: 'SET_MSGP_START_DATE',
  SET_MSGP_END_DATE: 'SET_MSGP_END_DATE',
  SET_MSGP_TRIBAL_NAME: 'SET_MSGP_TRIBAL_NAME',
  SET_MSGP_COUNTIES: 'SET_MSGP_COUNTIES',

  SET_CGP_FACILITY_NAME: 'SET_CGP_FACILITY_NAME',
  SET_CGP_NPDESID: 'SET_CGP_NPDESID',
  SET_CGP_FACILITY_CITY: 'SET_CGP_FACILITY_CITY',
  SET_CGP_FACILITY_STATE: 'SET_CGP_FACILITY_STATE',
  SET_CGP_FACILITY_ZIP: 'SET_CGP_FACILITY_ZIP',
  SET_CGP_STATUS: 'SET_CGP_STATUS',
  SET_CGP_FORM_TYPE: 'SET_CGP_FORM_TYPE',
  SET_CGP_OPERATOR_NAME: 'SET_CGP_OPERATOR_NAME',
  SET_CGP_FEDERAL_INDICATOR: 'SET_CGP_FEDERAL_INDICATOR',
  SET_CGP_DATE_SELECTION: 'SET_CGP_DATE_SELECTION',
  SET_CGP_START_DATE: 'SET_CGP_START_DATE',
  SET_CGP_END_DATE: 'SET_CGP_END_DATE',
  SET_CGP_TRIBAL_INDICATOR: 'SET_CGP_TRIBAL_INDICATOR',
  SET_CGP_TRIBAL_NAME: 'SET_CGP_TRIBAL_NAME',
  SET_CGP_FACILITY_COUNTY: 'SET_CGP_FACILITY_COUNTY',
  SET_CGP_COUNTIES: 'SET_CGP_COUNTIES',
};
