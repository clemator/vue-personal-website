import Vue from 'vue'

export function login({ email, password }) {
  return Vue.prototype.$axios.post('authentication/login', { email, password })
}