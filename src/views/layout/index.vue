<template>
<div>
  <div>
    我是layout的占位空间
  </div>
  <van-tabbar v-model="active" active-color="#fc1e1e" inactive-color="#0a0a0c">
    <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o">分类页</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item icon="contact-o">我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">

</style>
