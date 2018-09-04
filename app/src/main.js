import Vue from 'vue';
import 'bootstrap';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
