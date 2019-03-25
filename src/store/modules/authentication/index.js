import connexion from './connexion'

const state = {
  isConnected: false,
}

const mutations = {
  setConnected(state, flag) {
    state.isConnected = flag
  }
}

const actions = {
  setAuthenticationFlag({ commit }, flag) {
    commit('setConnected', flag)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    connexion,
  }
}
