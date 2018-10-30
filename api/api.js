import request from './request.js';
import apiUrl from './api-url.js'

// 上传身份证正面 并获取信息
exports.uploadIdCardFront = function (params) {
  return request.post(apiUrl.uploadCertificationPhoto, params);
};

// 微信授权登录
exports.wechatAuthLogin = function (params) {
  return request.post(apiUrl.wechatAuthLogin, params);
};