import * as Api from './index'

//获取首页数据
export const get_totalData = (params) => Api.Post('/market/findAll', params)

//设置查看数据
export const edit_totalData = (params) => Api.Post('/market/update', params)

// 删除首页数据
export const del_totalData = (params) => Api.Post('/market/del', params)

// 月报添加
export const add_mon = (params) => Api.Post('/MarketSchedule/insert', params)

// 根据id查看详情
export const detail_mon_byId = (params) => Api.Post('/MarketSchedule/findById', params)

// 根据项目编号查询他的所有进度
export const get_allmon = (params) => Api.Post('/MarketSchedule/findByMId', params)

// 数据更改
export const modify_mon = (params) => Api.Post('/MarketSchedule/update', params)

//删除月报
export const del_mon = (params) => Api.Post('/MarketSchedule/delById', params)