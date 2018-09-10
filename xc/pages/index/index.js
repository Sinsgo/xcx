//index.js
//获取应用实例
const app = getApp()
import {fetch,login} from '../../utils/util.js'
Page({
  data: {
    swiperData: [ ],
    mainContent:[ ],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    isLoading:false,
    pn:1,
    hasMore:true,
    loadDone:false
  },
  onLoad () {
    login()
    Promise.all([this.getData(), this.getContent()]).then(() => {
      this.setData({
      hasMore: true,
      pn: 1,
      loadDone: true
      })
  })  
  },
  getData(){
      return new Promise((resolve,reject)=>{
        this.setData({
          isLoading:true
        })
        fetch.get('/swiper').then(res => {
          resolve()
          this.setData({
            swiperData: res.data,
            isLoading: false
          })
        }).catch(err=>{
         reject(reject)
         this.setData({
         swiperData:false,
        isLoading: false
    })
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
    isLoading:false,
    hasMore: true
  })
})
})
},
  getContent(){//获取书籍列表
  return new Promise((resolve,reject)=>{
    this.setData({
      isLoading:true,
      hasMore: true
    })
    fetch.get('/category/books').then(res => {
      resolve()
      this.setData({
        mainContent: res.data,
        isLoading: false,
      })
    })
  })
},
  getMoreContent() {
    return new Promise(resolve => {
      fetch.get('/category/books', { pn: this.data.pn }).then(res => {
        let newArr = [...this.data.mainContent, ...res.data]
        this.setData({
          mainContent: newArr,
        })
        resolve(res)
      })
    })

  },
  onReachBottom(){
     if(this.data.hasMore){
       this.setData({
         pn:this.data.pn +1
       })
       this.getMoreContent().then(res=>{
         if(res.data.length < 2){
           this.setData({
             hasMore:false
           })
         }
       })
     }
  },
  click_swiper: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/Ms/Ms?id=${id}`
    })
  },
  
  onPullDownRefresh(){
    Promise.all([this.getData(), this.getContent()]).then(()=>{
      this.setData({
        hasMore: true,
        pn: 1
      })
      wx.stopPullDownRefresh();
    })
  }
  
})