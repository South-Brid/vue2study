import request from '@/utils/request'

// 添加物品到购物车中
export const addCart = ( goodsId, goodsNum, goodsSkuId) => { // goodsSkuId商品规格
  return request.post('/cart/add',{
    goodsId,goodsNum,goodsSkuId,
  })
}
// 获取购物车列表
export const getCartList =  () => {
  return request.get('/cart/list')
}

