const host = "https://api.goexplore.io/";
// const host = "http://192.168.1.3/";
const config = {
    apihost: host,
    apikey: 'dZ0E^z!YN6RLu2vs6bX4#s#R5Xrfc2pv',
    // resHost: "http://127.0.0.1:3000",
    resHost: "http://p3ga3r6fb.bkt.clouddn.com",
    //  String  是 无 appId 目前传 goexplore-dl
    app_id: "goexplore-dl",
    //  String  是 无 appSecret 目前传 UseRC1q49AkCPeIGNxsR6mQiDDnaOcWF
    app_secret: "UseRC1q49AkCPeIGNxsR6mQiDDnaOcWF",
    //简写为空判断
    isEmpty: function (str) {
      return (str === '' || str === null || str === undefined) ? false : true;
    },
    regEx : {
      Strs: /^[\u0391-\uFFE5\w]+$/, //中文字、英文字母、数字和下划线
      Tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,//更新最新手机验证
      SpecialWord: /^[`\\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\|\:\"\<\>\?\/\.\,\;\'\[\]\\]+$/,//检查特殊字符
      passWord: /^(?![^a-zA-Z]+$)(?!\D+$)/,
    },
    chkSpcWord: function (str) {
      if (config.regEx.SpecialWord.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    chkPassWord: function (str) {
      if (config.regEx.passWord.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    //检查手机号
    chkTel: function (str) {
      console.log(str, config.regEx.Tel);
      var reg = config.regEx.Tel;
      if (reg.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    //提示语
    showToast: function (title, type) {
      //var imageUrl;
      //可扩展添加自定义图标
      // if (this.isEmpty(type)) {
      //   imageUrl = this.globalData.toastIconList[type];
      // }

      wx.showToast({
        //image: imageUrl,
        title: title || '',
        duration: 3000
      });
    },
    showModal:function(str){
      wx.showModal({
        title: '提示',
        content: str,
        success: function (res) {
          //点击确定取消执行
          if (res.confirm) {
            //console.log('用户点击确定')
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
};
console.log('config :', config);

// 导出模块
module.exports = config;