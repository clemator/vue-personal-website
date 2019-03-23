import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import store from './store'
import axiosPlugin from './plugins/axiosPlugin'

import UserLayout from './layouts/UserLayout'
import AnonymousLayout from './layouts/AnonymousLayout'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: UserLayout, name: 'root' },
  { path: '/login', component: AnonymousLayout, name: 'login' }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.use(axiosPlugin, {
  axios,
  config: {
    baseURL: 'http://localhost:8000/api/'
  }
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
