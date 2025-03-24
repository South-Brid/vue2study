import { getInfo,setInfo } from '@/utils/storage'

const state = { // 读取的时候直接读取
  userInfo: getInfo()
}
const mutations = {
  // 提供方法设置用户信息
  setUserInfo (state, userInfo) {
    console.log('mutations',userInfo)
    state.userInfo = userInfo
    setInfo(userInfo) // 存储到本地
  }
}
const actions = {
  logout ({ commit }) {
    console.log('logout')
    // 清空自己模块的信息
    commit('setUserInfo',{})
    // 清空其他模块内容  root true 表示从根级别查找模块目录
    commit('cart/setCartList', [],{ root: true })
  }
}
const getters = {}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions,
  getters
}
