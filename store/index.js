import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from '~/plugins/loggers/vuex'
//import todos from "./todos"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const createStore = () => {
  return new Vuex.Store({
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    modules: {
      //user
    }
  })
}

export default createStore
