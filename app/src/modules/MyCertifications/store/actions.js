import types from './types';
import { AppAxios, commonAppStore } from '../../wadk/WADK';

/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators.  Async tasks should be created here.
 */

export default {
  ...commonAppStore.actions,
  loadMyCertifications(context) {
    const store = context;
    const vm = this._vm;
    if (vm.getIsLoggedIn) {
      const cookie = vm.$cookie.get('Token');
      AppAxios.get(
        `${vm.getEnvironmentApiURL}/api/cdx/certifications`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
            crossDomain: true,
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
          },
        },
      ).then((response) => {
        store.commit(types.LOAD_CERTIFICATIONS, response.data);
        store.commit(types.SET_CERTIFICATIONS_LOADED, true);
      });
    } else {
      store.commit(types.LOAD_CERTIFICATIONS, []);
    }
  },
  downloadDocument(context, documentObject) {
    const vm = this._vm;
    const docString = JSON.stringify(documentObject);
    const params = encodeURIComponent(docString);
    window.open(`${vm.getEnvironmentApiURL}/api/cdx/certifications/documents?document_download_params=${params}`);
  },
};
