import connexion from '@/store/modules/authentication/connexion';
import cache from '@/storage/cache';

const state = {
  isAuthenticated: false,
};

const mutations = {
  setAuthentication(state, flag) {
    state.isAuthenticated = flag;
  }
};

const actions = {
  create({ commit, dispatch }, { email }) {
    cache.destroy()
      .then(() => {
        return Promise.all([
          cache.set('authentication', 'isAuthenticated', true),
          cache.set('authentication', 'email', email)
        ])
      })
      .then(() => commit('setAuthentication', true))
      .catch(err => dispatch('destroy').finally(() => Promise.reject(err)));
  },
  destroy({ commit }) {
    commit('setAuthentication', false);

    return cache.destroy();
  }
};

const getters = {
  isAuthenticated: state => state.isAuthenticated
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
