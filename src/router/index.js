import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: Home,
    children: [{
      path: 'users', component: () => import('@/views/Home/User'), name: '用户列表'
    }, {
      path: 'roles', component: () => import('@/views/Home/Roles'), name: '角色列表'
    }, {
      path: 'rights', component: () => import('@/views/Home/Rights'), name: '权限列表'
    }, {
      path: 'goods',
      component: () => import('@/views/Home/Goods'),
      name: '商品列表',
      children: [
        { path: 'add', component: () => import('@/views/Home/Goods/Add') }
      ]
    }, {
      path: 'params', component: () => import('@/views/Home/Params'), name: '分类列表'
    }, {
      path: 'categories', component: () => import('@/views/Home/Categories'), name: '商品分类'
    }, {
      path: 'orders', component: () => import('@/views/Home/Orders'), name: '订单列表'
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
