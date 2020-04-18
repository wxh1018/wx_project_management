import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
Vue.use(Router)

import market from './market'

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/project',
      children: [
        {
          path: '/project',
          name: 'project',
          component: () => import('../components/project.vue')
        }, {
          path: '/allocation',
          component: () => import('../components/allocation.vue')
        }, {
          path: '/Statistical',
          component: () => import('../components/Statistical.vue')
        },
        {
          path: '/Personal',
          component: () => import('../components/Personal.vue')
        },
        {
          path: '/market',
          name: 'market',
          component: () => import('../views/Market_tracking/Index.vue'),
          children: market
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../components/CodeLogin.vue')
    },
  ]
})
export default router
