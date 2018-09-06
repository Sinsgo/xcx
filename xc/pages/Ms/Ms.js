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
})