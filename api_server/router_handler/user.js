// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')

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
    res.send('Login OK')
}

module.exports = {
    regUser,
    loginUser
}
