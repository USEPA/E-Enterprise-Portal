export default {
  getApp(state) {
    return state.app;
  },
  getEnvironment() {
    let env = 'LOCAL';
    const { host } = location;
    if (host.indexOf(/dev\d?\.e-enterprise/) > -1) {
      env = 'DEV';
    } else if (host.indexOf(/test\d\.e-enterprise/) > -1) {
      env = 'TEST';
    } else if (host.indexOf(/^e-enterprise\.gov/) > -1) {
      env = 'PROD';
    }
    return env;
  },
};
