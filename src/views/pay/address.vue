<script>
import { postAddress } from '@/api/address'

export default {
  name: 'MyAddress',
  data() {
    return {
      name:'sqt',
      address:'上海',
      tel:'1111111111',
    }
  },
  methods: {
    async postAddress(){
     const res =  await postAddress(this.name,this.tel);
     console.log('提交地址',res)
    }
  }
}
</script>

<template>
  <body>
  <div id="app" class="edit-address">
    <!-- 导航栏 -->
    <van-nav-bar
        title="编辑收货地址"
        left-arrow
        @click-left="$router.go(-1)"
    />
    <!-- 地址表单 -->
    <div class="address-form">
      <van-cell-group>
        <van-field
            label="收货人"
            placeholder="请输入收货人姓名"
            required
            :value="name"
        />
        <van-field
            type="tel"
            label="手机号码"
            placeholder="请输入手机号码"
            required
            :value="tel"
        />
        <van-field
            label="所在地区"
            placeholder="请选择所在地区"
            required
            :value="address"
        />
      </van-cell-group>
    </div>
    <!-- 底部保存按钮 -->
    <div class="bottom-button">
      <van-button @click="postAddress" type="primary" block>保存</van-button>
    </div>
    <!-- 地区选择器弹出层 -->
    <van-popup position="bottom">
      <van-area />
    </van-popup>
  </div>
  </body>
</template>

<style scoped lang="less">
.edit-address {
  padding-bottom: 50px;
}
.address-form {
  margin-top: 12px;
}
.bottom-button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 16px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 999;
}
</style>
