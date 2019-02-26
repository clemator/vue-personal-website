import Vue from 'vue'
import Vuex from 'vuex'
//import todos from "./todos"

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      //user
    }
  })
}

export default createStore
