const express = require('express')
const router = express.Router()

// 导入用户路由处理函数对应的模块
const {regUser, loginUser} = require('../router_handler/user')

router.post('/register', regUser)

router.post('/login',loginUser)

module.exports = router
