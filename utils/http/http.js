var util = require('../../utils/util.js');
var config = require('../../config/config.js');


// 网站请求接口，统一为post
function post(uri, req) {
    const tokenData = wx.getStorageSync('tokenData');
    if (uri != "token/refresh" && tokenData!=null) {
        req.access_token = tokenData.access_token;
    }
    const requstData = util.objorderbyparams(req);
    //发起网络请求
    console.log('%cpost ' + uri, "font-size:14px;color:blue;font-weight:bold;");
    console.log("%c    data\n", 'color:#03a9f4', requstData);
    return new Promise(function(resolve, reject) {
        wx.request({
            url: config.apihost + uri,
            data: requstData,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: function(res) {
                delete res.header;
                console.log("%c    success\n", 'color:green', res.data);
                resolve(res.data);
            },
            fail: function(err) {
                console.log("%    err\n", 'color:red', err);
                reject(err);
            }
        });
    });
}

function get(uri, req) {
    //发起网络请求
    return new Promise(function(resolve, reject) {
        wx.request({
            url: config.apihost + uri,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: 'GET',
            success: function(res) {
                resolve();
            },
            fail: function(res) {
                console.log(res);
                reject();
            }
        });
    });
}

// 导出模块
module.exports = {
    get: get,
    post: post
}