//app.js

//引入config
var appconfig = require('config/config.js');
var util = require('utils/util.js');
var http = require('utils/http/http.js');
var userService = require('service/user/userService.js');
var MD5 = require('utils/md5.js');
const qiniuUploader = require("utils/qiniuUploader.js");

App({
    pages: {},
    globalData: {
        appconfig: appconfig,
        // 微信登陆（code） 微信头像、名称等信息
        userInfo: wx.getStorageSync("userInfo"),
        // 用户登录access_token、refresh_token
        tokenData: wx.getStorageSync("tokenData"),
        // 用户账号信息(数据库)
        userDetail: wx.getStorageSync("userDetail"),
        // userDetail: {
        //     id: null,
        //     account: "",
        //     phone: "",
        //     avatar: "",
        //     nickname: "",
        //     password: "",
        //     // '状态 1 正常 2 禁用'
        //     status: 1,
        //     //'注册类型 1 手机 2 qq 3 微信 4 微博',
        //     type: 0,
        //     openid: "",
        //     //  '上次登录ip'
        //     lastIp: "",
        //     // '上次登录客户端'
        //     lastClient: "",
        //     created: 1517948821000,
        //     updated: 1518032648000,
        // },
        // userInfo: {
        //     avatarUrl: "https://p3ga3r6fb.bkt.clouddn.com/tx.png",
        // },
    },
    // 前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，
    // 而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。
    // 需要注意的是：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。
    //
    // 关闭小程序（基础库版本1.1.0开始支持）：
    // 当用户从扫一扫、转发等入口(场景值为1007, 1008, 1011, 1025)进入小程序，且没有置顶小程序的情况下退出，小程序会被销毁。
    // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    // 小程序运行机制在基础库版本 1.4.0 有所改变： 上一条关闭逻辑在新版本已不适用
    onLaunch: function(options) {
        console.log("App onLaunch()");
        console.log(options);
        console.log(this.globalData);
        const _this = this;
        // 获取系统信息
        // 获得设备高度、宽度
        const systemInfo = wx.getSystemInfoSync();
        _this.globalData.appconfig.windowHeight = systemInfo.windowHeight;
        _this.globalData.appconfig.windowHeight = systemInfo.windowHeight;

        _this.globalData.appconfig.windowRatio = systemInfo.windowWidth / 750;

        _this.globalData.appconfig.windowHeightRpx = systemInfo.windowHeight / _this.globalData.appconfig.windowRatio;
        _this.globalData.appconfig.windowWidthRpx = systemInfo.windowWidth / _this.globalData.appconfig.windowRatio;

        //         wx.chooseImage({
        //             count: 1,
        //             success: function(res) {
        //                 var filePath = res.tempFilePaths[0];
        // console.log(filePath);
        //                 qiniuUploader.upload(filePath, function(res) {
        //                     console.log(res);
        //                     _this.setData({
        //                         'imageURL': res.imageURL,
        //                     });
        //                 }, function(error) {
        //                     console.log('error: ' + error);
        //                 }, {
        //                     uploadURL: 'https://p3ga3r6fb.bkt.clouddn.com',
        //                     domain: 'p3ga3r6fb.bkt.clouddn.com',
        //                     uptokenURL: 'UpTokenURL.com/uptoken',
        //                 });

        //             }
        //         });



        // wx.login({
        //   success: function (res) {
        //     console.log(res);
        //     if (res.errMsg == "login:ok") {
        //       userService.wxLogin(res.code)
        //         .then(function (res) {

        //         }, function (err) {

        //         });
        //     }
        //   }
        // });
        // this.login();

        wx.getUserInfo({
            success: function(res_getUserInfo) {
                console.log('wx.getUserInfo(res_getUserInfo) ', res_getUserInfo);
            }
        });
    },
    // 生命周期函数--监听小程序显示 当小程序启动，或从后台进入前台显示，会触发 onShow
    onShow: function() {

    },
    // 生命周期函数--监听小程序隐藏 当小程序从前台进入后台，会触发 onHide
    onHide: function() {

    },
    // 错误监听函数  当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
    onError: function() {

    },
    login: function(successCB) {
        console.log('app.login');
        var _this = this;

        var tokenData = wx.getStorageSync('tokenData'); //登录过后，用户信息会缓存
        console.log(tokenData);
        if (!tokenData) { // 没有用户登录信息
            wx.login({
                success: function(res_wxLogin) {
                    // console.log('wx.login(res_wxLogin) ', res_wxLogin);
                    wx.getUserInfo({
                        success: function(res_getUserInfo) {
                            // console.log('wx.getUserInfo(res_getUserInfo) ', res_getUserInfo);
                            _this.globalData.userInfo = res_getUserInfo.userInfo;
                            // _this.setData({ userInfo: res_getUserInfo.userInfo });
                            wx.setStorageSync("userInfo", _this.globalData.userInfo);
                            successCB();
                            if (res_wxLogin.errMsg == "login:ok") {
                                userService.userWxLogin(res_wxLogin.code)
                                    .then(function(res_userWxLogin) {
                                            // 微信登录成功
                                            if (res_userWxLogin.errCode == 0) {
                                                const app = getApp();
                                                // 返回token
                                                _this.globalData.tokenData = res_userWxLogin.data;
                                                wx.setStorageSync("tokenData", _this.globalData.tokenData);
                                                userService.userDetail(_this.globalData.tokenData.access_token)
                                                    .then(function(res_userDetail) {
                                                        _this.globalData.userDetail = res_userDetail.data;
                                                        wx.setStorageSync("userDetail", _this.globalData.userDetail);
                                                        successCB();
                                                    });
                                            } else if (res_userWxLogin.errCode == 1004) {
                                                // 未完成用户注册
                                                // 未绑定手机号
                                                wx.showModal({
                                                    title: '您还未绑定手机',
                                                    content: "是否立即绑定手机号",
                                                    showCancel: true,
                                                    cancelText: "暂不",
                                                    confirmText: "确定",
                                                    success: function(res) {
                                                        if (res.confirm) {
                                                            wx.navigateTo({
                                                                url: '/pages/user/bindPhone/bindPhone?accType=2&openId=' + res_userWxLogin.path
                                                            });
                                                        } else {
                                                            // title: "用户重新同意了授权登录",
                                                            // wx.reLaunch({});
                                                            // wx.redirectTo({
                                                            //     url: '/pages/index/index',
                                                            // });
                                                        }
                                                    }
                                                });
                                            }
                                        },
                                        function(err) {

                                        });
                            }
                        },
                        fail: function(res) { //用户点了“拒绝”
                            wx.showModal({
                                title: '提示',
                                content: '授权登录失败，部分功能将不能使用，是否重新登录？',
                                showCancel: true,
                                cancelText: "否",
                                confirmText: "是",
                                success: function(res) {
                                    if (res.confirm) {
                                        if (wx.openSetting) { //当前微信的版本 ，是否支持openSetting
                                            // 打开权限设置界面
                                            wx.openSetting({
                                                success: function(res) {
                                                    if (res.authSetting["scope.userInfo"]) { //如果用户重新同意了授权登录
                                                        wx.getUserInfo({ //跟上面的wx.getUserInfo  sucess处理逻辑一样
                                                            success: function(res) {
                                                                // title: "用户重新同意了授权登录",
                                                                _this.login(successCB);
                                                            }
                                                        });
                                                    } else { //用户还是拒绝
                                                        fail();
                                                    }
                                                },
                                                fail: function() { //调用失败，授权登录不成功
                                                    fail();
                                                }
                                            });
                                        } else {
                                            fail();
                                        }
                                    }
                                }
                            });
                        }
                    });
                },
                fail: function(res) {
                    fail();
                }
            });
        } else { //如果缓存中已经存在user token  那就是已经登录过 重新请求用户详细信息
            this.updateUserDetial();
        }
    },
    // 更新用户详情
    updateUserDetial: function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
            userService.userDetail()
                .then(function(res_userDetail) {
                    console.log(res_userDetail.data);
                    if (res_userDetail.errCode == 401) {
                        // token 过期
                        userService.tokenRefresh(_this.globalData.tokenData.refresh_token)
                            .then(function(res_tokenRefresh) {
                                _this.globalData.tokenData = res_tokenRefresh.data;
                                wx.setStorageSync("tokenData", _this.globalData.tokenData);
                                _this.updateUserDetial();
                            });
                    } else {
                        _this.globalData.userDetail = res_userDetail.data;
                        wx.setStorageSync("userDetail", _this.globalData.userDetail);
                        resolve(res_userDetail.data);
                    }
                });

        });
    },
    wxLoginByCode: function(code) {
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

    },
    addPage(that) {
        this.pages[that.__route__] = that;
    }

});