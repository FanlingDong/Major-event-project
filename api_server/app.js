// 导入服务器
const express = require('express');
const app = express();

// 导入并配置cors中间件
const cors = require('cors');
app.use(cors());

// 配置解析表单数据的中间件
// 注意：这个中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended: false}))

// 导用并使用用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter)

app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})
