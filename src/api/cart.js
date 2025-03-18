import request from '@/utils/request'
import store from '@/store'
// 添加物品到购物车中
export const addCart = ( goodsId, goodsNum, goodsSkuId) => { // goodsSkuId商品规格
  return request.post('/cart/add',{
    goodsId,goodsNum,goodsSkuId,
  })
}
