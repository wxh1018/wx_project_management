
import axios from 'axios'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

axios.interceptors.response.use((res)=>{
    // NProgress.done()
    return res
},(error)=>{
    console.log(error.response);
    // alert('数据请求失败')
    // if(error.response.status == 504){
    //     alert('请求失败')
    // }

})
axios.interceptors.request.use((res)=>{
    // NProgress.start()
    return res
},(erro)=>{
    return Promise.reject(erro)
})
let baseurl = 'http://www.free-http.svipss.top'

// Post
export const Post = (url,params)=>{
    return axios.post(`${baseurl}${url}`,params).then(data=>data)
}
// Get
export const Get = (params,url)=>{
    return axios.get(`${baseurl}${url}`,params).then(data=>data)
}