import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import { store } from 'core-js/internals/reflect-metadata'
Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    getToken(state) {
      const userInfo =  state.user.userInfo
      console.log('测试vuex中的getters',userInfo)
      return userInfo.token
    }
  },
  modules: {
    user, cart
  }
})
