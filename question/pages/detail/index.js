// pages/detail/index.js
const app = getApp();
import { getDetailsApi } from '../../api/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("详情页")
    console.log(options)
    this.setData({
      //在页面加载的时候拿到问卷id  
      questionId:options.questionId
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getDetails()
  },

  //发送请求查询问卷详情
  async getDetails() {
    //请求参数
    let parm = {
      questionId:this.data.questionId,
      openid:app.globalData.openid
    }
    //在页面监听时 发送请求  
    let res = await getDetailsApi(parm);
    if(res && res.code == 200){
      this.setData({
        questionDesc: res.data.questionDesc,
        questionId: res.data.questionId,
        questionImg: res.data.questionImg,
        questionTitle: res.data.questionTitle,
        status: res.data.status
      })
    }
  },

  //跳转到答题页
  gotoAnswer: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../answer/index?questionId=' + e.currentTarget.dataset.questionid,  //获取问卷id
    })
  },

  hasAnswer(e){
    wx.showToast({
      title: '您已答卷',
      duration: 200
    })
  }

})