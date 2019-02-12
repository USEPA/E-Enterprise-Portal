import types from './types';
import { AppAxios } from "../../wadk/WADK";
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

    // Axios call to get the apps from the API (currently mimicing it)
    const url = store.rootGetters.getApiUrl('workbenchApplications');

    // Update the layout in the store
    const wappFilter = (wapps) => {
      const tmpWapps = wapps.reduce((acc, wapp, idx) => {
        const tmp = {};
        tmp.eepApp = wapp;
        // eslint-disable-next-line no-useless-escape
        tmp.eepApp.id = wapp.title.toLowerCase().replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '-');

        // Setup the sources
        tmp.eepApp.source = [];
        const keys = Object.keys(wapp.field_sources);
        keys.forEach((key) => {
          tmp.eepApp.source.push({
            text: key,
            link: wapp.field_sources[keys[0]],
          });
        });

        // Setup the html content
        let html = wapp.field_html_content.reduce((acc, html_content, idx) => {
          acc[html_content.field_key] = html_content.field_html;
          return acc;
        }, {});
        tmp.eepApp.field_html_content = html;

        // Setup the values for the grid
        tmp.x = wapp.field_grid.x;
        tmp.y = wapp.field_grid.y;
        tmp.w = wapp.field_grid.width;
        tmp.h = wapp.field_grid.height;
        tmp.i = idx;

        // Setup size
        let size = 'small';
        // If the grid is 'tall', it is large
        if (tmp.eepApp.field_grid.height > 1) {
          size = 'large';

          // If the grid is not 'tall' but wide, it is medium
        } else if (tmp.eepApp.field_grid.width > 1) {
          size = 'medium';
        }
        tmp.eepApp.size = size;

        // Push that new value
        acc.push(tmp);
        return acc;
      }, []);
      return tmpWapps;
    };

    AppAxios.get(url)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length) {
          const wapps = wappFilter(response.data);
          store.commit(types.SET_LAYOUT, wapps);
        } else {
          console.warn('Workbench Applications endpoint returned an error.');
          console.warn([url, response]);
        }
      });
  },
  /**
   * Sorts the Workbench Applications by current size and sorts them in order of
   * small to large
   */
  sortWappBySizes(context) {
    const store = context;
    let layout = store.state.layout;
    const sizes = { small: [], medium: [], large: [] };

    // Sort wapp to make ordering them easier
    layout.map((wapp) => {
      sizes[wapp.eepApp.size].push(wapp);
    });

    // layout = [].concat(sizes.small, sizes.medium, sizes.large);
    return sizes;
  },
  /**
   * This assumes we are using the 4 column grid for the layout of the widgets.
   * Small is 1 column wide & 1 row high
   * Medium is 2 colums wide & 1 row high
   * Large is 2 columns wide & 2 rows high
   *
   * Each app will be added to the grid from left to right. For esthetic reasons
   * The grid will only place the apps with a width of 2 columns on either the
   * first of third column (medium and large). Large widgets will initially
   * start on a new row.
   *
   * Below is a visualization of how it should work: (S)mall, (M)edium, (L)arge,
   * (E}mpty or skipped grid slots.
   *
   *    ---------------------
   *    | S  | S  | S  | S  |
   *    ---------------------
   *    | S  |  E |    M    |
   *    ---------------------
   *    |    M    |    M    |
   *    ---------------------
   *    |    M    |  E | E  |
   *    ---------------------
   *    |         |         |
   *    |    L    |    L    |
   *    |         |         |
   *    ---------------------
   *
   */
  autoPositionWapps(context) {
    const store = context;
    const sizesPromise = context.dispatch('sortWappBySizes');

    sizesPromise.then((sizes)=>{
      let newLayout = [];
      const columnCount = 4;
      let x = 0;
      let y = 0;

      const calculatePosition = (wapp, idx) => {
        // set new values and sync layout settings
        const width = wapp.eepApp.field_grid.width;
        const height = wapp.eepApp.field_grid.height;
        wapp.eepApp.field_grid = {
          x: x,
          y: y,
          width: width,
          height: height,
        };
        wapp.x = x;
        wapp.y = y;
        wapp.w = width;
        wapp.h = height;

        newLayout.push(wapp);
        x = x + wapp.eepApp.field_grid.width;
        if (x > columnCount - 1) {
          y = y + wapp.eepApp.field_grid.height;
          x = 0;
        }
      };

      // Small WAPPs
      sizes.small.map(calculatePosition);

      // Medium WAPPs
      // Resetting x & y positions to behave as detailed above
      y = (x) ? y + 1 : y;
      x = (x && x <= 2) ? 2 : 0;
      sizes.medium.map(calculatePosition);

      // Large WAPPs
      // Resetting x & y positions to behave as detailed above

      y = (x) ? y + 1 : y;
      x = 0;
      sizes.large.map(calculatePosition);

      newLayout = [].concat(sizes.small, sizes.medium, sizes.large);

      store.commit(types.SET_LAYOUT, newLayout);
    });
  },
  /**
   * This function checks if the widget items over lap
   */
  validateWappPositions(context, layout) {
    const intersect = function (...a) {
      return [...a].reduce((p, c) => p.filter(e => c.includes(e)));
    };

    const getFootprint = (wapp) => {
      const footprint = [];
      for (let x = wapp.eepApp.field_grid.x; x < wapp.eepApp.field_grid.x + wapp.eepApp.field_grid.width; x++) {
        for (let y = wapp.eepApp.field_grid.y; y < wapp.eepApp.field_grid.y + wapp.eepApp.field_grid.height; y++) {
          footprint.push(`${x}, ${y}`);
        }
      }
      return footprint;
    };

    let isValid = true;

    layout.reduce((acc, wapp, idx, arr) => {
      // check the remaining array items for conflicts, We don't need to check
      // previous times as that would be redundant.
      if (idx < arr.length - 1) {
        const c_fp = getFootprint(wapp);

        arr.slice(idx).forEach((other_wapp) => {
          const o_fp = getFootprint(other_wapp);
          const intersection = intersect(c_fp, o_fp);
          if (intersection.length > 0) {
            isValid = false;
          }
        });
      }
    });

    return isValid;
  },
  /**
   * This returns the readable size of the grid: small, medium, or large
   * @returns {string}
   */
  getSize(context, wapp) {
    let size = 'small';
    // If the grid is 'tall', it is large
    if (wapp.eepApp.field_grid.height > 1) {
      size = 'large';

      // If the grid is not 'tall' but wide, it is medium
    } else if (wapp.eepApp.field_grid.width > 1) {
      size = 'medium';
    }
    return size;
  },
};
