import { getInfo,setInfo } from '@/utils/storage'

const state = { // 读取的时候直接读取
  userInfo: getInfo()
}
const mutations = {
  // 提供方法设置用户信息
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
    setInfo(userInfo) // 存储到本地
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions,
  getters
}
