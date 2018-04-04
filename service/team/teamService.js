var http = require('../../utils/http/http.js');

const teamService = {


  // 11.1 战队列表
  teamList: function (data) {
    const req = {
      pageNum: data.pageNum,
      // int 否 14  分页大小
      pageSize: data.pageSize,
    };
    return http.post('auth/v1/team/list', req);
  },

  // 11.2 战队搜索
  teamSearch: function (data) {
    const req = {
      //int	是	无	战队编号（图上的战队ID）
      teamNo: data.teamNo,
    };
    return http.post('auth/v1/team/search', req);
  },

  // 11.3 战队详情
  teamDetail: function (data) {
    const req = {
      //int	是	无	战队id
      teamId: data.teamId,
    };
    return http.post('auth/v1/team/detail', req);
  },

  // 11.4 设置战队队长
  teamSetLeader: function (data) {
    const req = {
      //int	是	是	战队id
      teamId: data.teamId,
      //int	是	无	队员id
      teamMemberId: data.teamMemberId,
    };
    return http.post('auth/v1/team/setLeader', req);
  },

  // 11.5 用户加入战队
  teamJoin: function (data) {
    const req = {
      //int	是	是	战队id
      teamId: data.teamId,
      //int	是	无	进行中活动id
      exploringId: data.exploringId,
    };
    return http.post('auth/v1/team/join', req);
  },

  // 11.5 用户加入战队
  teamJoin: function (data) {
    const req = {
      //int	是	是	战队id
      teamId: data.teamId,
      //int	是	无	进行中活动id
      exploringId: data.exploringId,
    };
    return http.post('auth/v1/team/join', req);
  },
  
  // 11.6 删除战队成员
  teamDelMember: function (data) {
    const req = {
      //int	是	是	战队id
      teamId: data.teamId,
      //int	是	无	进行中活动id
      exploringId: data.exploringId,
      //String	是	无	将要删除的战队成员id集合
      ids: data.ids,
    };
    return http.post('auth/v1/team/delMember', req);
  },

  //  11.7 二维码扫描功能
  teamScan: function (data) {
    const req = {
      //String	是	无	二维码(扫描二维码通用接口)
      qrcode: data.qrcode,
    };
    return http.post('auth/manage/tool/scan', req);
  },


};

// 导出模块
module.exports = teamService;