import Vue from 'vue';
import VueRouter from 'vue-router';
import autofocus from 'vue-autofocus-directive';

import App from './App.vue';
import store from './store';
import { routes, globalBeforeGuard } from './router';

Vue.config.productionTip = false;

Vue.directive('autofocus', autofocus);

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

router.beforeEach(globalBeforeGuard);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
