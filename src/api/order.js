import request from '@/utils/request'

// 订单确认
export const checkOrder = (mode,obj) => {
  return request.get('/checkout/order',{
    params: {
      mode,
      delivery: 10,
      couponId:0,
      isUsePoints: 0,
      ...obj
    }
  })
}
// 提交订单
// 若是cart 参数里面需要携带 cartIds
// 若是buyNow 参数里面需要有 goodsId goodsNum goodsSkuId
// 参数里面有remark留言功能
export const submitOrder = (mode,obj) => {
  return request.post('/checkout/submit',{
    mode,
    delivery: 10,
    couponId:0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}
