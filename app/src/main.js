import Vue from 'vue';
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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
