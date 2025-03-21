import { getCartList } from '@/api/cart'

const state = {
  cartList:[]
}
const mutations = {
  // 设置购物车列表
  setCartList(state, payload) {
    state.cartList = payload
  },
  // 修改cartList中的isChecked属性
  toggleCheck(state, id) {
    const item = state.cartList.find(item => item.goods_id === id);
    if (item) {
      item.isChecked = !item.isChecked;
    }
  },
  // 全选组件
  toggleAllChecked(state,flag) {
    state.cartList.forEach(item => {
      // 将每个项目的 isChecked 反转
      item.isChecked = flag
    });
  }
}

const actions = { // 异步数据
  async getCartList (context) {
    const { data } = await getCartList(); // 异步请求
    data.list.forEach((item) => {
      item.isChecked = true  // 默认是全选中
    })
    context.commit('setCartList', data.list)
  }
}

const getters = {
  // 商品总数量
  cartTotal(state) {
    return state.cartList.reduce((total, item) => {
      return total + item.goods_num
    },0)
  },
  // 获取商品的商品项目
  selectCartList(state) {
    return state.cartList.filter((item) => {
       return item.isChecked === true
    })
  },
  // 获取选中的商品数
  selectCount(state,getters) {
    return   getters.selectCartList.reduce((total, item) => {
      return total + item.goods_num
    },0)
  },
  // 选中的总价
  selectPrice(state,getters) {
    return getters.selectCartList.reduce((total, item) => {
      return total + item.goods.goods_price_min * item.goods_num
    },0).toFixed(2)
  },
  // 获取是不是全选
  getSelectedAll(state) {
    if (state.cartList.length === 0) {
      return false;
    }
    return state.cartList.every(item => item.isChecked);
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions,
  getters
}
