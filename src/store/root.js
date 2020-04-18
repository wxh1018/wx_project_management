import * as Api from '../api/market'
const market = {
    state: {
        user_msg: '',
        uId: '',
        id: '',
        grade: ''
    },
    getters: {},
    mutations: {
        set_user_msg(state, v) {
            state.user_msg = v
            state.uId = v.uId
            state.id = v.id
            console.log(`uId:${v.uId},id:${v.id}`);
        },
        set_grade(state, v) {
            state.grade = v
        }
    },
    actions: {

    }
}
export default market