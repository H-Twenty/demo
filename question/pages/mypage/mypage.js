import { getMyQuestListApi } from '../../api/home'
//获取应用实例
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    //获取列表参数
    parms: {
      currentPage: 1,
      pageSize: 10,
      openid: app.globalData.openid
    },
    //列表数据
    tableList: [],
  },

  //获取问卷列表
  async getQuestionList() {
    this.data.parms.openid = app.globalData.openid;
    let res = await getMyQuestListApi(this.data.parms);
    if (res && res.code == 200) {
      //注意，赋值不能使用this.data.的方式赋值，这样没有双向数据绑定的效果，虽然有数据，但是页面不会改变
      this.setData({
        tableList: this.data.tableList.concat(res.data.records),
        total: res.data.total
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      tableList:[],
      total:0
    })
    //获取问卷列表
    this.getQuestionList();
    //停止下拉刷新
    wx.stopPullDownRefresh(); 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉刷新了')
    this.data.parms.currentPage = 1;
    this.data.tableList = [];
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉刷新了')
    let totalPage = Math.ceil(this.data.total / this.data.parms.pageSize);
    if (this.data.parms.currentPage >= totalPage) {
      //如果data中的当前页数大于等于总页数，则没有下一页啦
      wx.showToast({
        title: '没有更多数据了',
      })
    } else {
      this.setData({
        currentPage: this.data.parms.currentPage++
      })
      console.log(this.data.parms)
      this.onLoad();
    }
  },

  //跳转到详情页
  gotoDetail:function(e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url:'../myanswer/index?questionId='+e.currentTarget.dataset.item.questionId
    })
  }
})