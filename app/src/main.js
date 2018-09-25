import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import 'bootstrap';
import BootstrapVue from 'bootstrap-vue';
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
// Add Icons individually for performance reasons. No reason to load 3000+
import {
  faEllipsisV,
  faWindowMinimize,
  faWindowMaximize,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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

// Add Font Awesome SVG icons individually here
library.add(
  faEllipsisV,
  faWindowMinimize,
  faWindowMaximize,
  faExternalLinkAlt,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

let m;
const regex = /^e-enterprise\.gov/gm;
while ((m = regex.exec(location.host)) !== null) {
  // disable vue tool in Prod only
  if (m.length) {
    Vue.config.devtools = false;
  } else {
    Vue.config.devtools = true;
  }
}

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
