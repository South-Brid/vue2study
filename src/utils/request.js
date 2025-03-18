import axios from 'axios'
import {Toast} from 'vant'
import store from '@/store'
// 创建axios实例 对实例进行配置 不会污染axios本身实例
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  Toast.loading({ // Toast 默认是单例模式
    message:'加载中...',
    forbidClick: true,
    duration: 0 // 加载不会自动消失
  })
  // 添加统一的请求头
  config.headers = {
    'Access-Token': store.getters.getToken,
    'platform': 'H5'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  const res = response.data
  if (res.status !== 200) {
    console.log("登录错误信息",res)
    Toast.fail(res.message) // 打印错误信息
    return Promise.reject('请求失败')
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default request
