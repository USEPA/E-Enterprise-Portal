/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators.  Async tasks should be created here.
 */

import {AppAxios, commonAppStore} from '../../wadk/WADK';
import types from './types';
import {EventBus} from '../../../EventBus';

export default {
  ...commonAppStore.actions,
  reflectLocationChange(context, newLocation){
    const store = context;
    console.log(newLocation);
  },
};
