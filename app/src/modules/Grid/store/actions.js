import types from './types';
import { EventBus } from '../../../EventBus';

/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators.  Async tasks should be created here.
 */
export default {
  sampleAction(context) {
    const store = context;
    const { state } = store;

    store.commit(types.SAMPLE_MUTATION, state);
  },
};
