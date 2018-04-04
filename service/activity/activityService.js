var http = require('../../utils/http/http.js');

const activityService = {

    // 3.1 获取所有活动分类
    categories: function() {
        return http.post('noauth/v1/explore/categories', {});
    },

    // 3.2 获取活动列表
    activities: function(data) {
        const req = {
            // int 否 0 活动分类id 0或不传获取所有
            category: data.category,
            // double  否 无 经度
            lng: data.lng,
            // double  否 无 纬度
            lat: data.lat,
            // int 否 1 分页
            pageNum: data.pageNum,
            // int 否 14  分页大小
            pageSize: data.pageSize,
        };
        return http.post('noauth/v1/explore/list', req);
    },

    // 3.3 获取活动详情
    activityDetail: function(exploreId) {
        const req = {
            // int 是 无 活动id
            exploreId: exploreId,
        };
        return http.post('noauth/v1/explore/detail', req);
    },

    // 3.4 获取活动支持的路线模式列表(支付页)
    activityPatterns: function(exploreId) {
        const req = {
            // int 是 无 活动id
            onlineExploreId: exploreId,
        };
        return http.post('noauth/v1/explore/patterns', req);
    },

    // 4 活动报名订单
    // 4.1 创建订单
    orderCreate: function(data) {
      console.log(getApp().globalData);
        const req = {
            // access_token: getApp().globalData.tokenData.access_token, // string  是 无 访问令牌
            onlinePatternId: data.onlinePatternId, //int 是 无 购买时所选模式id
        };
        return http.post('auth/v1/explore/order/create', req);
    },

    // 4.2 订单支付
    orderPay: function(data) {
        const req = {
            // access_token: getApp().globalData.tokenData.access_token, // string  是 无 访问令牌
            orderNo:data.orderNo, //long 是 无 订单号
            type: data.type, //int 是 无 342123 微信 324351 支付宝
        };
        return http.post('auth/v1/explore/order/pay', req);
    },
    // 4.3 订单列表
    orderList: function(data) {
        const req = {
            // access_token: getApp().globalData.tokenData.access_token, // string  是 无 访问令牌
            status: data.status, //int 是 0 订单状态 1 未支付 2 已支付 3 已准备 4 探索中 5 已完成未评价 6 已评价 7 已取消
            pageNum: data.pageNum, //int 否 1 分页
            pageSize: data.pageSize, //int 否 14  分页大小
        };
        return http.post('auth/v1/explore/order/list', req);
    },
    // 4.4 订单详情
    myExploreDetail: function(orderNo) {
        const req = {
            // access_token: getApp().globalData.tokenData.access_token, // string  是 无 访问令牌
            orderNo: orderNo, //long 是 无 订单号
        };
        return http.post('auth/v1/explore/order/detail', req);
    },
    // 4.5 订单已加入的成员列表
    orderMembers: function(orderNo) {
        const req = {
            // access_token: getApp().globalData.tokenData.access_token, // string  是 无 访问令牌
            orderNo: orderNo, //long 是 无 订单号
        };
        return http.post('auth/v1/explore/order/members', req);
    },
    // 4.6 订单组队二维码(支付成功之后的页面)
    exploreQrcode: function(orderNo) {
        const req = {
            // access_token: getApp().globalData.tokenData.access_token, // string  是 无 访问令牌
            orderNo: orderNo, //long 是 无 订单号
        };
        return http.post('auth/v1/explore/order/qrcode', req);
    },
    // 4.7 扫描二维码加入队伍
    orderJoin: function(data) {
        const req = {
            // access_token: getApp().globalData.tokenData.access_token, // string  是 无 访问令牌
            qrcode: data.qrcode, // string  是 无 二维码值
        };
        return http.post('auth/v1/explore/order/join', req);
    },
    // 4.8 开始探索
    orderRun: function(data) {
        const req = {
            // access_token: getApp().globalData.tokenData.access_token, // string  是 无 访问令牌
            orderNo: data.orderNo, //long 是 无 订单号
        };
        return http.post('auth/v1/explore/order/run', req);
    },



};

// 导出模块
module.exports = activityService;