import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import autofocus from 'vue-autofocus-directive';

import UserLayout from './layouts/UserLayout';
import AnonymousLayout from './layouts/AnonymousLayout';
import TheLoginForm from './components/TheLoginForm';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.directive('autofocus', autofocus);

const routes = [
  {
    path: '/',
    component: AnonymousLayout,
    name: 'root',
    meta: { requiresAuth: false },
    children: [
      {
        path: 'login',
        component: TheLoginForm,
        name: 'login'
      }
    ]
  },
  {
    path: '/user',
    component: UserLayout,
    name: 'user',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'test',
        name: 'test'
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isUserLogged = store.getters['authentication/isAuthenticated'];

    if (!isUserLogged) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
    else
      next();
  }
  else
    next();
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
