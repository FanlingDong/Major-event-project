// 导入 express
const express = require('express')
const router = express()
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {update_userinfo_schema} = require('../schema/user')

// 挂载路由
// 导入路由处理函数模块
const userInfoHandler = require('../router_handler/userinfo')

// 获取用户的基本信息的路由
router.get('/userinfo', userInfoHandler.getUserInfo)

// 更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandler.updateUserInfo)

// 更新密码的路由
router.post('/updatepwd', userInfoHandler.updatePassword)

module.exports = router
