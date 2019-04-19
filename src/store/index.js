import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './modules/authentication/index';
import shapeIt from './modules/shape-it/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    shapeIt
  },
  strict: process.env.NODE_ENV !== 'production'
});
