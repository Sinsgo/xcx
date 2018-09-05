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
    duration: 500
  },
  click_swiper:function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/Ms/Ms?id=${id}`
    })
  },
  onLoad () {
 this.getData()
 this.getContent()
  },
  getData(){
    fetch.get('/swiper').then(res =>{
      this.setData({
        swiperData:res.data
      })
      })
  },
  getContent(){
    fetch.get('/category/books').then(res=>{
this.setData({
  mainContent:res.data
})
    })
  },
  
})