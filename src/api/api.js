import * as Api from './index'

// http://www.free-http.svipss.top/admin/login
export const login = (params) => Api.Post('/admin/login', params)

//获取简单的数据
export const get_total = (params) => Api.Post('/ps/menu', params)

//根据项目id查询全部数据

export const get_total_byid = (params) => Api.Post('/ps/selOne', params)
