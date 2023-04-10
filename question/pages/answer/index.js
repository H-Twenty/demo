const app = getApp();
import {
  getPaperListApi,
  saveCommitApi
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
      questionId: options.questionId
    }
    this.getPaperList(parm);
  },

  //获取试题列表
  async getPaperList(parm) {
    let res = await getPaperListApi(parm);
    if (res && res.code == 200) {
      console.log(res)
      //如果数据变化，需要页面也变化，需要setData
      this.setData({
        paperList: res.data.listPaper
      })
      console.log(this.data.paperList)
    }
  },
  
  //用户选中的试题答案
  selectChange(e) {
    // console.log(e)
    //obj是试题信息和答案的存储
    let obj = {
      questionId: '',
      paperId: '',
      paperType: '',
      paperValue: ''
    }
    obj.questionId = this.data.questionId;
    obj.paperId = e.currentTarget.dataset.paperid;
    obj.paperType = e.currentTarget.dataset.papertype;
    //获取选中的值
    //多选的时候，需要把值设置为字符串
    if (e.currentTarget.dataset.papertype == '2') {
      //多选用逗号隔开
      obj.paperValue = e.detail.value.join(",")
    } else {
      obj.paperValue = e.detail.value;
    }
    //判断答卷是否存在
    let list = this.data.answer.paperList;
    if (list.length > 0) {
      //需要判断是否存在
      for (let i = 0; i < list.length; i++) {
        if (list[i].paperId === obj.paperId && list[i].paperType === obj.paperType) {
          //删除原来的
          list.splice(i, 1);
        }
      }
      //删除之后，把新的存进去
      list.push(obj);
    } else {
      list.push(obj);
    }
    console.log(list)
  },

  //问卷提交事件
  async submitBtn(e) {
    this.data.answer.openid = app.globalData.openid;
    this.data.answer.questionId = this.data.questionId;
    console.log(this.data.answer)
    let res = await saveCommitApi(this.data.answer);
    if (res && res.code == 200) {
      console.log(res)
      wx.navigateBack({
        delta: 1
      })
    }
  }
})