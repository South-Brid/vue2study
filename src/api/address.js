import request from '@/utils/request'

// 获取地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}
// 提交地址
export const postAddress = (name, phone) => {
  return request.post('/address/add', {
    form: {
      name, phone,
      region: [
        {
          label: "上海",
          value: 782
        },
        {
          label: "上海市",
          value: 783
        },
        {
          label: "徐汇区",
          value: 785
        }
      ],
      detail: "北京路1号楼8888室"
    }
  })
}
