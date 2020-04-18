import * as Api from '../api/market'
const market = {
    state: {
        totalData: [],//市场跟踪首页数据
        edit_id: '',//设置id
        mon_data: [],//月报总数据
    },
    getters: {
        //根据id查询当前项目
        findmon_byid: (state) => index => {
            return state.totalData.filter(v => v.id == index)[0]
        }
    },
    mutations: {
        set_totalData(state, v) {
            state.totalData = v
        },
        set_edit_id(state, v) {
            state.edit_id = v
        },
        set_mon_data(state, v) {
            state.mon_data = v
        }
    },
    actions: {
        get_totalData({ commit, rootState }) {
            Api.get_totalData({ phone: rootState.phone }).then(data => {
                commit('set_totalData', data.data)
            })
        },
        edit_totalData({ state, dispatch }, params) {
            console.log(params);
            return Api.edit_totalData(params).then(data => {
                dispatch('get_totalData')
                return true
            })
        },
        delete_totalData({ state, dispatch }, params) {
            return Api.del_totalData(params).then(data => {
                dispatch('get_totalData')
                return true
            })
        },
        // 月报总数据
        get_mon_data({ state, dispatch, commit }) {
            Api.get_allmon({ mId: state.edit_id }).then(data => {
                commit('set_mon_data', data.data)
                return data.data
            })
        },
        // 月报添加
        add_mon_data({ state, dispatch }, params) {
            Api.add_mon(params).then(data => {
                dispatch('get_mon_data')
                return data.data
            })
        },
        //月报删除
        del_mon({ dispatch }, params) {
            Api.del_mon(params).then(data => {
                dispatch('get_mon_data')
            })
        },
        update_mon({ dispatch }, params) {
            return Api.modify_mon(params).then(data => {
                console.log(data);
                dispatch('get_mon_data')
                return data.data
            })
        }
    }
}
export default market