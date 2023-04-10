import {
  getMyPaperListShowApi
} from '../../api/home.js'
Page({
  //页面的初始数据
  data: {
    questionId: '',
    //试题数据列表
    paperList: [],
    //表单提交的数据
    answer: {
      openid: '',
      questionId: '',
      paperList: []
    }
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log(options)
    this.setData({
      questionId: options.questionId
    })
    let parm = {
      questionId: options.questionId,
      openid: wx.getStorageSync('openid')
    }
    this.getPaperList(parm);
  },
  
  async getPaperList(parm) {
    let res = await getMyPaperListShowApi(parm);
    if (res && res.code == 200) {
      console.log(res)
      //如果数据变化，需要页面也变化，需要setData
      this.setData({
        paperList: res.data.listPaper
      })
    }
  }
})