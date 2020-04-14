import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import project from '../components/project.vue'
import allocation from '../components/allocation.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/project',
    children: [
      {
        path: 'project',
        component: project
      }, {
        path: 'allocation',
        component: allocation
      }, {
        path: 'Statistical',
        component: () => import('../components/Statistical.vue')
      },
      {
        path: 'Personal',
        component: () => import('../components/Personal.vue')
      },{
        path:'market',
        component:()=>import('../views/Market_tracking/Index.vue')
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
