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

// 获取取消授信原因列表
exports.getCancelCreditReasonList = function (params) {
  return request.get(apiUrl.cancelCreditReasonList, params);
};

// 征信接口 第三方授信接口 运营商授信 淘宝授信 京东授信 信用卡授信
exports.goThirdPartyAuth = function (params) {
  return request.get(apiUrl.thirdPartyAuth, params);
};
