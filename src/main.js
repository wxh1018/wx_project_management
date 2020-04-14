import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VDistpicker from 'v-distpicker'
import axios from 'axios';
import echarts from 'echarts'
import em from '../src/send'
Vue.prototype.$em = em
Vue.prototype.$ech = echarts
import base from './until/base'
import Regular from './until/Regular'
Vue.prototype.base = base
Vue.prototype.regular = Regular

Vue.prototype.$axios =axios;
Vue.component('v-distpicker', VDistpicker)
Vue.use(ElementUI);
Vue.config.productionTip = false
window.router=router
// Vue.prototype.baseurl = 'http://gu.free-http.svipss.top'
Vue.prototype.baseurl = 'http://119.3.210.185:8921'
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("phone") || "";
  if(token){
    next()
  }else{
    if(to.path!=='/login'){
      if(to.path=='/'){
        next()
      }else{
        next({path:'/login'})
      }
    }else{
      next()
    }
  }
 
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
