import Vue from 'vue';
import Vuex from 'vuex';
import authentication from '@/store/modules/authentication/index';
import shapeIt from '@/store/modules/shape-it/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    shapeIt
  },
  strict: process.env.NODE_ENV !== 'production'
});
