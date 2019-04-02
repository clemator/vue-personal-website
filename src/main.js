import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import autofocus from 'vue-autofocus-directive'

import UserLayout from './layouts/UserLayout'
import AnonymousLayout from './layouts/AnonymousLayout'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.directive('autofocus', autofocus)

const routes = [
  { path: '/', component: UserLayout, name: 'root' },
  { path: '/login', component: AnonymousLayout, name: 'login' }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
