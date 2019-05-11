import { WIZARD, CELL } from './../../../utils/constants/index';
import cache from './../../../storage/cache';
import { isEmpty } from './../../../utils/fp';

const state = {
  onPending: true,
  surface: {},
  pattern: {},
  color:  '',
  errors: {}
};

const getters = {
  isSurfaceSelected: state => state.surface.NAME !== WIZARD.SURFACES.NONE.NAME,
  currentSurface: state => state.surface,
  currentPattern: state => state.pattern,
  currentColor: state => state.color,
  errors: state => state.errors,
  onPending: state => state.onPending
};

const actions = {
  /**
   * Set Cache Data
   *  - Retrieve cached data and hydrate the store
   * @param {Object} context
   */
  async setCacheData({ commit }) {
    const surface = await cache.get('WIZARD', 'SURFACE');
    const pattern = await cache.get('WIZARD', 'PATTERN');
    const color   = await cache.get('WIZARD', 'COLOR');

    if (isEmpty(surface))
      cache.set('WIZARD', 'SURFACE', WIZARD.SURFACES.NONE.NAME);
    if (isEmpty(pattern))
      cache.set('WIZARD', 'PATTERN', WIZARD.PATTERNS.NONE.NAME);
    if (isEmpty(color))
      cache.set('WIZARD', 'COLOR', WIZARD.COLORS.NONE);

    commit('setSurface', !isEmpty(surface) ? surface : WIZARD.SURFACES.NONE);
    commit('setPattern', !isEmpty(pattern) ? pattern : WIZARD.PATTERNS.NONE);
    commit('setColor', !isEmpty(color) ? color : WIZARD.COLORS.NONE);
    commit('setPending', false);
  },
  /**
   * Change Surface Type
   *  - Set surface in store and cache
   * @param {Object} context
   * @param {Object} surface
   */
  changeSurfaceType({ commit }, surface) {
    commit('setSurface', surface);
    cache.set('WIZARD', 'SURFACE', surface);
  },
  /**
   * Change Color
   *  - Set color in store and cache
   * @param {Object} context
   * @param {String} color
   */
  changeColor({ commit }, color) {
    commit('setColor', color);
    cache.set('WIZARD', 'COLOR', color);
  },
  /**
   * Change Pattern Type
   *  - Set pattern in store and cache
   * @param {Object} context
   * @param {Object} pattern
   */
  changePatternType({ commit }, pattern) {
    commit('setPattern', pattern);
    cache.set('WIZARD', 'PATTERN', pattern);
  },
  /**
   * Add Error
   * @param {Object} context
   * @param {Object} error
   */
  addError({ commit }, error) {
    commit('addError', error);
  },
  /**
   * Reset Errors
   * @param {Object} context
   */
  resetErrors({ commit }) {
    commit('resetErrors');
  },
  /**
   * Reset Surface Type
   *  - Also reset in cache
   * @param {Object} context
   */
  resetSurfaceType({ commit, dispatch }) {
    dispatch('shapeIt/grid/resetGrid', undefined, {root:true});
    commit('setSurface', WIZARD.SURFACES.NONE);
    cache.set('WIZARD', 'SURFACE', WIZARD.SURFACES.NONE.NAME);
  },
  /**
   * Reset Pattern Type
   *  - Also reset in cache
   * @param {Object} context
   */
  resetPatternType({ commit }) {
    commit('setPattern', WIZARD.PATTERNS.NONE);
    cache.set('WIZARD', 'PATTERN', WIZARD.PATTERNS.NONE.NAME);
  }
};

const mutations = {
  /**
   * Set Surface
   * @param {Object} state
   * @param {Object} surface
   */
  setSurface(state, surface) {
    state.surface = surface;
  },
  /**
   * Set Color
   * @param {Object} state 
   * @param {String} color 
   */
  setColor(state, color) {
    state.color = color;
  },
  /**
   * Set Pattern
   * @param {Object} state
   * @param {Object} pattern
   */
  setPattern(state, pattern) {
    state.pattern = pattern;
  },
  /**
   * Add Error
   * @param {Object} state
   * @param {Object} error
   */
  addError(state, { key, data }) {
    state.errors[key] = data;
  },
  /**
   * Reset Errors
   * @param {Object} state
   */
  resetErrors(state) {
    state.errors = {};
  },
  /**
   * Set Pending
   * @param {Object} state
   * @param {Boolean} value
   */
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
