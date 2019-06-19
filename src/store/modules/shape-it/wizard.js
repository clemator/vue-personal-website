import { WIZARD } from '@/utils/constants/index';
import cache from '@/storage/cache';
import { isEmpty } from '@/utils/fp';

const state = {
  onPending: true,
  surface: {},
  pattern: {},
  selectedType: {
    color: '',
    module: ''
  },
  onPreview: false,
  errors: {}
};

const getters = {
  isSurfaceSelected: state => state.surface.NAME !== WIZARD.SURFACES.NONE.NAME,
  currentSurface: state => state.surface,
  currentPattern: state => state.pattern,
  isColorSelected: state => state.selectedType.color !== WIZARD.COLORS.NONE,
  isModuleSelected: state => state.selectedType.module !== WIZARD.MODULES.NONE,
  currentColor: state => state.selectedType.color,
  currentModule: state => state.selectedType.module,
  errors: state => state.errors,
  onPending: state => state.onPending,
  onPreview: state => state.onPreview
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
    const module  = await cache.get('WIZARD', 'MODULE');

    if (isEmpty(surface))
      cache.set('WIZARD', 'SURFACE', WIZARD.SURFACES.NONE.NAME);
    if (isEmpty(pattern))
      cache.set('WIZARD', 'PATTERN', WIZARD.PATTERNS.NONE.NAME);
    if (isEmpty(color))
      cache.set('WIZARD', 'COLOR', WIZARD.COLORS.NONE);
    if (isEmpty(module))
      cache.set('WIZARD', 'MODULE', WIZARD.MODULES.NONE);

    commit('setSurface', !isEmpty(surface) ? surface : WIZARD.SURFACES.NONE);
    commit('setPattern', !isEmpty(pattern) ? pattern : WIZARD.PATTERNS.NONE);
    commit('setColor', !isEmpty(color) ? color : WIZARD.COLORS.NONE);
    commit('setModule', !isEmpty(module) ? module : WIZARD.MODULES.NONE);
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
   *  - Unset module as both cannot be active at the same time
   * @param {Object} context
   * @param {String} color
   */
  changeColor({ commit }, color) {
    commit('setColor', color);
    commit('setModule', WIZARD.MODULES.NONE);
    cache.set('WIZARD', 'COLOR', color);
    cache.set('WIZARD', 'MODULE', WIZARD.MODULES.NONE);
  },
  /**
   * Change Module
   *  - Set module in store and cache
   *  - Unset color as both cannot be active at the same time
   * @param {Object} context
   * @param {String} module
   */
  changeModule({ commit }, module) {
    commit('setModule', module);
    commit('setColor', WIZARD.COLORS.NONE);
    cache.set('WIZARD', 'MODULE', module);
    cache.set('WIZARD', 'COLOR', WIZARD.COLORS.NONE);
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
  },
  /**
   * Set Preview
   *  - Set the wizard into preview mode
   * @param {Object} context 
   */
  setPreview({ commit }) {
    commit('setPreview', true);
  },
  /**
   * Cancel Preview
   *  - Undo the preview mode
   * @param {Object} context 
   */
  cancelPreview({ commit }) {
    commit('setPreview', false);
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
    state.selectedType.color = color;
  },
  /**
   * Set Module
   * @param {Object} state 
   * @param {String} module 
   */
  setModule(state, module) {
    state.selectedType.module = module;
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
  },
  /**
   * Set Preview
   *  - Flag indicating if wizard is on preview
   * @param {Object} state 
   * @param {Boolean} value 
   */
  setPreview(state, value) {
    state.onPreview = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
