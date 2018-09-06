// pages/book/book.js
import {fetch} from "../../utils/util.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleId:{},
    title:[],
    bookId:""
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      titleId: options.id
    })
   this.getData()
  },
 getData(){
   fetch.get(`/titles/${this.data.titleId}`).then(res=>{
     console.log(res)
        this.setData({
          title:res.data
     })
   })
 },
  mathto:function(e){
    console.log(e) 
    const c = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/content/content?id=${c}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})