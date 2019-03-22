// import login from ''

const state = {
  onPending: false,
  error: ''
}

const actions = {
  login({ commit }, { email, password }) {
    commit('resetError')
    commit('setPending', true)

    console.log(this._vm.$http.post('authentication/login', { email, password }))
  }
}

const mutations = {
  setPending(state, flag) {
    state.onPending = flag
  },
  resetError(state) {
    state.error = ''
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
