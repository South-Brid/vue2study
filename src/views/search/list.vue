<script>
import GoodsItem from '@/components/GoodsItem.vue';
import { getProList } from '@/api/product'
export default {
  name: 'ListIndex',
  components: { GoodsItem },
  data() {
    return {
      page: 1,
      proList:[]
    }
  },
  computed: {
    // 使用计算属性获取路由传参
    querySearch() {
      return  this.$route.query.search;
    }
  },
  async created() {
    // 从服务器拉取数据
   const res =await getProList({
     categoryId:this.$route.query.categoryId, // 通过分类传递过来
     goodsName:this.querySearch,
     page:this.page,
   });
   // 保存到本地
   this.proList = res. data.list.data;
  }
}
</script>

<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />
    <van-search
        readonly
        shape="round"
        background="#ffffff"
        :value="querySearch"
        show-action
        @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>
    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>
    <div class="goods-list">
            <GoodsItem v-for="item in proList" :key="item.good_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
