<script>
import homeApi from '@/api/home'
import GoodsItem from '@/components/GoodsItem.vue'
import index from 'vuex'

export default {
  name: 'LayoutHome',
  components: { GoodsItem },
  computed: {
    index () {
      return index
    }
  },
  data() {
    return {
      bannerList:[],
      navList:[],
      proList:[]
    }
  },
  async created () { // 首页请求数据
    const res =  await homeApi.getHomeData()
    const dataArray = res.data.pageData.items
    this.bannerList = dataArray[1].data
    this.navList = dataArray[3].data
    this.proList = dataArray[6].data
  }
}
</script>

<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="智慧商城" fixed />
    <!-- 搜索框 -->
    <van-search
        readonly
        shape="round"
        background="#f1f1f2"
        placeholder="请在此输入搜索关键词"
        @click="$router.push('/search')"
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
      <van-swipe-item v-for="(item,index) in bannerList" :key="item.imgUrl" :name="item.imgName">
        <img :src=bannerList[index].imgUrl alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 导航 -->
    <van-grid column-num="5" icon-size="40">
      <van-grid-item
          v-for="item in navList" :key="item.imgUrl"
          :icon="item.imgUrl"
          :text="item.text"
          @click="$router.push('/category')"
      />
    </van-grid>
    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>
      <div class="goods-list" >
        <GoodsItem v-for="item in proList"
                   :key="item.good_id"
                   :item="item">
        <!--使用父传子的方式-->
        </GoodsItem>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}

// 分类导航部分
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

// 猜你喜欢
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
