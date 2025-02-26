import request from '@/utils/request'
// 1.获取图形验证码
export function getPicCode () {
  return request.get('/captcha/image')
}
// 2.获取短信验证码
export function getMsgCode (captchaCode, captchaKey, mobile) {
  return request.post('/captcha/sendSmsCaptcha', {
    form: { captchaCode, captchaKey, mobile }
  })
}
