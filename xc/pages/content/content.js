// pages/content/content.js
import { fetch,showToast } from "../../utils/util.js"
const app = getApp()
Page({
  data: {
    titleId: "",
    article:{},
    title:"",
    bookId:"",
    Catalog:[],
    isLoading:false,
    isShow:false,
    font:40,
    index:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     titleId:options.id,
     bookId:options.bookId
   })
   this.getData()
   this.getCatalog()
  },
  getData(){
    this.setData({
      isLoading:true,
      isShow:false
    })
    fetch.get(`/article/${this.data.titleId}`).then(res=>{
      console.log(res)
    this.setData({
      title:res,
      isLoading:false,
      index:res.data.article.index
    })
  }).catch(err=>{
    this.setData({
      isLoading:false
    })
  })
  },
  hiddenRuduce(){
  if(this.data.font<=24){
    wx.showModal({
      title: '提示',
      content: '字体太小影响视力！',
      showCancel:false
    }) 
  }else{
    this.setData({
      font:this.data.font-4
    })
  }
  },
  hiddenAdd(){
    if(this.data.font>=80){
      wx.showModal({
        title: '提示',
        content: '字体太大影响阅读！',
        showCancel: false
      }) 
    }else{
      this.setData({
        font: this.data.font + 4
      })
    }
  },
  hiddenNext(){
    let Catalog = this.data.Catalog
    if (Catalog[this.data.index+1]){
      this.setData({
        titleId: Catalog[this.data.index +1]._id
      })
      this.getData()
    }else{
      wx.showToast({
        title: '最后一章！',
      })
    }
  },
  handlePrev(){
 let Catalog = this.data.Catalog
 if(this.data.index -1<0){
   wx.showToast({
     title: '第一章！',
   })
  
   }else{
    this.setData({
      titleId: Catalog[this.data.index -1]._id
    })
   this.getData()
   }
  },
  getCatalog() {
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        Catalog:res.data
      })
    })
  },
  toggleCatalog(){
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },
  handleget(event){
    const id = event.currentTarget.dataset.id
   this.setData({
     titleId:id
   })
   this.getData()
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