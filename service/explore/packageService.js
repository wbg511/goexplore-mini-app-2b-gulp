var http = require('../../utils/http/http.js');

const packageService = {
    // 5 背包--物品

    // 5.1 背包物品列表
    materialList: function(data) {
        const req = {
            //int 否   1   分页
            pageNum: data.pageNum,
            //int 否   14  分页大小
            pageSize: data.pageSize,
        };
        return http.post('auth/v1/equip/material/list', req);
    },

    // 5.2 背包物品添加


    materialAdd: function(data) {
        const req = {
            //int 是   无   物品id
            materialId: data.materialId,
            //int 是   无   物品数量
            quantity: data.quantity,
        };
        return http.post('auth/v1/equip/material/add', req);
    },


    // 5.3 背包物品详情


    materialDetail: function(data) {
        const req = {
            //int 是   无   用户物品id
            userMaterialId: data.userMaterialId,
        };
        return http.post('auth/v1/equip/material/detail', req);
    },

    // 6 背包--通信录

    // 6.1 背包通讯录列表
    addressList: function (data) {
      const req = {
        //int 否   1   分页
        pageNum: data.pageNum,
        //int 否   14  分页大小
        pageSize: data.pageSize,
      };
      return http.post('auth/v1/equip/addressList/list', req);
    },

    // 6.2 背包通讯录NPC添加
    addressNpcAdd: function (data) {
      const req = {
        //int 
        npcId: data.npcId,
      };
      return http.post('auth/v1/equip/addressList/npc/add', req);
    },

    // 6.3 背包通讯录NPC详情

    addressNpcDetail: function (data) {
      const req = {
        //int 
        npcId: data.npcId,
      };
      return http.post('auth/v1/equip/addressList/npc/detail', req);
    },


    // 7 背包--图鉴

    // 7.1 背包图鉴列表
    pokedexList: function (data) {
      const req = {
        //int 否   1   分页
        pageNum: data.pageNum,
        //int 否   14  分页大小
        pageSize: data.pageSize,
      };
      return http.post('auth/v1/equip/card/list', req);
    },


    // 7.2 背包图鉴详情--父图鉴
    pokedexDetail: function (data) {
      const req = {
        //int 
        cardId: data.cardId,
      };
      return http.post('auth/v1/equip/card/detail', req);
    },

    // 7.3 背包图鉴详情--子图鉴
    childCardDetail: function (data) {
      const req = {
        //int 
        cardId: data.cardId,
        //int  是否获取1.已获取 2.未获取
        exist: data.exist,
      };
      return http.post('auth/v1/equip/card/childCard', req);
    },
};

// 导出模块
module.exports = packageService;