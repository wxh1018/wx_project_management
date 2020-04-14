import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    superpwd:'9999',
    isone: false,
    data: [],
    title: "\"综合规划研究所\"项目管理系统V1.1",
    left: '50px',//综合
    logo: require('../assets/weixinlogo.png'),
    phone: '',//用户手机号
    pId: '',
    threeproject:'',// 进度需要的三个值
    active:''
  },
  mutations: {
    setdata(state, v) {
      state.data = v
    },
    setIsone(state, v) {
      state.isone = v
    },
    setPhone(state, v) {
      state.phone = v
    },
    setPid(state, v) {
      state.pId = v
    },
    setthreeproject(state,v){ 
      state.threeproject = v
    },
    set_active(state,v){
      state.active = v
    }
  },
  actions: {
  },
  modules: {
  }
})
