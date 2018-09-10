const baseUrl = "https://m.yaojunrong.com"
const fetch = {
  http(url,method,data){
    return new Promise((resolve,reject)=>{
      let token = wx.getStorageSync('token')
      let header = {
        'content-type': 'application/json'
      }
      if (token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method,
        success(res) {
          console.log(res)
          if(res.data.Token){
            wx.setStorageSync('token',res.header.Token)
          }
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
  post(url, data){
    return this.http(url, 'Post', data)
  }
}
 const login = ()=>{
   wx.login({
    success(res){
      console.log(res)
      fetch.post('/login',{
       code:res.code,
        appid:"wx172693dc96224f15",
        secret:"7a0cb121931c37a3276fc421ee5c81b2"
     }).then(res=>{
       console.log(res)
     })
    }
    })
    }
exports.login = login;
exports.fetch= fetch;