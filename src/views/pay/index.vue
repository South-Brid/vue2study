<template>
  <div>
    <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        fixed
        z-index="999"
        @click-left="onClickLeft"
    ></van-nav-bar>

    <div class="content-container">
      <!-- 收货地址 -->
      <div class="custom-address-card">
        <div class="card-content" @click="chooseAddress">
          <div class="card-left">
            <div v-if="selectAddress.address_id">
              <div class="name-phone"> {{ selectAddress.name }} {{ selectAddress.phone }} </div>
              <div class="address-text"> {{ longAddress }}  </div>
            </div>
            <div v-else class="placeholder-text"> 请选择收货地址  </div>
          </div>
          <div class="card-right">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="split-line"></div>
      <!-- 商品列表 -->
      <div class="product-card">
        <div class="product" v-for="item in order.goodsList" :key="item.goods_id">
          <div class="product-title">
            <div class="left">
              <img :src="item.goods_image" alt="商品图片">
            </div>
            <div class="right">
              <div class="product-name">{{ item.goods_name }}</div>
              <div class="price">
                <span>¥</span>
                <span class="nowprice"> {{  item.total_pay_price}}</span>
                <span class="quantity">x{{ item.total_num }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="split-line"></div>
      <!-- 优惠券 -->
      <div class="coupon-cell">
        <van-cell-group>
          <van-cell title="优惠券" is-link value="暂无可用" @click="chooseCoupon" />
        </van-cell-group>
      </div>
      <!-- 订单金额信息 -->
      <div class="order-card">
        <van-cell-group>
          <van-cell title="商品金额">
            <template #default>
              <span>¥{{ order.orderTotalPrice }}</span>
            </template>
          </van-cell>
          <van-cell title="运费">
            <template #default>
              <span v-if="!selectAddress"> 请选择配送地址</span>
              <span v-else>¥ 0.00 </span>
            </template>
          </van-cell>
          <van-cell title="优惠">
            <template #default>
              <span class="red-price">-¥{{ 0 }}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- 订单备注 -->
      <div class="remark-field">
        <van-field
            v-model="remark"
            label="订单备注"
            type="textarea"
            placeholder="选填，请先和商家协商一致"
            rows="1"
            autosize
        />
      </div>
      <!-- 支付方式 -->
      <div class="order-card">
        <van-cell-group>
          <van-cell title="支付方式">
            <template #default>
              <van-radio-group v-model="paymentMethod" direction="horizontal">
                <van-radio name="wechat">微信支付</van-radio>
                <van-radio name="alipay">支付宝</van-radio>
              </van-radio-group>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- 底部占位，防止提交栏遮挡内容 -->
      <div class="bottom-placeholder"></div>
    </div>

    <!-- 提交订单栏 -->
    <van-submit-bar
        :price="totalPayable * 100"
        button-text="提交订单"
        @submit="onSubmit"
        class="submit-bar"
    >
      <template #tip>
        <div v-if="discount > 0">已优惠 <span class="red-price">¥{{ 0 }}</span></div>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { getAddressList } from '@/api/address'
import { checkOrder } from '@/api/order'

export default {
  name: 'PayIndex',
  data() {
    return {
      addressList:[], // 提供地址容器
      order:{},
      personal:{},

      products: [
        {
          id: 1,
          title: '2023新款时尚连衣裙',
          price: 199.00,
          image: '/api/placeholder/80/80',
          specs: '颜色: 白色, 尺码: M',
          quantity: 1
        },
        {
          id: 2,
          title: '夏季轻薄透气运动鞋',
          price: 299.00,
          image: '/api/placeholder/80/80',
          specs: '颜色: 黑色, 尺码: 42',
          quantity: 1
        }
      ],
      remark: '',
      paymentMethod: 'wechat',
      shippingFee: 10.00,
      discount: 30.00
    };
  },
  created () {
    this.getAddressList()
    this.getOrderList()
  },
  computed: {
    // 获取选中的地址
    selectAddress() {
      return this.addressList.at(0) || {}
    },
    // 获取完整的地址
    longAddress() {
      if (!this.addressList.length) return '';
      const { province, city, region } = this.addressList[0].region || {};
      return province + city + region;
    },
    mode() {
      return this.$route.query.mode
    },
    cartIds() {
      return this.$route.query.cartIds
    },
    goodsId() {
      return this.$route.query.goodsId;
    },
    goodsSkuId() {
      return this.$route.query.goodsSkuId;
    },
    goodsNum() {
      return this.$route.query.goodsNum;
    },


    totalAmount() {
      return this.products.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    totalPayable() {
      return this.totalAmount + this.shippingFee - this.discount;
    }
  },
  methods: {
    async getAddressList() {
      try {
        const { data : {list}} = await getAddressList();
        this.addressList = list; // 将地址存储到变量中
      } catch (error) {
        console.error('获取地址列表失败', error);
        this.$toast('获取地址列表失败');
      }
    },
    async getOrderList () {
      let res;
      if (this.mode === 'cart') {
        res = await checkOrder(this.mode,{
          cartIds:this.cartIds
        });
      } else if (this.mode === 'buyNow') { // 立刻购买
        res = await checkOrder(this.mode,{
          goodsId:this.goodsId,
          goodsSkuId:this.goodsSkuId,
          goodsNum:this.goodsNum
        });
      }
      this.order = res.data.order;
      this.personal = res.data.personal;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    chooseAddress() {
      this.$toast('选择收货地址');
    },
    chooseCoupon() {
      this.$toast('选择优惠券');
    },
    onSubmit() {
      if (!this.selectAddress.address_id) {
        return this.$toast('请选择收货地址');
      }
      this.$dialog.confirm({
        title: '提交订单',
        message: `确认支付 ¥${this.formatPrice(this.totalPayable)}?`
      }).then(() => {
        this.$toast.success('支付成功');
      }).catch(() => {
        this.$toast('已取消支付');
      });
    }
  }
}
</script>

<style scoped lang="less">
@background-color: #f7f8fa;
@light-text: #969799;
@price-red: #ee0a24;
@price-orange: #fe560a;
@navbar-height: 46px;

// 内容容器，解决导航栏遮挡问题
.content-container {
  padding-top: calc(@navbar-height + 8px);
  padding-bottom: 60px;
}

// 通用卡片样式
.product-card, .order-card, .coupon-cell, .remark-field {
  margin: 10px;
}

// 固定元素
.submit-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.bottom-placeholder {
  height: 50px;
}

.split-line {
  height: 10px;
  background-color: @background-color;
}

.red-price {
  color: @price-red;
}

// 商品样式
.product {
  .product-title {
    display: flex;

    .left {
      margin: 10px;
      img {
        width: 90px;
        height: 90px;
        border-radius: 4px;
      }
    }

    .right {
      flex: 1;
      padding: 10px;

      .product-name {
        font-size: 14px;
        margin-bottom: 5px;
        font-weight: 500;
        word-break: break-word;
      }

      .product-specs {
        font-size: 12px;
        color: @light-text;
        margin-bottom: 5px;
      }

      .price {
        font-size: 14px;
        color: @price-orange;
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;

        .nowprice {
          font-size: 24px;
          margin: 0 5px;
          font-weight: 500;
        }

        .quantity {
          margin-left: auto;
          color: @light-text;
        }
      }
    }
  }
}

// 地址卡片样式
.custom-address-card {
  background-color: #fff;
  border-radius: 8px;
  margin: 12px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.card-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
  min-height: 24px;
}

.card-left {
  flex: 1;
  word-break: break-word;
}

.card-right {
  padding-left: 8px;
  color: @light-text;
}

.name-phone {
  font-weight: bold;
  font-size: 14px;
}

.address-text, .placeholder-text {
  color: @light-text;
  font-size: 12px;
  margin-top: 5px;
}

.placeholder-text {
  font-size: 14px;
}

/* 响应式调整 */
@media screen and (max-width: 375px) {
  .card-content {
    padding: 12px;
  }

  .product .product-title .left img {
    width: 70px;
    height: 70px;
  }
}
</style>
