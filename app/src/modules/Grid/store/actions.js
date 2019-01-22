import types from './types';
// import { EventBus } from '../../../EventBus';

/**
 * Methods added here are available to all workbench applications.  Methods
 * should not directly modify any Store values directly but rather invoke
 * mutators.  Async tasks should be created here.
 */
export default {
  setGridLayout(context, newValue) {
    const store = context;
    store.commit(types.SET_LAYOUT, newValue);
    return newValue;
  },
  initializeLayout(context) {
    const store = context;
    const layout = store.getters.getSampleLayout;

    const updatedLayout = layout.map((wapp) => {
      const tmp = wapp;
      tmp.x = wapp.eepApp.grid.x;
      tmp.y = wapp.eepApp.grid.y;
      tmp.w = wapp.eepApp.grid.w;
      tmp.h = wapp.eepApp.grid.h;
      return tmp;
    });
    store.commit(types.SET_LAYOUT, updatedLayout);
  },
};
