<template>
  <!-- 头部 vant2 NavBar导航栏 -->
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow   @click-left="onClickLeft"/>
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img  v-if="picUrl" :src="picUrl" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{ second === totalSecond ? '获取验证码' : second + '秒后获取'}}
          </button>
        </div>
      </div>
      <div class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 存储用户输入的图片验证码
      picKey: '', // 存储验证码的唯一标识
      picUrl: '', // 存储渲染的图片地址
      totalSecond: 60, // 倒计时总描述
      second: 60, // 当前秒数
      timer: null, // 定时器id
      mobile: '' // 手机号
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    // 回到首页
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取图片验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 获取短信验证码
    async getCode () {
      // 验证用用户输入格式
      if (!this.vaildFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        // 获取短信验证码请求
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast.success('短信发送成功')
        console.log('短信请求', res)
        this.timer = setInterval(() => {
          this.second--
          if (this.second === 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 校验手机号和图形验证码
    vaildFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) { // 验证手机号
        this.$toast.fail('请输入正确格式手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) { // 验证图形验证码
        this.$toast.fail('请输入正确格式验证码')
        return false
      }
      return true
    }
  },
  destroyed () {
    clearInterval(this.timer) // 页面析构清除定时器
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 49px 29px;
  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
