//index.js
//获取应用实例
const app = getApp()
import {fetch} from '../../utils/util.js'
Page({
  data: {
    swiperData: [ ],
    mainContent:[ ],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    isLoading:false
  },
  click_swiper:function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/Ms/Ms?id=${id}`
    })
  },
  onLoad () {
    this.setData({
      isLoading:true
    })
 this.getData()
 this.getContent()
  },
  getData(neadLoading=true){
    return new Promise((resolve,reject)=>{
      fetch.get('/swiper').then(res => {
        resolve()
        this.setData({
          swiperData: res.data
        })
      }).catch(err=>{
  reject(reject)
      })
    })
  },
getAllData(){
return new Promise(resolve=>{
  
  Promise.all([this.getData(), this.getContent()]).then(() => {
    resolve()
    this.setData({
     
    })
}).catch(err=>{
  this.setData({
    isLoading:false
  })
})
})
},
  getContent(){
    fetch.get('/category/books').then(res=>{
      console.log(res.data)
this.setData({
  mainContent:res.data,
  isLoading: false
})
    })
  },
  
})