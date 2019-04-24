import { WIZARD } from './../../../utils/constants/index';
import cache from './../../../storage/cache';
import { isEmpty } from './../../../utils/fp';

const state = {
  onPending: true,
  surface: WIZARD.SURFACES.NONE,
  pattern: {},
  errors: {}
};

const getters = {
  isSurfaceSelected: state => state.surface !== WIZARD.SURFACES.NONE,
  currentSurface: state => state.surface,
  currentPatternName: state => state.pattern.name || WIZARD.PATTERNS.NONE.NAME,
  errors: state => state.errors,
  onPending: state => state.onPending
};

const actions = {
  async setCacheData({ commit }) {
    const surface = await cache.get('WIZARD', 'SURFACE');
    const pattern = await cache.get('WIZARD', 'PATTERN');

    if (isEmpty(surface))
      cache.set('WIZARD', 'SURFACE', WIZARD.SURFACES.NONE);
    if (isEmpty(pattern))
      cache.set('WIZARD', 'PATTERN', WIZARD.PATTERNS.NONE.NAME);

    commit('setSurface', !isEmpty(surface) ? surface : WIZARD.SURFACES.NONE);
    commit('setPattern', !isEmpty(pattern) ? pattern : WIZARD.PATTERNS.NONE.NAME);
    commit('setPending', false);
  },
  changeSurfaceType({ commit }, surface) {
    commit('setSurface', surface);
    cache.set('WIZARD', 'SURFACE', surface);
  },
  changePatternType({ commit }, pattern) {
    commit('setPattern', pattern);
    cache.set('WIZARD', 'PATTERN', pattern);
  },
  addError({ commit }, error) {
    commit('addError', error);
  },
  resetErrors({ commit }) {
    commit('resetErrors');
  },
  resetSurfaceType({ commit }) {
    commit('setSurface', WIZARD.SURFACES.NONE);
    cache.set('WIZARD', 'SURFACE', WIZARD.SURFACES.NONE);
  },
  resetPatternType({ commit }) {
    commit('setPattern', WIZARD.PATTERNS.NONE.NAME);
    cache.set('WIZARD', 'PATTERN', WIZARD.PATTERNS.NONE.NAME);
  }
};

const mutations = {
  setSurface(state, surface) {
    state.surface = surface;
  },
  setPattern(state, pattern) {
    state.pattern = pattern;
  },
  addError(state, { key, data }) {
    state.errors[key] = data;
  },
  resetErrors(state) {
    state.errors = {};
  },
  setPending(state, value) {
    state.onPending = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
