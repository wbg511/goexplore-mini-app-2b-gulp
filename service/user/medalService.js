var http = require('../../utils/http/http.js');

const medalService = {
    // 8.1 用户勋章列表
    medalList: function (data) {
        const req = {
            //int	否	1	分页
            pageNum: data.pageNum,
            // int 否 14  分页大小
            pageSize: data.pageSize,
        };
        return http.post('auth/v1/user/medal/list', req);
    },

    //8.2 用户勋章添加
    medalAdd: function (data) {
        const req = {
            //int	是	无	勋章类型 1.收集图鉴 2.参与活动
            type: data.type,
        };
        return http.post('auth/v1/user/medal/add', req);
    },
}

module.exports = medalService;