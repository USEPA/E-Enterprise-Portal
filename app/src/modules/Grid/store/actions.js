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

    // Axios call to get the apps from the API (currently mimicing it)
    // const layout = store.getters.getSampleLayout;
    // eslint-disable-next-line max-len
    // eslint-disable-next-line object-curly-newline,object-curly-spacing,quote-props,quotes,key-spacing,comma-spacing
    const response = [{"title":"Be Well Informed","field_settings_menu_items":{"Help":"Sample help text","Disclaimer":"Your basic disclaimer","Contact":"Talk to us here..."},"field_default_grid_size":["small"],"field_description":[],"field_is_expandable":1,"field_grid":{"x":0,"y":0,"width":1,"height":1},"field_grid_sizes":["small"],"field_html_content":[{"nid":7,"uuid":8,"vid":9,"langcode":"en","type":[{"target_id":"eep_app_content"}],"revision_timestamp":1548280900,"revision_uid":[{"target_id":"1"}],"revision_log":[],"status":0,"title":"Be Well Informed - Main","uid":[{"target_id":"1"}],"created":1548261997,"changed":1548280900,"promote":0,"sticky":0,"default_langcode":1,"revision_default":1,"revision_translation_affected":1,"path":[{"langcode":"en"}],"menu_link":[[]],"field_html":"\u003Cp\u003EHave a well and wonder what your water testing results mean?\u003C\/p\u003E\r\n\r\n\u003Cp\u003EBe Well Informed lets you enter your test results and get feedback about health concerns and water treatment choices. Be Well Informed includes useful information about the most common contaminants that affect wells.\u003C\/p\u003E\r\n\r\n\u003Cp\u003EA quick disclaimer before we start: Information provided by the participating States is for informational purposes only. It is recommended that you consult a qualified water treatment professional if you need to treat your water. They can consider other conditions or factors related to your well or home to determine the most appropriate water treatment option.\u003C\/p\u003E\r\n\r\n\u003Cp\u003EModeled After: \u003Ca href=\u0022https:\/\/xml2.des.state.nh.us\/DWITool\/Welcome.aspx\u0022\u003ENew Hampshire\u2019s Be \u003Cem\u003EWell\u003C\/em\u003E Informed Guide\u003C\/a\u003E\u003C\/p\u003E\r\n","field_key":"main"}],"field_icon_name":"bookmark.svg","field_sources":{"New Hampshire\u2019s Be Well Informed Guide":"https:\/\/xml2.des.state.nh.us\/DWITool\/Welcome.aspx"},"field_vue_component_name":"BeWellInformed"}];


    // Update the layout in the store
    const wappFilter = function (data) {
      const tmpWapps = data.reduce((acc, wapp, idx, src) => {
        const tmp = wapp;
        tmp.x = wapp.field_grid.x;
        tmp.y = wapp.field_grid.y;
        tmp.w = wapp.field_grid.w;
        tmp.h = wapp.field_grid.h;
        tmp.i = idx;

        acc.push(tmp);
        return acc;
      }, []);
      return tmpWapps;
    };

    const wapps = wappFilter(response);

    store.commit(types.SET_LAYOUT, wapps);
  },
};
