/**
 * This allows the code to take advantage of tooling like linters, and putting
 * all constants in a single file allows your collaborators to get an
 * at-a-glance view of what mutations are possible in the entire application.
 *
 *  @SEE https://vuex.vuejs.org/guide/mutations.html
 */

export default {
  NAMESPACE: 'BeWellInformed/',
  SET_SELECTED_PARTNER: 'SET_SELECTED_PARTNER',
  SET_WATER_ANALYSIS_REQUEST: 'SET_WATER_ANALYSIS_REQUEST',
  UPDATE_PARTNERS: 'UPDATE_PARTNERS',
  UPDATE_PARTNER_RESOURCE: 'UPDATE_PARTNER_RESOURCE',
  UPDATE_PARTNER_XML: 'UPDATE_PARTNER_PARTNER_XML',
  UPDATE_PARTNER_FLOWCHART_XML: 'UPDATE_PARTNER_FLOWCHART_XML',
};
