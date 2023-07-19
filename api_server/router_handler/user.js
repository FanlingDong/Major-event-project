// 注册新用户的处理函数
const regUser = (req, res) => {
    // 获取客户端提交到服务器的
    const userInfo = req.body
    // 对表单中的数据，进行合法性的校验
    if (!userInfo.username || !userInfo.password) {
        return res.send({status: 1, message: '用户名或密码不合法！'})
    }
    res.send('Register OK')
}

// 登录的处理函数
const loginUser = (req, res) => {
    res.send('Login OK')
}

module.exports = {
    regUser,
    loginUser
}
