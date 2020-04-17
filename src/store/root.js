import * as Api from '../api/market'
const market = {
    state: {
        user_msg: '',
        uId: '',
        grade: ''
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
        set_grade(state, v) {
            state.grade = v
        }
    },
    actions: {

    }
}
export default market