import request from '@/utils/request'

// 获取分类
export const getCategoryData = () => {
  return request('/category/list')
}
