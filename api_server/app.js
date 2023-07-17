// 导入服务器
const express = require('express');
const app = express();

// 导入并配置cors中间件
const cors = require('cors');
app.use(cors());

// 配置解析表单数据的中间件
// 注意：这个中间件只能解析
app.use(express.urlencoded({extended: false}))

app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})
