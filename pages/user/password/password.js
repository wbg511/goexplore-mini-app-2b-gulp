// pages/user/password/password.js
var userService = require('../../../service/user/userService.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        formData: {
            phone: "13388768745",
            password: "123456",
            code: ""
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    askPhoneCode: function() {
        console.log("askPhoneCode()");
        const _this = this;
        userService.askPhoneCode(this.data.formData.phone, 4)
            .then(function(res) {
                if (res.errCode == 0) {
                    _this.setData({
                        'formData.code': res.data.code
                    });
                }
            }, function(err) {

            });
    },
    sub: function() {
        const req = {
            //   String  是   无   注册手机号
            phone: this.data.formData.phone,
            //   String  是   无   新的密码
            password: this.data.formData.password,
            //    String  是   无   短信验证码
            code: this.data.formData.code,
        };
        userService.reset_pwd(req)
            .then(function(res) {
            }, function(err) {
            });
    }
})