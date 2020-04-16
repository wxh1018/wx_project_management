import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
Vue.use(VueRouter)

import market from './market'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/project',
    children: [
      {
        path: 'project',
        component: () => import('../components/project.vue')
      }, {
        path: 'allocation',
        component: () => import('../components/allocation.vue')
      }, {
        path: 'Statistical',
        component: () => import('../components/Statistical.vue')
      },
      {
        path: 'Personal',
        component: () => import('../components/Personal.vue')
      },
      {
        path: '/market',
        name:'market',
        component: () => import('../views/Market_tracking/Index.vue'),
        children: market
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../components/CodeLogin.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
