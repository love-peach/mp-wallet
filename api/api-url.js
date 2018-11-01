const uploadCertificationPhoto = '/real/ocrForId'; // 上传认证照片 身份证正面 、身份证反面、手持身份证照片，获取身份证信息
const wechatAuthLogin = '/user/wechat/login'; // 微信登录相关 获取 code session_key openId 等
const cancelCreditReasonList = '/msg/queryMsgList'; // 请求取消授信原因列表

module.exports = {
  uploadCertificationPhoto,
  wechatAuthLogin,
  cancelCreditReasonList,
};
