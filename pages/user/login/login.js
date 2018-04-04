// pages/common/login/login.js
var userService = require('../../../service/user/userService.js');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        formData: {
            // phone: "13388768745",
            phone: "18313747954",
            password: "123456"
        },
        thridLoginData: {
            openid: ""
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },
    // 实现数据双向绑定
    bindinputval: function(e) {
        const bindval = e.currentTarget.dataset.name.split(".");
        const changeData = {};
        this.data[bindval[0]][bindval[1]] = e.detail.value;
        changeData[bindval[0]] = this.data[bindval[0]];
        this.setData(changeData);
    },
    getPhoneNumber: function(res) {
        console.log(res);
    },
    // 手机登录
    phoneLogin: function() {
        wx.showLoading({});
        userService.phonelogin(this.data.formData)
            .then(function(res_userWxLogin) {
                if (res_userWxLogin.errCode == 0) {
                    // 微信登录成功
                    // 返回token
                    app.globalData.tokenData = res_userWxLogin.data;
                    wx.setStorageSync("tokenData", app.globalData.tokenData);
                    userService.userDetail(app.globalData.tokenData.access_token)
                        .then(function(res_userDetail) {
                            if (res_userDetail.errCode == 0) {
                                wx.showToast({
                                    title: "登陆成功",
                                    icon: 'success',
                                    duration: 1000
                                });
                                setTimeout(function() {
                                    wx.navigateTo({
                                        url: '/pages/user/userCenter/userCenter'
                                    });
                                }, 1000);
                                app.globalData.userDetail = res_userDetail.data;
                                wx.setStorageSync("userDetail", app.globalData.userDetail);
                            } else {
                                wx.showToast({
                                    title: res_userDetail.msg,
                                    duration: 1000
                                });
                            }
                        });
                } else {
                    wx.showToast({
                        title: res_userWxLogin.msg,
                        icon: 'none',
                        duration: 1000
                    });
                }
            }, function(err) {

            });
    },
    // 第三方登录
    thirdpartLogin: function(e) {
        // console.log(e.currentTarget.dataset.thirdpart);
        wx.showLoading();
        // 微信登录
        // 获取code 是否绑定手机
        wx.login({
            success: function(res_wxLogin) {
                console.log(res_wxLogin);
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res_wxLogin.errMsg == "login:ok") {
                    userService.userWxLogin(res_wxLogin.code)
                        .then(function(res_userWxLogin) {
                            // 微信登录成功
                            if (res_userWxLogin.errCode == 0) {
                                // 返回token
                                app.globalData.tokenData = res_userWxLogin.data;
                                wx.setStorageSync("tokenData", app.globalData.tokenData);
                                userService.userDetail(app.globalData.tokenData.access_token)
                                    .then(function(res_userDetail) {
                                        app.globalData.userDetail = res_userDetail.data;
                                        wx.setStorageSync("userDetail", app.globalData.userDetail);
                                        wx.showToast({
                                            title: "登陆成功",
                                            icon: 'success',
                                            duration: 1000
                                        });
                                    });
                            } else if (res_userWxLogin.errCode == 1004) {
                                // 未绑定手机号
                                wx.showToast({
                                    title: res_userWxLogin.msg,
                                    icon: 'success',
                                    duration: 2000
                                });
                                setTimeout(function() {
                                    wx.navigateTo({
                                        url: '/pages/user/bindPhone/bindPhone?accType=2&openId=' + res_userWxLogin.path
                                    });
                                }, 1000);
                            }
                        }, function(err) {

                        });
                }
            }
        });

        // 获取用户信息
        wx.getSetting({
            success: res => {
                console.log(res);
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            console.log(res);
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo;

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        },
                    });
                }
            },
        });

    }

})