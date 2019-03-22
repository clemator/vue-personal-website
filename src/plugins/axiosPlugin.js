import { clone } from 'ramda'

export default {
  install (Vue, {
    axios,
    config = {},
  }) {
    const configuration = clone(config)
    configuration.baseURL = config.baseURL || 'http://localhost:8000/api/'

    Vue.prototype.$http = axios.create(configuration)
  }
}