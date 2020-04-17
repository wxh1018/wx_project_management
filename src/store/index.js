import Vue from 'vue'
import Vuex from 'vuex'
import market from './market'
import root from './root'
import person from './person'
import * as Api from '../api/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    superpwd: '9999',
    isone: false,
    data: [],
    title: "\"综合规划研究所\"项目管理系统V1.1",
    left: '50px',//综合
    logo: require('../assets/weixinlogo.png'),
    phone: '',//用户手机号
    pId: '',
    threeproject: '',// 进度需要的三个值
    active: '',
    pro_data: '',//全部数据
    pro_type: [],//类型对应的数据
    addtabletypeoptions: [
      "综合交通类",
      "公共客运类",
      "货运物流类",
      "枢纽咨询类",
      "城市交通类",
      "其他",
    ],
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
    setthreeproject(state, v) {
      state.threeproject = v
    },
    set_active(state, v) {
      state.active = v
    },
    set_pro_data(state, v) {
      state.pro_data = v
    },
    set_pro_type(state, v) {
      state.pro_type = v
    }
  },
  actions: {
    //获取所有数据
    get_pro_data({ commit, state, rootState }) {
      let phone = rootState.phone
      var fil = []
      Api.get_total({ phone }).then(data => {
        commit('set_pro_data', data.data)
        data.data.forEach(v => {
          Api.get_total_byid({ id: v.id }).then(res => {
            res.data.forEach(n => {
              fil.push(n)
              if (fil.length == data.data.length) {
                const da = () => {
                  let obj = []
                  state.addtabletypeoptions.forEach(r => {
                    let length = fil.filter(v => v.projectType == r).length
                    obj.push({ name: r, value: length })
                  })
                  return obj
                }
                commit('set_pro_type', da())
              }
            })
          })
        })
      })
    }
  },
  modules: {
    market,
    root,
    person
  }
})
