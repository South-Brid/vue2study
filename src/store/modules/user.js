const state = {
  userInfo: {
    token:'',
    userId:''
  }
}
const mutations = {
  // 提供方法设置用户信息
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
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
