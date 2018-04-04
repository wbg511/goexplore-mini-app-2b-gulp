var http = require('../../utils/http/http.js');

const messageService = {
    //10.1 系统消息列表
    sysMsgList: function (data) {
        const req = {
            //int	否	1	分页
            pageNum: data.pageNum,
            // int 否 14  分页大小
            pageSize: data.pageSize,
        };
        return http.post('auth/v1/sysMsg/list', req);
    },

}

module.exports = messageService;