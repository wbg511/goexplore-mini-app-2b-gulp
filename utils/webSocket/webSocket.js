// var util = require('../../utils/util.js');
// var config = require('../../config/config.js');

function sendWebSocket(webScoketData) {

    webScoketData.data.access_token = wx.getStorageSync("tokenData").access_token;

    webScoketData.data.nonstr = "4324frstfrdetret";
    webScoketData.data.nonstr = new Date().getTime();

    webScoketData.data.sign = "DJSKFJSKFJKSJFKSJDSKDSDS";

    wx.sendSocketMessage({
        data: JSON.stringify(webScoketData),
        success: function(success) {
            console.log("success", success);
        },
        fail: function(fail) {
            console.log("fail", fail);
        },
        complate: function(complate) {
            console.log("complate", complate);
        },
    });


}

// 导出模块
module.exports = {
    sendWebSocket: sendWebSocket,
};