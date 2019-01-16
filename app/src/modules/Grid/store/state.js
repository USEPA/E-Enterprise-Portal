let sampleLayout = [
  {
    x: 0, y: 0, w: 1, h: 1, i: 0, componentName: 'BeWellInformed',
  },
  {
    x: 1, y: 0, w: 2, h: 1, i: 1, componentName: 'TrendingAir',
  },
  {
    x: 0, y: 1, w: 2, h: 2, i: 2, componentName: 'FavoriteLinks',
  },
  {
    x: 2, y: 1, w: 2, h: 2, i: 3, componentName: 'MyReporting',
  },
];

sampleLayout = [
  {
    x: 0, y: 3, w: 2, h: 2, i: 0, componentName: 'BeWellInformed',
  },
  {
    x: 0, y: 1, w: 2, h: 1, i: 1, componentName: 'TrendingAir',
  },
  {
    x: 0, y: 0, w: 1, h: 1, i: 2, componentName: 'FavoriteLinks',
  },
  {
    x: 1, y: 0, w: 1, h: 1, i: 3, componentName: 'MyReporting',
  },
  {
    x: 2, y: 1, w: 2, h: 1, i: 4, componentName: 'BeWellInformed',
  },
  {
    x: 2, y: 0, w: 1, h: 1, i: 5, componentName: 'TrendingAir',
  },
  {
    x: 0, y: 2, w: 2, h: 1, i: 6, componentName: 'FavoriteLinks',
  },
  {
    x: 3, y: 3, w: 2, h: 2, i: 7, componentName: 'MyReporting',
  },
];
/**
 * Values added here are available to all workbench applications.  These
 * should be initial data states and values. No methods.
 *
 * @SEE https://vuex.vuejs.org/guide/state.html
 */

export default {
  // @todo Remove POC "user" and add meaningful intial state values
  layout: sampleLayout,
};
