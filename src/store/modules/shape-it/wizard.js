import { WIZARD } from './../../../utils/constants/index';

const state = {
  surface: WIZARD.SURFACES.NONE,
  errors: {}
};

const getters = {
  isSurfaceSelected: state => state.surface !== WIZARD.SURFACES.NONE,
  currentSurface: state => state.surface,
  errors: state => state.errors
};

const actions = {
  changeSurfaceType({ commit }, surface) {
    commit('setSurface', surface || WIZARD.SURFACES.NONE);
  },
  addError({ commit }, error) {
    commit('addError', error);
  },
  resetErrors({ commit }) {
    commit('resetErrors');
  },
  resetSurfaceType({ commit }) {
    commit('resetSurface');
  },
};

const mutations = {
  setSurface(state, surface) {
    state.surface = surface;
  },
  addError(state, { key, data }) {
    state.errors[key] = data;
  },
  resetErrors(state) {
    state.errors = {};
  },
  resetSurface(state) {
    state.surface = WIZARD.SURFACES.NONE;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
