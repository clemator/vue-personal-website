import { RepositoryFactory } from '../../../utils/repositories/RepositoryFactory'
const AuthenticationRepository = RepositoryFactory.get('authentication')

const state = {
  onPending: false,
  error: ''
}

const actions = {
  login({ commit, dispatch }, { email, password }) {
    commit('setPending', true)

    return AuthenticationRepository.login({ email, password })
      .then(() => {
        dispatch('authentication/setAuthenticationFlag', true, { root: true })
      })
      .catch((err) => commit('setError', err.toString()))
      .finally(() => commit('setPending', false))
  },
  setError({ commit }, error) {
    commit('setError', error)
  },
  logout({ commit, dispatch }) {
    commit('resetError')
    dispatch('authentication/setAuthenticationFlag', false, { root: true })
  },
  resetError({ commit }) {
    commit('resetError')
  }
}

const mutations = {
  setPending(state, flag) {
    state.onPending = flag
  },
  resetError(state) {
    state.error = ''
  },
  setError(state, error) {
    state.error = error
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
