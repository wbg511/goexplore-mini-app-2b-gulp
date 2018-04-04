// pages/common/register/register.js
var userService = require('../../../service/user/userService.js');
//引入config
var config = require('../../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeBtnStatus:"",
    formData: {
      phone: "13388768745",
      password: "123456",
      code: ""
    },
    thridLoginData: {
      openid: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  // 实现数据双向绑定
  bindinputval: function (e) {
    console.log(config.chkPassWord(e.detail.value));
    const bindval = e.currentTarget.dataset.name.split(".");
    const changeData = {};
    //如果输入内容为手机号关联验证码按钮显示状态;
    if (bindval[1] == "phone"){
      if (!config.chkTel(e.detail.value)) {
        this.setData({
          codeBtnStatus:"disabled"
        })
      }else{
        this.setData({
          codeBtnStatus: ""
        })
      }
    }
    this.data[bindval[0]][bindval[1]] = e.detail.value;
    changeData[bindval[0]] = this.data[bindval[0]];
    this.setData(changeData);
  },
  // 提交注册表单
  phoneRegisterForm: function () {
    //验证是否格式正确
    if(!config.chkTel(this.data.formData.phone)){
      config.showModal('手机号错误');
      return false;
    }
    if (!config.chkPassWord(this.data.formData.password)) {
      config.showModal('密码为6-18位字母、数字');
      return false;
    }
    userService.phoneRegister(this.data.formData)
      .then(function (res) {
        if (res.errCode){
          config.showModal(res.msg);
        }else{
          config.showToast(res.msg);
        }
        
      }, function (err) {
        config.showModal(err.msg);
      });
  },
  // 发送注册验证码
  askPhoneCode: function () {
    const _this = this;
    userService.askPhoneCode(this.data.formData.phone, 2)
      .then(function (res) {
        if (res.errCode == 0) {
          config.showToast(res.msg);
          _this.setData({
            'formData.code':res.data.code
          });
        }
      }, function (err) {
        config.showModal(err.msg);
      });
  },
})