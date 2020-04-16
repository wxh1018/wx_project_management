import * as Api from './index'

// http://www.free-http.svipss.top/admin/login
export const login = (params)=>Api.Post('/admin/login' ,params)

