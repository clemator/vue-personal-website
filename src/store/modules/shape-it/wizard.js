import { WIZARD } from './../../../utils/constants/index';
import cache from './../../../storage/cache';


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
  async setCacheData({ commit }) {
    let surface = await cache.get('WIZARD', 'SURFACE');
    commit('setSurface', surface || WIZARD.SURFACES.NONE);
  },
  changeSurfaceType({ commit }, surface) {
    commit('setSurface', surface);
    cache.set('WIZARD', 'SURFACE', surface);
  },
  addError({ commit }, error) {
    commit('addError', error);
  },
  resetErrors({ commit }) {
    commit('resetErrors');
  },
  resetSurfaceType({ commit }) {
    commit('resetSurface');
    cache.set('WIZARD', 'SURFACE', WIZARD.SURFACES.NONE);
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
