var MD5 = require('../utils/md5.js');
var config = require('../config/config.js');
// console.log(MD5.hexMD5("23"));

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// post 参数加密处理
// 1.把js对象按字母排序
// 2.使用&拼接 再拼接 + ('&key=' + config.apikey)
// 3.MD5加密 作为新添加的参数sign
const objorderbyparams = function (data) {
  data.time = new Date().getTime();
  // 去除对象中属性值为（null || undefined）
  for (var key in data) {
    if (data[key] === null || data[key] === undefined) {
      delete data[key];
    }
  }
  var paramsSign = Object.keys(data).filter(function (key) {
    if (key == 'sign') return false;
    // if (data[key] == '') return false;
    return true;
  }).sort().map(function (key) {
    return [key, data[key]].join('=');
  }).join('&');
  paramsSign = paramsSign + '&key=' + config.apikey;
  console.log(paramsSign);
  data.sign = MD5.hexMD5(paramsSign).toUpperCase();
  console.log(data);
  return data;
}
// console.log(MD5.hexMD5('code=013PyDUI1A1CU40D3jSI1QAnUI1PyDUl&time=1517973291435&key=dZ0E^z!YN6RLu2vs6bX4#s#R5Xrfc2pv'));


module.exports = {
  formatTime: formatTime,
  objorderbyparams: objorderbyparams
};