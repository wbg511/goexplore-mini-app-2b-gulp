// pages/user/myExplore/myExploreDetail/myExploreDetail.js
var activityService = require('../../../../service/activity/activityService.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myExploreId: null,
        myExplore: null,
        exploreMembers: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        const _this = this;
        this.setData({
            myExploreId: options.myExploreId
        });
        activityService.myExploreDetail(options.myExploreId || 23)
            .then(function(res) {
                _this.setData({
                    myExplore: res.data
                });
            });

        // 获取加入探索二维码
        activityService.exploreQrcode(options.myExploreId || 23)
            .then(function(res) {
                // _this.setData({
                //     exploreMembers: res.data.members
                // });
            });

        // 获取探索成员
        activityService.orderMembers(options.myExploreId || 23)
            .then(function(res) {
                _this.setData({
                    exploreMembers: res.data.members
                });
            });
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

    }
})