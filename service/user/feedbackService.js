var http = require('../../utils/http/http.js');

const feedbackService = {
    // 9.1 意见反馈类型列表
    feedbackList: function (data) {
        const req = {
        };
        return http.post('auth/member/feedback/cate', req);
    },

    // 9.2 意见反馈添加
    feedbackAdd: function (data) {
        const req = {
            //int	是	无	反馈类型id
            cateId: data.cateId,
            //String	是	无	反馈内容
            content:data.content,
        };
        return http.post('auth/member/feedback/add', req);
    },
}

module.exports = feedbackService;