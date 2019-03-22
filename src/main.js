import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store'
import axiosPlugin from './plugins/axiosPlugin'

Vue.config.productionTip = false

Vue.use(axiosPlugin, {
  axios,
  config: {
    baseURL: 'http://localhost:8000/api/'
  }
})

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
