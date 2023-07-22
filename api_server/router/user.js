const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const {regUser, loginUser} = require('../router_handler/user')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {reg_login_schema} = require('../schema/user')

router.post('/register', expressJoi(reg_login_schema), regUser)

router.post('/login', expressJoi(reg_login_schema), loginUser)

module.exports = router
