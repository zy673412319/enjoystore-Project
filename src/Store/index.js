import Vue from 'vue'
import Vuex from 'vuex'

import indexData from './modules/index'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    indexData
  }
})
