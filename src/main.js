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
    children: [
      {
        path: 'login',
        component: TheLoginForm,
        name: 'login'
      }
    ]
  },
  { path: '/user', component: UserLayout, name: 'user'}
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
