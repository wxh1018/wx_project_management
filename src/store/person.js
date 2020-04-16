import * as Api from '../api/market'
const market = {
    state: {
        person: [],//负责人数据
    },
    getters: {
        
    },
    mutations: {
        set_person(state, v) {
            console.log(v);
            state.person = v
        }
    },
    actions: {}
}
export default market