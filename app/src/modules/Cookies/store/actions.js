/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators.  Async tasks should be created here.
 */

import { commonAppStore } from '../../wadk/WADK';
import types from './types';

export default {
  ...commonAppStore.actions,
};
