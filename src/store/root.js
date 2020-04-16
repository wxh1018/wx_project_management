import * as Api from '../api/market'
const market = {
    state: {
        user_msg: '',
        uId: ''
    },
    getters: {},
    mutations: {
        set_user_msg(state, v) {
            state.user_msg = v
            let msg = v;
            let uId = "";
            msg.uId == 0 ? (uId = msg.id) : (uId = msg.uId);
            state.uId = uId
        },
    },
    actions: {

    }
}
export default market