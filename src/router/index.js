import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Myorder from '@/views/myorder/index.vue'
import Pay from '@/views/pay/index.vue'
import Prodetail from '@/views/prodetail/index.vue'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/list.vue'
import LayoutCart from '@/views/layout/cart.vue'
import LayoutCategory from '@/views/layout/category.vue'
import LayoutHome from '@/views/layout/home.vue'
import LayoutUser from '@/views/layout/user.vue'

Vue.use(VueRouter)
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
    { path: '/pay', component: Pay },
    // 为了确认商品是谁，这里使用动态路由传参,在路由中携带id
    { path: '/prodetail:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

export default router
