<script>

import { mapGetters, mapState } from 'vuex'
import { Toast } from 'vant';

export default {
  name: 'LayoutCart',
  data(){
    return {
      isEdit:false, // 是不是在编辑状态
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart',['cartTotal','selectCartList','selectCount','selectPrice','getSelectedAll']),
    isLogin() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    goPay() {
      if (this.selectCount > 0) {
        this.$router.push({
          path:'/pay',
          query:{
            mode:'cart',
            cartIds: this.selectCartList.map(item => item.id).join(',')
          }
        });
      }
    },
    toggleCheck(id) {
      // 提交给vuex中的 mutation进行修改
      this.$store.commit('cart/toggleCheck', id);
    },
    toggleAllChecked(flag) {
      this.$store.commit('cart/toggleAllChecked', flag);
    },
    async onChange (value,item) {
      const obj = {
        goodsId: item.goods_id,
        goodsNum: value,
        goodsSkuId:item.goods_sku_id
      }
      await this.$store.dispatch('cart/updateCartList', obj);
    },
    // 删除购物车商品
    async handleDel() {
      if (this.selectCount === 0) return
      await this.$store.dispatch('cart/delSelect', this.selectCount);
      this.isEdit = false;
    }
  },

  watch: {
    // 监视isEdit的状态
    isEdit(value) {
      if (value) {
        // 删除状态去掉选中所有商品
        this.$store.commit('cart/toggleAllChecked', false)
      }
    }
  },
  created () {
    // 必须登录过的用户，才能使用购物车列表
    if (this.isLogin) { this.$store.dispatch('cart/getCartList')
    } else {
      Toast.fail('请先登录')
      this.$router.replace({
        path: '/login',
        query: {  backUrl: this.$route.fullPath }
      })
    }
  }
}
</script>

<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <div v-if="isLogin && cartList.length > 0 ">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all">共<i>{{ cartTotal }}</i>件商品</span>
        <span class="edit" @click="isEdit =!isEdit">
        <van-icon name="edit" />
        编辑
      </span>
      </div>
      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox :value="item.isChecked" @click="toggleCheck(item.goods_id)"></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
            <div class="price">¥ <span>{{ item.goods.goods_price_min}}</span></div>
            <van-stepper @change="(value) => onChange(value,item)" :value = "item.goods_num" integer  />
          </span>
          </div>
        </div>
      </div>
      <div class="footer-fixed">
        <div  class="all-check">
          <van-checkbox  icon-size="18"  :value= "getSelectedAll" @click="toggleAllChecked(!getSelectedAll)"></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span>¥ <i class="totalPrice"> {{ selectPrice }} </i></span>
          </div>
          <!--使用:class添加样式类-->
          <div v-if="!isEdit" @click="goPay()" class="goPay" :class="{disabled: selectCount === 0}">结算({{selectCount}})</div>
          <div v-else class="delete" :class="{disabled: selectCount === 0}" @click="handleDel()">删除</div>
        </div>
      </div>
    </div>
    <!--空购物车-->
    <div v-else class="empty-cart">
      <img src="@/assets/empty.png" alt="空购物车" class="empty-cart-image" />
      <div class="empty-cart-text">购物车还是空的，去逛逛吧~</div>
      <van-button type="danger" round size="normal" @click="$router.push('/home')">去购物</van-button>
    </div>
  </div>

</template>

<style scoped lang="less">
.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: calc(100vh - 50px - 44px); /* 减去顶部导航栏和底部导航的高度 */
}

.empty-cart-image {
  width: 120px;
  height: 80px;
  margin-bottom: 20px;
}

.empty-cart-text {
  font-size: 14px;
  color: #969799;
  margin-bottom: 30px;
}

/* Vant按钮样式 */
.van-button--danger {
  color: #fff;
  background-color: #ee0a24;
  border: 1px solid #ee0a24;
}

.van-button--normal {
  padding: 0 15px;
  font-size: 14px;
  height: 40px;
  line-height: 38px;
}

.van-button--round {
  border-radius: 999px;
}

.van-button__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.van-button__text {
  text-align: center;
}

.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}
</style>
