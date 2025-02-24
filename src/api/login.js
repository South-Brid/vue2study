import request from '@/utils/request'

export function getPicCode () {
  return request.get('/captcha/image')
}
const loginApi = {
  getPicCode
}

export default loginApi
