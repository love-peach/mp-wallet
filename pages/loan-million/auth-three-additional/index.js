// pages/login/login.js
// https://www.jb51.net/article/137920.htm
import api from '../../../api/api.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '/assets/images/icon-extra-taobao.png',
    additionalList: [
      {
        text: '淘宝授权',
        imgSrc: '/assets/images/icon-extra-taobao.png'
      },
      {
        text: '京东授权',
        imgSrc: '/assets/images/icon-extra-jd.png'
      },
      {
        text: '信用卡认证',
        imgSrc: '/assets/images/icon-extra-creditImg.png'
      },
    ],
    isAgreeProtocol: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 拨打客服电话
   */
  handleCallCustomerService() {
    app.globalData.makePhoneCallCustomerService();
  },

  /**
   * 同意协议
   */
  handleToggleAgreeProtocol() {
    const { isAgreeProtocol } = this.data;
    this.setData({
      isAgreeProtocol: !isAgreeProtocol,
    });
  },

  /**
   * 阅读协议
   */
  handleReadProtocol() {
    console.log('阅读');
  },

  /**
   * 提交授信
   */
  handleSubmit() {
    const { isAgreeProtocol } = this.data;
    if (!isAgreeProtocol) {
      wx.showToast({
        title: '请同意协议',
        icon: 'none',
        mask: true,
        duration: 2000
      });
      return;
    }
    console.log('提交');
  }
})
