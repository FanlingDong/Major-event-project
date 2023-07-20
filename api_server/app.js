// 导入服务器
const express = require('express');
const app = express();

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
})

// 导用并使用用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter)

app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})
