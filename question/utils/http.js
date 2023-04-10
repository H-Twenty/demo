//获取全局App
const app = getApp()

//请求函数
const requestData = (path, method, data) => {
  return new Promise(function (resolve, reject) {
    //通过app获取全局变量中的token
    let token = app.globalData.token
    //判断token是否为空
    if (token == null) {
      //token为空  从storage中获取
      token = wx.getStorageSync('token') ? wx.getStorageSync('token') : ''
    }
    //向后台发送wx.request请求
    wx.request({
      url: app.globalData.url + path,  //请求地址 = 全局的url+请求的路径（后台接口地址）
      data: data, //分页的参数
      method: method, //请求方式
      header: {//请求头信息
        'content-type': 'application/json',
        'token': token
      },
      //请求成功之后  执行
      success: function (res) {
        if (res.statusCode == 200) {
          //resolve(res.data) 为返回请求成功后的data数据，以便在then（）中能够拿到数据
          resolve(res.data)
        } else {
          //reject(err)为请求失败后可返回自定义的cath（）中的内容
          reject(e)
        }
      },
      fail: function (e) {
        //e = { errMsg: "request:fail invalid url" }
        e.errMsg = "网络请求失败"
        reject(e)
      }
    })
  })
}
//get请求
function getData(path, data) {
  //请求路径，请求的方式，请求的数据
  return requestData(path, 'GET', data)
}

//post请求
function postData(path, data) {
  return requestData(path, 'POST', data)
}

//导出get请求与post请求函数
module.exports = {
  GET: getData,
  POST: postData
}