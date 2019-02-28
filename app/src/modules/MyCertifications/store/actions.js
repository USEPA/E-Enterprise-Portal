import types from './types';
import { AppAxios, commonAppStore } from '../../wadk/WADK';
import { EventBus } from '../../../EventBus';

/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators.  Async tasks should be created here.
 */
export default {
  ...commonAppStore.actions,
  loadMyCertifications(context) {
    const store = context;
    AppAxios.get('sample_data/mycertifications.json').then((response) => {
      store.commit(types.LOAD_CERTIFICATIONS, response.data);
    });
  },
};
