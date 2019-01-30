/* eslint-disable import/first */
import Vue from 'vue';

// @todo Move config to a environment specific file/export
// Vue configurations (must be set before anything else)
Vue.config.productionTip = true;
Vue.config.devtools = true;

import VueProgressBar from 'vue-progressbar';
import 'bootstrap';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';

const VueProgressBarOptions = {
  color: '#007AC6',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  // location: 'left',
  inverse: false,
};

Vue.use(VueProgressBar, VueProgressBarOptions);
Vue.use(BootstrapVue);

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
