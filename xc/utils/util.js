const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http(url,method,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
    })
    })
  },
  get(url,data){
    return this.http(url,'GET',data)
  },
//   post(url, data){
//     return this.http(url, 'Post', data)
//   }
// }
// const login = ()=>{
//   wx.login({
//    success(res){
//      fetch.post('/login',{
//        code:res.code,
//        appid:""
//      })
//    }
//   })
   }
exports.fetch= fetch;