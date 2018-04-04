// pages/activity/activityDetail/activityDetail.js
var activityService = require('../../../service/activity/activityService.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        exploreId: 0,
        activity: {
            adcode: 530100,
            address: "云南昆明",
            category: "探险",
            categoryId: 12,
            cover: "http://43.241.223.169:800/imagecover.jpg",
            created: 1517799154000,
            detail: "http://120.78.133.242/static/product.html?uid=21",
            distance: null,
            district: "昆明",
            ending: 1517826069000,
            expire: 1,
            exploreId: 21,
            icon: "http://43.241.223.169:800/imageicon.png",
            lat: 25.048821,
            lng: 102.702945,
            name: "昆明探秘",
            onlineExploreId: 32,
            price: 32,
            starting: 1517826066000,
            summary: "昆明是一个神奇的地方，他是一个民族的名称，以前住在洱海，后来被迫迁移到了滇池附近，今官渡地区",
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
          exploreId: options.exploreId
        });
        activityService.activityDetail(options.exploreId||23)
            .then(function(res) {

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

    },
    goActivityApply: function () {
      console.log(this.data);
      const url = '../activityApply/activityApply?exploreId=' + this.data.exploreId;
      console.log(url)
      wx.navigateTo({
        url: url
      });
    }
})