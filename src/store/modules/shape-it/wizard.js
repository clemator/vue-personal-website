import { WIZARD } from './../../../utils/constants/index';

const state = {
  step: WIZARD.STEPS.FIRST,
  surface: WIZARD.SURFACES.NONE,
  errors: {}
};

const getters = {
  currentStep: state => state.step,
  currentSurface: state => state.surface,
  errors: state => state.errors
};

const actions = {
  changeStep({ commit }, step) {
    commit('setStep', step || WIZARD.STEPS.FIRST);
  },
  changeSurfaceType({ commit }, surface) {
    commit('setSurface', surface || '');
  },
  addError({ commit }, error) {
    commit('addError', error);
  },
  resetErrors({ commit }) {
    commit('resetErrors');
  }
};

const mutations = {
  setStep(state, step) {
    state.step = step;
  },
  setSurface(state, surface) {
    state.surface = surface;
  },
  addError(state, { key, data }) {
    state.errors[key] = data;
  },
  resetErrors(state) {
    state.errors = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
