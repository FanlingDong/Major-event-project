// 导入服务器
const express = require('express');
const app = express();
const joi = require('joi');

// 导入并配置cors中间件
const cors = require('cors');
app.use(cors());

// 配置解析表单数据的中间件
// 注意：这个中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended: false}))

// 在路由之前封装res.cc函数
app.use((req, res, next) => {
    // status 默认值为1， 表示失败的情况
    // err 的值可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})

// 一定要在路由之前配置解析 Token 的中间件
const {expressjwt : expressJwt} = require('express-jwt');
const config = require('./config');

app.use(expressJwt({secret: config.jwtSecretKey, algorithms: ["HS256"]}).unless({path: [/^\/api\//]}))

// 导用并使用用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter)

// 导入并使用用户信息的路由模块
const userInfoRouter = require('./router/userinfo')
app.use('/my', userInfoRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    // 未知的错误
    res.cc(err)
})

app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})
