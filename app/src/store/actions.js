import { AppAxios, commonAppStore } from '../modules/wadk/WADK';

export default {
  ...commonAppStore.actions,
  createLocationRequest(context) {
    alert("create Location Request action rendered");
  },
};
