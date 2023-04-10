// pages/home/home.js
import { getHomeListApi } from '../../api/home.js'
Page({

  //页面的初始数据  向后台发送的分页数据
  data: {
    total: 0,
    //获取列表参数
    parms: {
      currentPage: 1,
      pageSize: 4,
    },
    //列表数据
    tableList: []
  },

    //生命周期函数--监听页面加载
    onLoad: function (options) {
      //获取首页列表数据
      this.getHomeList();
      //数据加载完，停止下拉刷新（没有这句话，下拉之后要停顿几秒才恢复）
      wx.stopPullDownRefresh(); 
   },

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    console.log("下拉刷新")
    //思路  从第一页开加载，把原来列表里面的数据清空
    this.data.parms.currentPage = 1;
    this.setData({
      tableList: []
    })
    //重新加载列表
    this.onLoad();
  },


  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log('上拉刷新')
    //判断是否还有下一页，如果有，继续加载数据；没有，停止加载，信息提示
    //总页数
    let totalPage = Math.ceil(this.data.total / this.data.parms.pageSize);
    if(this.data.parms.currentPage >=totalPage){ //说明没有下一页
      //提示信息
      wx.showToast({
        title: '没有更多数据了',
      })
    }else{
      this.setData({
        currentPage:this.data.parms.currentPage++
      })
      //从新加载数据
      this.onLoad();
    }
  },

  //获取问卷列表  async异步请求
  async getHomeList() {
    //await 用于等待一个异步方法执行完成  只能出现在 async 函数中
    //调用getHomeListApi方法并传递分页参数
    let res = await getHomeListApi(this.data.parms);
    if (res && res.code == 200) {
      //注意，赋值不能使用this.data.的方式赋值，这样没有双向数据绑定的效果，虽然有数据，但是页面不会改变
      this.setData({
        //res.data.records:是拿到的数组数据的集合  concat函数
        tableList: this.data.tableList.concat(res.data.records),
        total: res.data.total  //获取返回的总记录数
      })
    }
  },

    //访问详情页
    gotoDetail:function(e){
      console.log(e)
      //当点击页面某条数据时，跳转到详情页
      wx.navigateTo({
        url: '../detail/index?questionId='+e.currentTarget.dataset.questionid
      })
    },
})