export default {
  getApp(state) {
    return state.app;
  },
  getEnvironment() {
    let env = 'LOCAL';
    const { host } = location;
    let m;
    console.log(this.$route.query.test);

    const regex = {
      LOCAL: /(localhost|local|^e\-enterprise$)/gm,
      DEV: /dev\d?\.e-enterprise/gm,
      TEST: /test\d?\.e-enterprise/gm,
      PROD: /^e-enterprise\.gov/gm,
    };

    Object.keys(regex).forEach((envName) => {
      while ((m = regex[envName].exec(host)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.length) {
          env = envName;
        }
      }
    });

    // FORCING LOCAL FOR DEMO MODE
    env = 'LOCAL';
    return env;
  },
};
