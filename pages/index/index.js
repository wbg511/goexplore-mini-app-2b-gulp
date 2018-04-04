const app = getApp();
const appconfig = require('../../config/config.js');
const userService = require('../../service/user/userService.js');
const webSocketService = require('../../service/webSocket/webSocketService.js');
const qiniuUploader = require("../../utils/qiniuUploader");
// const MD5 = require("../../utils/md5.js");


Page({
    data: {
        appconfig: appconfig,

        userInfo: app.globalData.userInfo,
        userDetail: app.globalData.userDetail,
        tokenData: app.globalData.tokenData,
        hasUserInfo: false,
        appconfig: app.globalData.appconfig,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        alerttipHide: !true,
        tipgoodesHide: true,
        packageHide: true,
        triggerHide: true,
        storyHide: true,

        packageTabs: [{
            id: 1,
            name: '道具',
            active: !true
        }, {
            id: 2,
            name: '图鉴',
            active: !false
        }, {
            id: 3,
            name: '通讯录',
            active: false
        }],

        packageMaterial: {
            id: 1,
            list: [{
                id: 1,
                name: "sss",
            }]
        },
        packageCard: [],
        packageNPC: [],

        markers: [{
            iconPath: "/img/map-weizhjiaoyin-icon@3x.png",
            id: 0,
            // title: "文本",
            latitude: 25.046103,
            longitude: 102.703886,
            width: 50,
            height: 50,
        }, {
            iconPath: "/img/map-weizhjiaoyin-icon@3x.png",
            id: 1,
            // title: "文本",
            latitude: 25.041503,
            longitude: 102.733186,
            width: 50,
            height: 50,
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // app.login();

        console.log("index onLoad");
        console.log(this);
        app.addPage(this);

        // console.log(app.globalData.userInfo);
        // console.log(this.data.userDetail);
        // console.log(app.globalData.userDetail);
        // if (app.globalData.userInfo) {
        //     this.setData({
        //         userInfo: app.globalData.userInfo,
        //         hasUserInfo: true
        //     })
        // } else if (this.data.canIUse) {
        //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //     // 所以此处加入 callback 以防止这种情况
        //     app.userInfoReadyCallback = (res) => {
        //         console.log("index app.userInfoReadyCallback:", res);
        //         this.setData({
        //             userInfo: res.userInfo,
        //             hasUserInfo: true
        //         })
        //     };
        // } else {
        //     wx.showModal({
        //         title: '',
        //         content: '在没有 open-type=getUserInfo 版本的兼容处理',
        //     });
        //     // 在没有 open-type=getUserInfo 版本的兼容处理
        //     wx.getUserInfo({
        //         success: res => {
        //             // wx.showModal({
        //             //   title: 'wx.getUserInfo(res)',
        //             //   content: JSON.stringify(res),
        //             // });
        //             app.globalData.userInfo = res.userInfo
        //             this.setData({
        //                 userInfo: res.userInfo,
        //                 hasUserInfo: true
        //             })
        //         }
        //     })
        // }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        console.log("index onReady");
        var _this = this;
        app.login(function() {
            _this.setData({
                userInfo: app.globalData.userInfo,
                userDetail: app.globalData.userDetail
            });
        });


        var socketOpen = false;
        var socketMsgQueue = [];

        var socketTask = wx.connectSocket({
            url: 'wss://api.goexplore.io/wss',
        });
        wx.onSocketOpen(function(res) {
            console.log('WebSocket连接已打开！');
            socketOpen = true;
            // 获取当前的探索
            // setTimeout(function() {
                _this.getCurExplore();
                _this.submitCurNodeOption(47);
                // _this.setData({ packageHide: false });
            // }, 5000);

        });
        wx.onSocketError(function(res) {
            console.log('WebSocket连接打开失败，请检查！');
        });

        // 监听websocket返回内容
        wx.onSocketMessage(function(res) {
            res = JSON.parse(res.data);
            if (res.status == 200) {
                console.log('WebSocket收到服务器内容 index：', res);
                const funname = 'mod' + res.mod + 'cmd' + res.cmd;
                if (typeof(_this[funname]) == "function") {
                    _this[funname](res);
                }
            } else {
                console.error("webscoket 错误", res);
            }
        });

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log("index onShow");
        var _this = this;
        // console.log(_this.data);
        // 有用户详情
        if (app.globalData.userDetail !== null) {
            _this.setData({
                userDetail: app.globalData.userDetail
            });
            // 没有用户详情
        } else if (app.globalData.userDetail == null) {
            if (app.globalData.tokenData != null) {
                app.updateUserDetial()
                    .then(function(userDetail) {
                        console.log(userDetail);
                        _this.setData({
                            userDetail: app.globalData.userDetail
                        });
                    });
            } else {
                // 未登录过
            }
        }

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        console.log("index onHide");
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        console.log("index onUnload");
    },



    login: function() {
        console.log('app.login');
        var _this = this;
        var app = getApp();
        var tokenData = wx.getStorageSync('tokenData'); //登录过后，用户信息会缓存
        console.log(tokenData);
        if (!tokenData) { // 没有用户登录信息
            wx.login({
                success: function(res_wxLogin) {
                    // console.log('wx.login(res_wxLogin) ', res_wxLogin);
                    wx.getUserInfo({
                        success: function(res_getUserInfo) {
                            // console.log('wx.getUserInfo(res_getUserInfo) ', res_getUserInfo);
                            app.globalData.userInfo = res_getUserInfo.userInfo;
                            // _this.setData({ userInfo: res_getUserInfo.userInfo });
                            wx.setStorageSync("userInfo", app.globalData.userInfo);

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
                                                            // wx.navigateTo({
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
                                            wx.showToast({
                                                title: "支持openSetting",
                                                duration: 1000
                                            });
                                            wx.openSetting({
                                                success: (res) => {
                                                    if (res.authSetting["scope.userInfo"]) { //如果用户重新同意了授权登录
                                                        wx.getUserInfo({ //跟上面的wx.getUserInfo  sucess处理逻辑一样
                                                            success: function(res) {
                                                                // title: "用户重新同意了授权登录",
                                                                wx.reLaunch({
                                                                    url: '/pages/index/index'
                                                                });
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



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        console.log("index onShareAppMessage");
    },
    regionchange: function(e) {
        // console.log('regionchange',e.type);
    },
    markertap: function(e) {
        // console.log('markertap',e.markerId);
    },
    controltap: function(e) {
        // console.log('controltap',e.controlId);
    },
    goAcitvitylist: function() {
        wx.navigateTo({
            url: '/pages/activity/activity'
        });
    },
    goUserCenter: function() {
        wx.navigateTo({
            url: '/pages/user/userCenter/userCenter'
        });
    },

    didPressChooseImage: function() {
        var _this = this;
        wx.chooseImage({
            count: 1,
            success: function(res) {
                var filePath = res.tempFilePaths[0];
                qiniuUploader.upload(filePath,
                    function(res) {
                        _this.setData({ 'imageURL': res.imageURL });
                    },
                    function(error) {
                        console.log('error: ' + error);
                    }, {
                        uploadURL: 'https://up.qbox.me',
                        domain: 'bzkdlkaf.bkt.clouddn.com',
                        uptokenURL: 'UpTokenURL.com/uptoken'
                    });
            }
        });
    },
    alerttipHide: function() {
        this.setData({
            alerttipHide: true
        });
    },
    openPackage: function() {
        this.setData({ packageHide: false });
    },
    packageHide: function(e) {
        console.log(e);
        console.log(e.currentTarget.dataset);
        console.log(e.currentTarget.dataset.is === undefined);
        if (e.currentTarget.dataset.is === undefined) {
            this.setData({
                packageHide: !this.data.packageHide
            });
        } else {
            this.setData({
                packageHide: e.currentTarget.dataset.is
            });
        }
    },
    changePackageTab: function(e) {
        // console.log(e.currentTarget.dataset);
        const tabs = this.data.packageTabs;
        // console.log(tabs);
        for (const i in tabs) {
            if (tabs[i].active) {
                tabs[i].active = false;
            }
        }
        tabs[e.currentTarget.dataset.idx].active = true;
        // console.log(tabs);
        this.setData({
            packageTabs: tabs
        });
    },

    // webscoekt 监听处理方法
    // 4.1 获取当前正在进行中的探索
    getCurExplore: function() {
        console.log("4.1 获取当前正在进行中的探索");
        webSocketService.getCurExplore();
    },
    // 4.1 获取当前正在进行中的探索
    mod3cmd2: function(res) {
      let data = res.obj.data || "";
      if(res.obj.data){
        status = data.status
      }
        console.log("mod3cmd2 4.1 获取当前正在进行中的探索", res);
        console.log("mod3cmd2 4.1 获取当前正在进行中的探索", status);
        
        // 1 进行中 2 已完成 3 已取消
        switch (status) {
            case 1:
                // 1 进行中
                // 继续探索
                this.getCurExploreRecord(res.obj.data.id);
                break;
            case 2:
                // 2 已完成
                break;
            case 3:
                // 3 已取消
                break;
            default:
                // statements_def
                break;
        }
    },
    // 4.2 获取当前正在进行中的游戏节点
    getCurExploreRecord: function(Record) {
        console.log("mod4cmd1 4.2 获取当前正在进行中的游戏节点: ", Record);
        webSocketService.getCurExploreRecord(Record);
    },
    // 4.2 获取当前正在进行中的游戏节点
    mod4cmd1: function(res) {
        console.log("mod3cmd2 4.2 获取当前正在进行中的游戏节点", res);
        console.dir(res);
        console.dir(JSON.stringify(res));
        var node = res.obj.data;
        console.dir(node);
        // 节点游戏状态 1 进行中 2 已完成
        switch (node.status) {
            // 1 进行中
            case 1:
                break;
                // 2 已完成
            case 2:
                break;
            default:
                // statements_def
                break;
        }
    },
    // 4.3 提交当前节点的选项
    submitCurNodeOption: function(res) {
        console.log("mod3cmd2 4.3 提交当前节点的选项", res);
    },
    // 4.3 提交当前节点的选项
    mod4cmd2: function(res) {
        console.log("mod3cmd2 4.3 提交当前节点的选项", res);
    },
    // 4.4 点击地图标记物的提交
    submitMapGoods: function(res) {
        console.log("mod3cmd2 4.4 点击地图标记物的提交", res);
    },
    // 4.4 点击地图标记物的提交
    mod4cmd3: function(res) {
        console.log("mod3cmd2 4.4 点击地图标记物的提交", res);
    },
    // 4.5 提交剧情选项
    mod4cmd4: function(res) {
        console.log("mod3cmd2 4.5 提交剧情选项", res);
    },
    // 4.5 提交剧情选项
    submitStoryOption: function(res) {
        console.log("mod3cmd2 4.5 提交剧情选项", res);
    },
    // 点击地图上的 markers事件
    bindmarkertap: function(e) {
        console.log("markerId", e.markerId);
        this.setData({
            triggerHide: false
        });
    },
    toExploreMessagePage: function() {
        wx.navigateTo({
            url: '/pages/index/message/message',
        });
    },
    toExploreTeamPage: function() {
        wx.navigateTo({
            url: '/pages/index/team/team',
        });
    },
    openScanCode: function() {
        // 只允许从相机扫码
        wx.scanCode({
            onlyFromCamera: true,
            success: function(res) {
                console.log(res);
            }
        });
    },
    // 关闭触发器返回地图界面
    backMapFromTrigger: function() {
        console.log("backMapFromTrigger");
        this.setData({
            triggerHide: true
        });
    },
    // webscoekt 监听处理方法
    // 3.1 获取与NPC的对话记录
    getCurExplore: function() {
        console.log("4.1 获取当前正在进行中的探索");
        webSocketService.getCurExplore();
    },
    // 3.1 获取与NPC的对话记录
    mod2cmd1: function(res) {
        console.log("mod3cmd2 3.1 获取与NPC的对话记录", res);
        console.log("mod3cmd2 3.1 获取与NPC的对话记录", res.obj.data);
        app.pages['pages/index/message/message'].setData({
            npcList: [{}, {}, {}]
        });
        // 1 进行中 2 已完成 3 已取消
        switch (res.obj.data.status) {
            case 1:
                // 1 进行中
                // 继续探索
                // this.getCurExploreRecord(res.obj.data.id);
                break;
            case 2:
                // 2 已完成
                break;
            case 3:
                // 3 已取消
                break;
            default:
                // statements_def
                break;
        }
    },
});