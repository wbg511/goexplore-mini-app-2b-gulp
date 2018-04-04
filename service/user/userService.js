var MD5 = require('../../utils/md5.js');
var http = require('../../utils/http/http.js');
var config = require('../../config/config.js');

const userService = {

    // 2.5 获取用户详情
    userDetail: function(access_token) {
        const req = {
            // access_token: access_token, //   String  是   无   访问令牌
        };
        return http.post('auth/member/profile', req);
    },

    // 手机号密码登录
    phonelogin: function(data) {
        const req = {
            //  String  是 无 appId 目前传 goexplore-dl
            app_id: "goexplore-dl",
            //  String  是 无 appSecret 目前传 UseRC1q49AkCPeIGNxsR6mQiDDnaOcWF
            app_secret: "UseRC1q49AkCPeIGNxsR6mQiDDnaOcWF",
            //  String  是 无 登录用户名 此处传手机号
            username: data.phone,
            //  String  是 无 登录密码
            password: MD5.hexMD5(data.password).toUpperCase(),
        };
        return http.post('login/phone', req);
    },
    // 微信登录
    // 发送微信code 获取openid
    userWxLogin: function(code) {
        const req = {
            code: code
        };
        return http.post('noauth/user/wxlogin', req);
    },
    // 发送微信code 获取openid
    tokenRefresh: function(refresh_token) {
        const req = {
            // String  是 无 appId 目前传 goexplore-dl
            app_id: config.app_id,
            // String  是 无 appSecret 目前传 UseRC1q49AkCPeIGNxsR6mQiDDnaOcWF
            app_secret: config.app_secret,
            // String  是 无 登录获取的refreshtoken
            refresh_token: refresh_token,
        };
        return http.post('token/refresh', req);
    },
    // 手机号密码注册
    phoneRegister: function(data) {
        const req = {
            // String  是 无 注册手机号
            phone: data.phone,
            //  String  是 无 注册密码
            password: MD5.hexMD5(data.password).toUpperCase(),
            //  String  是 无 短信验证码
            code: data.code,
        };
        return http.post('noauth/user/register', req);
    },
    // 2.6 绑定第三方账号,一个手机号可以绑定多个
    bind_openid: function(data) {
        const req = {
            //String  是   无   要绑定的账号
            phone: data.phone,
            //String  是   无   短信验证码
            code: data.code,
            //String  是   无   第三方账号唯一标识
            openId: data.openId,
            //String  是   无   第三方账号类型 2 微信
            accType: data.accType,
        };
        return http.post('noauth/user/bind_openid', req);
    },
    // 第三方账号登录，需绑定手机号
    loginThirdBindPhone: function(data) {
        const req = {
            //  String  是 无 appId 目前传 goexplore-dl
            app_id: "goexplore-dl",
            //  String  是 无 appSecret 目前传 UseRC1q49AkCPeIGNxsR6mQiDDnaOcWF
            app_secret: "UseRC1q49AkCPeIGNxsR6mQiDDnaOcWF",
            //String  是   无   第三方账号唯一标识
            openId: data.openId,
            //int 是   无   第三方账号类型 2 微信
            accType: data.accType,
        };
        return http.post('login/third', req);
    },
    // 请求短信验证码
    askPhoneCode: function(phone, type) {
        const req = {
            // String  是 无 手机号码
            phone: phone,
            //  int 是 无 短信验证码类型 2 注册 3 绑定第三方账号 4 重置密码
            type: type,
        };
        return http.post('ask/code', req);
    },

    // 2.8 修改用户信息
    modify_profile: function(data) {
        const req = {
            avatar: data.avatar, //String  否   无   头像url
            nickname: data.nickname //String  否   无   昵称
        };
        return http.post('auth/member/modify_profile', req);
    },

    // 2.9 修改密码
    change_pwd: function(data) {
        const req = {
            //  String  是   无   原密码
            oldPwd: data.oldPwd,
            //  String  是   无   新的密码
            newPwd: data.newPwd,
        };
        return http.post('auth/member/change_pwd', req);
    },

    // 2.10 重置密码
    reset_pwd: function(data) {
        const req = {
            //   String  是   无   注册手机号
            phone: data.phone,
            //   String  是   无   新的密码
            password: MD5.hexMD5(data.password).toUpperCase(),
            //    String  是   无   短信验证码
            code: data.code,
        };
        return http.post('noauth/user/reset_pwd', req);
    },

};

// 导出模块
module.exports = userService;