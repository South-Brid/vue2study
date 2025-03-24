import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// 使用异步组件懒加载
const Login = () => import('@/views/login/index.vue')
const Layout = () => import('@/views/layout/index.vue')
const Myorder = () => import('@/views/myorder/index.vue')
const Pay = () => import('@/views/pay/index.vue')
const Prodetail = () => import('@/views/prodetail/index.vue')
const Search = () => import('@/views/search/index.vue')
const SearchList = () => import('@/views/search/list.vue')
const LayoutCart = () => import('@/views/layout/cart.vue')
const LayoutCategory = () => import('@/views/layout/category.vue')
const LayoutHome = () => import('@/views/layout/home.vue')
const LayoutUser = () => import('@/views/layout/user.vue')
const MyAddress = () => import('@/views/pay/address.vue')

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        { path: '/cart', component: LayoutCart },
        { path: '/category', component: LayoutCategory },
        { path: '/home', component: LayoutHome },
        { path: '/user', component: LayoutUser }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: Myorder },
    { path: '/myaddress', component: MyAddress },
    { path: '/pay', component: Pay },
    // 为了确认商品是谁，这里使用动态路由传参,在路由中携带id
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

const authUrls = ['/pay','/myorder'] // 定义需要token的数组路由
// 所有页面渲染前会经过全局前置守卫
router.beforeEach((to, from, next) => {
// 判断用户有没有token
  if(!authUrls.includes(to.path)){ // 非权限直接访问
    next()
  } else {
    // 访问user模块的token 但是太长了可以封装成函数
    const token = store.getters.getToken;
    if (token) {  next()
    } else {
      console.log('没有token，拦截到首页中')
      next('/login') // token不存在拦截到登录页面
    }
  }
})

export default router
