// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          //请求的接口地址（开发者服务器接口地址）
          url: this.globalData.url + '/wxapi/login/wxLogin', 
          //请求的参数
          data: {
            code: res.code
          },
          //设置请求的 header，header 中不能设置 Referer。content-type 默认为 application/json
          header: {
            //application/x-www-form-urlencoded是常见的web表单提交方式
            'content-type': 'application/x-www-form-urlencoded'
          },
          //接口调用成功的回调函数
          success: res => {
            if (res.data.code == 200) {
              //data：开发者服务器返回的数据
              if (res.data.data.openid) {
                //存储openid到全局变量，当然也可以同时存储到作用域中
                this.globalData.openid = res.data.data.openid
                this.globalData.session_key = res.data.data.session_key
                wx.setStorageSync('openid', res.data.data.openid)
                console.log("openid："+res.data.data.openid)
                console.log("sessionKey："+res.data.data.session_key)
              }
            }
          }
        })
      }
    })
  },
  //全局变量
  globalData: {
    userInfo: null,
    url: 'http://localhost:8099', //请求的url
    openid: '',
    session_key: '',
    token: ''
  }
})