// 导入 express
const express = require('express')
const router = express()
// 挂载路由

// 导入路由处理函数模块
const userInfoHandler = require('../router_handler/userinfo')
// 获取用户的基本信息的路由
router.get('/userinfo', userInfoHandler.getUserInfo)


module.exports = router
