// Ms.js
import { fetch } from '../../utils/util.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
  bookId:"",
  bookData:{}
  },
  /**
   */
  onLoad: function (options) {
   console.log(options)
   this.setData({
     bookId:options.id
   })
    this.getData()
  },
 getData(){
  fetch.get(`/book/${this.data.bookId}`).then(res=>{
    console.log(res)
    this.setData({
      bookData:res
    })
   })
  },
  onShareAppMessage: function () {
  },
  logbtn: function (e) {
    console.log(e)
    const p = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/book/book?id=${p}`,
    })
  },
  onShareAppMessage: function () {
   return{
     title:this.data.bookData.data.title,
     path:`/pages/Ms/Ms?id=${this.data.bookId}`,
     imageUrl:this.data.bookData.data.img
   }
  },
  handlecollect(){
    fetch.post('/collection',{
      bookId:this.data.bookId
    }).then(res=>{
      if(res.code==200){
        wx.showToast({
          title: '收藏成功',
          type:'success',
          duration:1000
        })
        let bookData = {...this.data.bookData}
        bookData.isCollect = 1
        this.setData({
          bookId:bookData
        })
      }
    })
  }
})