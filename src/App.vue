<template>
  <div id="app">
    <router-view/>
<!--    <van-button type="primary">主要按钮</van-button>-->
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <van-checkbox name="a">复选框 a</van-checkbox>
      <van-checkbox name="b">复选框 b</van-checkbox>
      <van-checkbox name="c">复选框 c</van-checkbox>
    </van-checkbox-group>
    <van-button type="primary" @click="checkAll">全选</van-button>
    <van-button type="info" @click="toggleAll">反选</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      result: []
    }
  },
  methods: {
    checkAll () {
      this.$refs.checkboxGroup.toggleAll(true)
    },
    toggleAll () {
      this.$refs.checkboxGroup.toggleAll()
    }
  }
}
</script>

<style lang="less">
</style>
