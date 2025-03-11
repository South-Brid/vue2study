import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import { store } from 'core-js/internals/reflect-metadata'
Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    getToken(state) {
      return state.user.userInfo.token
    }
  },
  modules: {
    user
  }
})
