// pages/index/message/message.js

const webSocketService = require('../../../service/webSocket/webSocketService.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        appconfig: app.globalData.appconfig,
        npcList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log("message onLoad");
        app.addPage(this);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        var _this = this;
        const npcddata = {
            // int 否   0   npc id
            npcId: 1,
            // int 否   1   分页
            pageSize: 10,
            // int 否   14  分页大小
            pageNum: 1,
        };

        console.log("webSocketService.getNPCDailogById ", npcddata);
        webSocketService.getNPCDailogById(npcddata);

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

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

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
})