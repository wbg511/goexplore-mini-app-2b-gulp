var userService = require('../../../service/user/userService.js');
var config = require('../../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeBtnStatus: "",
    formData: {
      phone: "13388768745",
      password: "123456",
      code: "",
      accType: 2,
      openId: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'formData.accType': options.accType,
      'formData.openId': options.openId,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  // 实现数据双向绑定
  bindinputval: function (e) {
    const bindval = e.currentTarget.dataset.name.split(".");
    const changeData = {};
    //如果输入内容为手机号关联验证码按钮显示状态;
    if (bindval[1] == "phone") {
      if (!config.chkTel(e.detail.value)) {
        this.setData({
          codeBtnStatus: "disabled"
        })
      } else {
        this.setData({
          codeBtnStatus: ""
        })
      }
    }
    this.data[bindval[0]][bindval[1]] = e.detail.value;
    changeData[bindval[0]] = this.data[bindval[0]];
    this.setData(changeData);
  },
  // 手机登录
  bindPhoneForm: function () {
    const _this = this;
    userService.bind_openid(_this.data.formData)
      .then(function (res_bind_openid) {
        if (res_bind_openid.errCode == 0) {
          config.showToast("绑定手机号成功");
        }else{
          config.showModal(res_bind_openid.msg);
        }
      });
  },
  // 发送注册验证码
  askPhoneCode: function () {
    const _this = this;
    userService.askPhoneCode(this.data.formData.phone, 3)
      .then(function (res) {
        if (res.errCode == 0) {
          config.showToast(res.msg);
          _this.setData({
            'formData.code': res.data.code
          });
        }
      }, function (err) {
        config.showModal(err.msg);
      });
  },

})