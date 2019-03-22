import connexion from './connexion'

const state = {
  isConnected: false,
}

const mutations = {
  setConnected(state, flag) {
    state.isConnected = flag
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  modules: {
    connexion,
  }
}
