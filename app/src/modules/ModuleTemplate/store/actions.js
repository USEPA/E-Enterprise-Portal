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
  sampleAction(context) {
    const store = context;
    const { state } = store;

    store.commit(types.SAMPLE_MUTATION, {});
  },
  sampleActionWithParmas(context, params) {
    const store = context;
    const { state } = store;

    store.commit(types.SAMPLE_MUTATION, {});
  },
  /**
   *
   * The first parameter is always the context, by using a deconstructor we can
   * cherry pick to properties dispatch and commit which are equivalent to
   * context.dispatch and context.commit
   */
  sampleCallToOtherAction({ dispatch, commit }) {
    dispatch('sampleAction');
    // With params
    dispatch('sampleActionWithParmas', { param1, param2 });
  }
};
