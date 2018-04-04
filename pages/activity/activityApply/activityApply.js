// pages/activity/activityApply/activityApply.js
var activityService = require('../../../service/activity/activityService.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectPatternId: null,
        exploreId: null,
        patterns: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const _this = this;
        this.setData({
            exploreId: options.exploreId,
            patterns: {}
        });
        activityService.activityPatterns(32)
            .then(function(res) {
                _this.setData({
                    patterns: res.data
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

    },

    selectPattern: function(e) {
        this.setData({
            selectPatternId: e.currentTarget.dataset.selectpatternid
        });
    },
    // 确认支付
    applyPay: function() {
        activityService.orderCreate({
                onlinePatternId: this.data.selectPatternId
            })
            .then(function(res_order) {

                activityService.orderPay({
                        orderNo: res_order.data.orderNo,
                        type: 352413
                    })
                    .then(function(res) {
                        wx.requestPayment({
                           'timeStamp': '',
                           'nonceStr': '',
                           'package': '',
                           'signType': 'MD5',
                           'paySign': '',
                           'success':function(res){
                           },
                           'fail':function(res){
                           }
                        });
                    });


            });
    }
});