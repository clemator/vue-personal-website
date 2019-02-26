/**
 *  This plugin is a module for every third party that need to be register
 *  into `Vue.prototype` via the `Vue.use()` method
 *
 *  @link https://vuejs.org/v2/api/#Vue-use
 */
import Vue from 'vue'

/**
 *  VueJS Modal
 *  @link https://github.com/euvl/vue-js-modal
 */
import VModal from 'vue-js-modal'

Vue.use(VModal, { dynamic: true })
