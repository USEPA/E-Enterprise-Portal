import { AppAxios, commonAppStore } from '../modules/wadk/WADK';

export default {
  ...commonAppStore.actions,
  createLocationRequest(context, location) {
    const store = context;
    alert(location);
  },
};
