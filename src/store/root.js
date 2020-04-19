import * as Api from '../api/api'

const market = {
    state: {
        user_msg: '',
        uId: '',
        id: '',
        grade: '',
        super_admin: ["18260089839"]
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
        //權限判斷
        set_grade({ commit, state }, params) {
            return Api.grade(params)
                .then(data => {
                    console.log(data);
                    let res = data.data;
                    // 总体负责人
                    const super1 = () => {
                        let fg = state.super_admin.some(v => v == params.phone);
                        return fg;
                    };
                    if (super1()) {
                        console.log("超级权限");
                        commit('set_grade', 1)
                        return 1
                    }
                    let total_fg = res.find(v => v.grade.trim() == "方向负责人");
                    let fg_fg = res.find(v => v.grade.trim() == "分管负责人");
                    let xm_fg = res.find(v => v.grade.trim() == "项目负责人");
                    if (total_fg || fg_fg) {
                        console.log("1级权限");
                        commit('set_grade', 1)
                        return 1;
                    } else if (xm_fg) {
                        console.log("2级权限");
                        commit('set_grade', 2)
                        return 2;
                    } else {
                        console.log("权限不够");
                        return false;
                    }
                });
        }
    }
}
export default market