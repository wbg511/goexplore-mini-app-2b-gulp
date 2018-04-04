// pages/common/userCenter/userCenter.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userDetail: app.globalData.userDetail,
        appconfig: app.globalData.appconfig
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
        this.setData({
            userDetail: app.globalData.userDetail
        });
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

    // 自定义方法

    toMyExplore: function() {
        wx.navigateTo({
            url: '/pages/user/myExplore/myExplore'
        });
    },
    toMyMedal: function() {
        wx.navigateTo({
            url: '/pages/user/medal/medal'

        });
    },
    toUserDetail: function() {
        wx.navigateTo({
            url: '/pages/user/userDetail/userDetail'
        });
    },
    launchAppError: function(e) {
        console.log(e.detail.errMsg)
    },
    tologin: function() {
        wx.navigateTo({
            url: '/pages/user/login/login'
        });
    },
    toregister: function() {
        wx.navigateTo({
            url: '/pages/user/register/register'
        });
    },
    toUserDetail: function() {
        if (app.globalData.userDetail) {
            wx.navigateTo({
                url: '/pages/user/userDetail/userDetail'
            });
        } else {
            wx.navigateTo({
                url: '/pages/user/login/login'
            });
        }
    },
    loginout: function() {

        app.globalData.tokenData = null;
        wx.setStorageSync("tokenData", null);
        app.globalData.userDetail = null;
        wx.setStorageSync("userDetail", null);
        this.setData({
          userDetail:null
        });
    }
});