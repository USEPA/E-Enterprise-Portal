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
    if (this._vm.getIsLoggedIn) {
      const cookie = this._vm.$cookie.get('Token');
        AppAxios.get(
            `${store.state.apiUrl.local}`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
                crossDomain: true,
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
              },
            }).then((response) => {
        store.commit(types.LOAD_CERTIFICATIONS, response.data);
      });
    } else {
      store.commit(types.LOAD_CERTIFICATIONS, []);
    }

  },
};
