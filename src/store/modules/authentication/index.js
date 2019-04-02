import connexion from './connexion';

const state = {
  isConnected: false,
};

const mutations = {
  setConnected(state, flag) {
    state.isConnected = flag;
  }
};

const actions = {
  setAuthenticationFlag({ commit }, flag) {
    commit('setConnected', flag);
  }
};

const getters = {
  isAuthenticated: state => state.isConnected
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    connexion,
  }
};
