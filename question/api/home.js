//导入http.js
const http = require('../utils/http.js')

//试题回显
export async function getMyPaperListShowApi(params) {
  return await http.GET("/wxapi/home/getMyPaperListShow",params)
}

//我的问卷列表
export async function getMyQuestListApi(parm){
  return await http.GET("/wxapi/home/getMyQuestionList",parm)
}

//问卷提交
export async function saveCommitApi(parm){
  return await http.POST("/wxapi/home/savaCommit",parm)
}

//根据问卷id查询试题列表
export async function getPaperListApi(parm){
  return await http.GET("/wxapi/home/getPaperList",parm)
}

//查询问卷详情表
export async function getDetailsApi(parm){
  return await http.GET("/wxapi/home/getDatails",parm)
}

//获取问卷列表  发送异步请求
export async function getHomeListApi(parm) {
  //调用http.get方法请求完成
  return await http.GET("/wxapi/home/getList", parm)
}