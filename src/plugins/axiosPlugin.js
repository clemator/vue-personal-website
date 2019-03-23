export default {
  install (Vue, {
    axios,
    config = {},
  }) {
    const configuration = { ...defaultConfig, ...config}

    Vue.prototype.$axios = axios.create(configuration)
  }
}

const defaultConfig = {
  baseURL: 'http://localhost:8000/api/'
}