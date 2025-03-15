// 约定通用键名
const INFO_KEY = "SQT"
// 本地个人信息
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
const HISTORY_KEY = "HISTORY_KEY"
// 获取历史记录
export const getHistory = () => {
  const result =  localStorage.getItem(HISTORY_KEY)
  if (!result) {
    return []
  } else {
    return JSON.parse(result)
  }
}
// 设置历史记录
export const setHistory = (obj) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(obj))
}

export const removeHistory = () => {
  localStorage.removeItem(HISTORY_KEY)
}
