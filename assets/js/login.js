$(function () {
    $('#link_reg').on('click', function () {

        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()

    })


    var form = layui.form
    form.verify({
        // 登录表单的验证
        // 密码里面不能出现空格
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 注册表单的验证。两次密码必须一致
        repwd: function (value) {
            var pwd = $(".reg-box [name='password']").val()
            console.log(pwd);
            if (pwd !== value) {
                return ('两次密码不正确！')
            }
        }
    })

    var layer = layui.layer
    // 调用接口.发起登录表单提交
    $('#login').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: 'post',
            url: '/api/login',
            data: {
                username: $('.login-box [name="username"]').val(),
                password: $('.login-box [name="password"]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                //. 把token值存在本地存储里面
                localStorage.setItem('token', res.token)
                location.href = 'index`.html'
            }
        })
    })

    // 用接口.发起注册表单提交
    $("#reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name="username"]').val(),
                password: $('.reg-box [name="password"]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                $('#link_login').click()
            }
        })
    })
})
