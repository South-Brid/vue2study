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
// 3.登录验证
export function login (smsCode, mobile) {
  return request.post('/passport/login', {
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {}
    }
  })
}
