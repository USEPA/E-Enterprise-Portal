import { commonAppStore } from "../../wadk/WADK";

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
};
