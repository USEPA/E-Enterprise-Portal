import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Workbench from './views/Workbench.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/workbench',
      name: 'workbench',
      component: Workbench,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/user',
        name: 'user',
      component: () => import('./views/User.vue'),
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('./views/User-Profile.vue'),
    },
    {
      path: '/:urlAlias',
      name: 'basic-page',
      props: true,
      component: () => import('@/components/BasicPage.vue'),
    },
  ],
});