import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Workbench from './views/Workbench.vue';

Vue.use(Router);

function getCookie(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

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
      beforeEnter: (to, from, next) => {
        if (to.path === '/warning-notice') {
          console.log(getCookie('userLoggedIn'));
          const cookieValue = getCookie('userLoggedIn');
          console.log(cookieValue);
          if (cookieValue === 'true') {
            next();
          } else {
            next('/login');
          }
        } else {
          next();
        }
      },
    },
  ],
});