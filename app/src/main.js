/* eslint-disable import/first */
import Vue from 'vue';

// @todo Move config to a environment specific file/export
// Vue configurations (must be set before anything else)
Vue.config.productionTip = true;
Vue.config.devtools = true;

import VueScrollTo from 'vue-scrollto';
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

const VueScrollToDefaultSettings = {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
};

Vue.use(VueProgressBar, VueProgressBarOptions);
Vue.use(BootstrapVue);
Vue.use(VueScrollTo, VueScrollToDefaultSettings);

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
