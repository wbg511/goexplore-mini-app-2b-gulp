var http = require('../../utils/http/http.js');

const exploreService = {

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
    activitiesDetail: function(data) {
        const req = {
            // int	是	无	活动id
            exploreId: data.exploreId,
        };
        return http.post('noauth/v1/explore/detail', req);
    },
    
    // 3.4 获取活动支持的路线模式列表(支付页)
    patterns: function(data) {
        const req = {
            // int	是	无	活动id
            onlineExploreId: data.onlineExploreId,
        };
        return http.post('noauth/v1/explore/patterns', req);
    },

    // 3.5 搜索活动列表
    search: function(data) {
        const req = {
            // int	否	0	活动名称
            name: data.name,
            // double  否 无 经度
            lng: data.lng,
            // double  否 无 纬度
            lat: data.lat,
            // int 否 1 分页
            pageNum: data.pageNum,
            // int 否 14  分页大小
            pageSize: data.pageSize,
        };
        return http.post('noauth/v1/explore/search', req);
    },

    // 3.6 获取热门搜索
    hotSearch: function(data) {
        const req = {
        };
        return http.post('noauth/v1/explore/hot', req);
    },

    // 3.7 获取活动排名
    rankList: function(data) {
        const req = {
            //int	是	无	活动id
            exploreId:data.exploreId,
        };
        return http.post('auth/v1/explore/rank/list', req);
    },

    // 3.8 获取平台部分个人活动排名
    userRank: function(data) {
        const req = {
            //int	是	无	活动id
            exploreId:data.exploreId,
        };
        return http.post('auth/v1/explore/rank/userRank', req);
    },

};

// 导出模块
module.exports = exploreService;