const uploadCertificationPhoto = '/real/ocrForId'; // 上传认证照片 身份证正面 、身份证反面、手持身份证照片，获取身份证信息
const wechatAuthLogin = '/user/wechat/login'; // 微信登录相关 获取 code session_key openId 等
const cancelCreditReasonList = '/msg/queryMsgList'; // 请求取消授信原因列表
const thirdPartyAuth = '/auth/build-cred-proc-url'; // 征信接口 第三方授信接口 运营商授信 淘宝授信 京东授信 信用卡授信
const authFaceUrl = '/auth/faceid/loginUrl' // 人脸识别

module.exports = {
  uploadCertificationPhoto,
  wechatAuthLogin,
  cancelCreditReasonList,
  thirdPartyAuth,
  authFaceUrl,
};
