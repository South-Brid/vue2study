// 约定通用键名
const INFO_KEY = "SQT"
// 从本地读取个人信息
export const getInfo = () => {
  const result =  localStorage.getItem(INFO_KEY)
  if (!result) {
    return {token: '', userId:''}
  } else {
    return JSON.parse(result)
  }
}
// 存储信息到本地中
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(JSON.stringify(obj)))
}
// 移除本地
export const  removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
