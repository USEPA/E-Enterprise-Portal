/**
 * Values added here are available to all workbench applications.  These
 * should be initial data states and values. No methods.
 *
 * @SEE https://vuex.vuejs.org/guide/state.html
 */

export default {
  apiUrl: {
    sample: 'sample_data/mycertifications.json',
    local: 'http://e-enterprise/api/cdx/certifications',
    dev: 'https://apidev2.e-enterprise.gov/api/cdx/certifications',
    test: '',
  },
  certifications: [],
  certificationsLoaded: false,
};
