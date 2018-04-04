//activity.js
var activityService = require('../../service/activity/activityService.js');
//获取应用实例
const app = getApp();
Page({
  data: {
    cates: [],
    activities: [],
    isShowLoadMore:false
  },
  goactivityDetail: function (e) {
    wx.navigateTo({
      url: 'activityDetail/activityDetail?exploreId=' + e.currentTarget.dataset.exploreid
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this;
    console.log("activity onShow");

    // console.log(app.formatTime(1519640469000));
    // 获取所有活动分类
    activityService.categories()
      .then(function (res) {
        _this.setData({ cates: res.data });
        _this.getActivityById(12);
      });
  },
  getActivityById: function (id) {
    const _this = this;
    // 获取活动列表
    activityService.activities({
      // int 否 0 活动分类id 0或不传获取所有
      // category: id,
      // int 否 1 分页
      pageNum: 1,
      // int 否 14  分页大小
      pageSize: 30,
    })
      .then(function (res) {
        _this.setData({ activities: res.data });
      });
  },
    // 刷新
  onPullDownRefresh: function () {
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
      .then(function (res) {
        that.setData({
          activities: res.data,
        });
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }, function (res) {
        console.log(res);
      });
  },
  // 加载更多
  onReachBottom: function () {
    console.log("onReachBottom");
    var that = this;
    this.setData({
      isShowLoadMore:true
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
      .then(function (res) {
        that.setData({
          activities: that.data.activities.concat(res.data),
          isShowLoadMore: false
        });
      }, function (res) {
        console.log(res);
      });
  }

});