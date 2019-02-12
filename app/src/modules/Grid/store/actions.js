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

    // Update the layout in the store
    /**
     * Takes raw API Workbench Applications (wapp) and processes them to work
     *
     */
    const generateWappsFromRawWapps = (rawWapps) => {
      const wapps = rawWapps.reduce((acc, rawWapp, idx) => {
        const wapp = {};
        wapp.eepApp = rawWapp;
        // eslint-disable-next-line no-useless-escape
        wapp.eepApp.id = rawWapp.title.toLowerCase().replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '-');

        // Setup the sources
        wapp.eepApp.source = [];
        const keys = Object.keys(rawWapp.field_sources);
        keys.forEach((key) => {
          wapp.eepApp.source.push({
            text: key,
            link: rawWapp.field_sources[keys[0]],
          });
        });

        // Setup the html content
        let html = rawWapp.field_html_content.reduce((acc, html_content, idx) => {
          acc[html_content.field_key] = html_content.field_html;
          return acc;
        }, {});
        wapp.eepApp.field_html_content = html;

        // Setup the values for the grid
        wapp.x = rawWapp.field_grid.x;
        wapp.y = rawWapp.field_grid.y;
        wapp.w = rawWapp.field_grid.width;
        wapp.h = rawWapp.field_grid.height;
        wapp.i = idx;

        // Setup size
        // A wapp is said to be tall if it is at least two grids height
        const tallWappSetting = 2;
        let size = 'small';
        // If the grid is 'tall', it is large
        if (wapp.eepApp.field_grid.height >= tallWappSetting) {
          size = 'large';
          // If the grid is not 'tall' but wide, it is medium
        } else if (wapp.eepApp.field_grid.width >= tallWappSetting) {
          size = 'medium';
        }
        wapp.eepApp.size = size;

        // Push that new value
        acc.push(wapp);
        return acc;
      }, []);
      return wapps;
    };

    // Axios call to get the apps from the API (currently mimicing it)
    const url = store.rootGetters.getApiUrl('workbenchApplications');

    AppAxios.get(url)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length) {
          const wapps = generateWappsFromRawWapps(response.data);
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

    return sizes;
  },
  /**
   * This assumes we are using the 4 column grid for the layout of the widgets.
   * Small is 1 column wide & 1 row high
   * Medium is 2 colums wide & 1 row high
   * Large is 2 columns wide & 2 rows high
   *
   * Each app will be added to the grid from left to right. For aesthetic reasons,
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

    sizesPromise.then((sizes) => {
      let newLayout = [];
      const columnCount = 4;
      let columnPosition = 0;
      let rowPosition = 0;

      const calculatePosition = (wapp, idx) => {
        // set new values and sync layout settings
        const width = wapp.eepApp.field_grid.width;
        const height = wapp.eepApp.field_grid.height;
        wapp.eepApp.field_grid = {
          x: columnPosition,
          y: rowPosition,
          width: width,
          height: height,
        };
        wapp.x = columnPosition;
        wapp.y = rowPosition;
        wapp.w = width;
        wapp.h = height;

        newLayout.push(wapp);
        //
        columnPosition = columnPosition + wapp.eepApp.field_grid.width;
        if (columnPosition > columnCount - 1) {
          rowPosition = rowPosition + wapp.eepApp.field_grid.height;
          columnPosition = 0;
        }
      };

      // Small WAPPs
      sizes.small.map(calculatePosition);

      // Medium WAPPs
      // If the column position is not zero, add a new row.
      rowPosition = (columnPosition) ? rowPosition + 1 : rowPosition;
      // The grid will only place the apps with a width of 2 columns on either the
      // first of third column.
      columnPosition = (columnPosition && columnPosition <= 2) ? 2 : 0;
      sizes.medium.map(calculatePosition);

      // If the column position is not zero, add a new row.
      rowPosition = (columnPosition) ? rowPosition + 1 : rowPosition;
      // Large Wapps will initially start on a new row.
      columnPosition = 0;
      sizes.large.map(calculatePosition);

      // Combine the sorted items and update the layout in the store
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
      for (let columnPosition = wapp.eepApp.field_grid.x; columnPosition < wapp.eepApp.field_grid.x + wapp.eepApp.field_grid.width; columnPosition++) {
        for (let rowPosition = wapp.eepApp.field_grid.y; rowPosition < wapp.eepApp.field_grid.y + wapp.eepApp.field_grid.height; rowPosition++) {
          // Originally used an array but Vue makes if difficult to compare
          // them. So we use a concatenated string.
          footprint.push(`${columnPosition}, ${rowPosition}`);
        }
      }
      return footprint;
    };

    let isValid = true;

    layout.reduce((acc, wapp, idx, arr) => {
      // check the remaining array items for conflicts, We don't need to check
      // previous times as that would be redundant.
      if (idx < arr.length - 1) {
        const wapp_footprint = getFootprint(wapp);

        arr.slice(idx).forEach((other_wapp) => {
          const other_wapp_footprint = getFootprint(other_wapp);
          const intersection = intersect(wapp_footprint, other_wapp_footprint);
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
    const tallWappSetting = 2;
    let size = 'small';
    // If the grid is 'tall', it is large
    if (wapp.eepApp.field_grid.height >= tallWappSetting) {
      size = 'large';

      // If the grid is not 'tall' but wide, it is medium
    } else if (wapp.eepApp.field_grid.width > tallWappSetting) {
      size = 'medium';
    }
    return size;
  },
};
