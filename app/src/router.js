import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Workbench from './views/Workbench.vue';
import state from './store.js';

Vue.use(Router);

 const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
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
        path: '/faqs',
        name: 'faqs',
        component: () => import('./views/Faqs.vue'),
      },
    ],
});

 // sets nav guard to mutate current page uuid based on route name
router.beforeEach((to, from, next) => {
  let uuid = '';
  if(to.name === 'faqs'){
    uuid = '3bd1261a-e049-408e-9da7-966c572b045b';
    state.commit('SET_CURRENT_PAGE_UUID', uuid);
  }
  // add appropriate else here when you add basic page to router
  next();
});

export default router;
