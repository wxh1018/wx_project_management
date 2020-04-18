import * as Api from './index'

// http://www.free-http.svipss.top/admin/login
export const login = (params) => Api.Post('/admin/login', params)

//获取简单的数据
export const get_total = (params) => Api.Post('/ps/menu', params)

//根据项目id查询全部数据

export const get_total_byid = (params) => Api.Post('/ps/selOne', params)

// /ps/findCount
// 根据手机号查询项目组负责人项目总和

export const get_fuze = (params) => Api.Post('/ps/findCount', params)