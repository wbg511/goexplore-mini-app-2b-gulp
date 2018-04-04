// pages/user/myExplore/myExplore.js
var activityService = require('../../../service/activity/activityService.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        curTab: 1,
        tabs: [
            { name: "待付款", stauts: 1 },
            { name: "体验中", stauts: 4 },
            { name: "已完成", stauts: 5 }
        ],
        activities: [],
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
        const _this = this;
        const req = {
            //int 是 0 订单状态 1 未支付 2 已支付 3 已准备 4 探索中 5 已完成未评价 6 已评价 7 已取消
            status: 1,
            pageNum: 1, //int 否 1 分页
            pageSize: 10, //int 否 14  分页大小
        };
        activityService.orderList(req)
            .then(function(res) {
                _this.setData({
                    activities: res.data
                });
            });
    },
    getActivityById: function(id) {
        const _this = this;
        // 获取活动列表
        activityService.activities({
                // int 否 0 活动分类id 0或不传获取所有
                category: id,
                // int 否 1 分页
                pageNum: 1,
                // int 否 14  分页大小
                pageSize: 6,
            })
            .then(function(res) {
                _this.setData({ activities: res.data });
            });
    },
    // 刷新
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(); //在标题栏中显示加载
        var that = this;
        // 获取活动列表
        activityService.activities({
                // int 否 0 活动分类id 0或不传获取所有
                category: 12,
                // int 否 1 分页
                pageNum: 1,
                // int 否 14  分页大小
                pageSize: 6,
            })
            .then(function(res) {
                that.setData({
                    activities: res.data,
                });
                wx.hideNavigationBarLoading() //完成停止加载
                wx.stopPullDownRefresh() //停止下拉刷新
            }, function(res) {
                console.log(res);
            });
    },
    // 加载更多
    onReachBottom: function() {
        console.log("onReachBottom");
        var that = this;
        this.setData({
            isShowLoadMore: true
        });
        // 获取活动列表
        activityService.activities({
                // int 否 0 活动分类id 0或不传获取所有
                category: 12,
                // int 否 1 分页
                pageNum: 1,
                // int 否 14  分页大小
                pageSize: 6,
            })
            .then(function(res) {
                that.setData({
                    activities: that.data.activities.concat(res.data),
                    isShowLoadMore: false
                });
            }, function(res) {
                console.log(res);
            });
    },
    selectTab: function(e) {
        console.log(e.currentTarget.dataset.tab);
        const _this = this;
        this.setData({
            curTab: e.currentTarget.dataset.tab
        });
        const req = {
            //int 是 0 订单状态 1 未支付 2 已支付 3 已准备 4 探索中 5 已完成未评价 6 已评价 7 已取消
            status: this.data.curTab,
            pageNum: 1, //int 否 1 分页
            pageSize: 10, //int 否 14  分页大小
        };
        activityService.orderList(req)
            .then(function(res) {
                _this.setData({
                    activities: res.data
                });
            });
    },
    goMyexploreDetail: function(e) {
        wx.navigateTo({
            url: 'myExploreDetail/myExploreDetail?myExploreId=' + e.currentTarget.dataset.myexploreid
        });
    }

})