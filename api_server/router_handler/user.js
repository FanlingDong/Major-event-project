// 导入数据库操作模块
const db = require('../db/index');
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs');
// 导入生成Token的包
const jwt = require('jsonwebtoken');
// 导入全局的配置文件
const config = require('../config')

// 注册新用户的处理函数
const regUser = (req, res) => {
    // 获取客户端提交到服务器的
    const userInfo = req.body
    // 对表单中的数据，进行合法性的校验
    // if (!userInfo.username || !userInfo.password) {
    //     return res.cc('用户名或密码不合法！')
    // }

    // 定义 SQL 语句，查询用户名是否被占用
    const sqlStr = 'SELECT * FROM ev_users WHERE username=?';
    db.query(sqlStr, userInfo.username, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (result.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 调用bcrypt.hashSync()对密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);
        // 定义插入新用户的SQL语句
        const sql = 'INSERT INTO ev_users SET ?';
        // 调用db.query()执行SQL 语句
        db.query(sql, {username: userInfo.username, password: userInfo.password}, (err, result) => {
            // 判断 SQL 语句是否执行成功
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
            // 注册用户成功
            res.cc('注册成功！', 0)
        })
    })
}

// 登录的处理函数
const loginUser = (req, res) => {
    const userInfo = req.body
    const sql = 'SELECT * FROM ev_users WHERE username=?';
    db.query(sql, userInfo.username, (err, result) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行SQL 语句成功，但是获取到的数据条数不等于1
        if (result.length !== 1) return res.cc('登录失败！')

        // 用 bcrypt.compareSync(前端数据, 数据库存储数据) 判断前端提交的密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, result[0].password)
        if (!compareResult) return res.cc('密码不符，登录失败！')

        // 在服务器端生成 Token 的字符串
        const user = {...result[0], password: '', user_pic: ''}
        // 对用户的信息进行加密，生成Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
        console.log(tokenStr)
        // 调用 res.send() 将Token 响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })
}

module.exports = {
    regUser,
    loginUser
}
