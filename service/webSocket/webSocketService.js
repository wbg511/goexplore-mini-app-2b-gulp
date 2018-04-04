var MD5 = require('../../utils/md5.js');
var webSocket = require('../../utils/webSocket/webSocket.js');
var config = require('../../config/config.js');

const webSocketService = {
    // 3 消息
    // 3.1 获取与NPC的对话记录
    getNPCDailogById: function(data) {
        console.log("getCurExplore - 3.1 获取与NPC的对话记录");
        var wsData = {
            // 数据标识(固定不变)  -6825473    int大端
            flag: "-6825473",
            // 请求模块    1   short 大端
            mod: 2,
            // 请求模块命令  1   short 大端
            cmd: 1,
            // 请求数据长度  100 int 大端
            len: "",
            // 请求数据    {“access_token”:"ds32-324fdsf-3242-fdsfdsg"}    字符串转字节数组
            data: {
                // int 否   0   npc id
                npcId: data.npcId,
                // int 否   1   分页
                pageSize: data.pageSize,
                // int 否   14  分页大小
                pageNum: data.pageNum,
            }
        };
        webSocket.sendWebSocket(wsData);
    },

    // 4 游戏--首页
    // 4.1 获取当前正在进行中的探索
    getCurExplore: function() {
        console.log("getCurExplore - 4.1 获取当前正在进行中的探索");
        var wsData = {
            // 数据标识(固定不变)  -6825473    int大端
            flag: "-6825473",
            // 请求模块    1   short 大端
            mod: 3,
            // 请求模块命令  1   short 大端
            cmd: 2,
            // 请求数据长度  100 int 大端
            len: "",
            // 请求数据    {“access_token”:"ds32-324fdsf-3242-fdsfdsg"}    字符串转字节数组
            data: {}
        };
        webSocket.sendWebSocket(wsData);
    },
    // 4.2 获取当前正在进行中的游戏节点
    getCurExploreRecord: function(recordId) {
        var wsData = {
            // 数据标识(固定不变)  -6825473    int大端
            flag: "-6825473",
            // 请求模块    1   short 大端
            mod: 4,
            // 请求模块命令  1   short 大端
            cmd: 1,
            // 请求数据长度  100 int 大端
            len: "",
            // 请求数据    {“access_token”:"ds32-324fdsf-3242-fdsfdsg"}    字符串转字节数组
            data: {
                recordId: recordId,
            },
        };
        webSocket.sendWebSocket(wsData);
    },
    // 4.3 提交当前节点的选项
    submitCurNodeOption: function(data) {
        console.log("mod3cmd2 4.3 提交当前节点的选项", data);
        var wsData = {
            // 数据标识(固定不变)  -6825473    int大端
            flag: "-6825473",
            // 请求模块    1   short 大端
            mod: 4,
            // 请求模块命令  1   short 大端
            cmd: 2,
            // 请求数据长度  100 int 大端
            len: "",
            // 请求数据    {“access_token”:"ds32-324fdsf-3242-fdsfdsg"}    字符串转字节数组
            data: {
                // int 是   无   游戏记录id
                recordId: data.recordId,
                // int 是   无   对应4.2中的options中的id
                optionId: data.optionId,
            },
        };
        webSocket.sendWebSocket(wsData);
    },
    // 4.4 点击地图标记物的提交
    submitMapGoods: function(data) {
        console.log("mod3cmd2 4.4 点击地图标记物的提交", data);
        var wsData = {
            // 数据标识(固定不变)  -6825473    int大端
            flag: "-6825473",
            // 请求模块    1   short 大端
            mod: 4,
            // 请求模块命令  1   short 大端
            cmd: 3,
            // 请求数据长度  100 int 大端
            len: "",
            // 请求数据    {“access_token”:"ds32-324fdsf-3242-fdsfdsg"}    字符串转字节数组
            data: {
                // int 是   无   游戏记录id
                recordId: data.recordId,
                // int 是   无   对应4.2中的options中的id，如果是提交任务剧情节点时传0
                optionId: data.optionId,
                // int 是   无   地图标记物对应的nodeId
                nodeId: data.nodeId,
            },
        };
        webSocket.sendWebSocket(wsData);
    },
    // 4.5 提交剧情选项
    submitStoryOption: function(data) {
        console.log("mod3cmd2 4.5 提交剧情选项", data);
        var wsData = {
            // 数据标识(固定不变)  -6825473    int大端
            flag: "-6825473",
            // 请求模块    1   short 大端
            mod: 4,
            // 请求模块命令  1   short 大端
            cmd: 4,
            // 请求数据长度  100 int 大端
            len: "",
            // 请求数据    {“access_token”:"ds32-324fdsf-3242-fdsfdsg"}    字符串转字节数组
            data: {
                // int 是   无   游戏记录id
                recordId: data.recordId,
                // int 是   无   对应4.2中的options中的id
                optionId: data.optionId,
                // int 是   无   剧情对应的nodeId
                nodeId: data.nodeId,
            },
        };
        webSocket.sendWebSocket(wsData);
    }

};

// 导出模块
module.exports = webSocketService;