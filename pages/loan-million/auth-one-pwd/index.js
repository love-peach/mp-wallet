//获取应用实例
import {
  watch,
  computed
} from "../../../utils/vuefy.js";

const app = getApp();

app.wxPage({

  /**
   * 页面的初始数据
   */
  data: {
    pwd: '',
    pwdConfirm: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    computed(this, {
      isFieldValided() {
        const {
          pwd,
          pwdConfirm,
        } = this.data;
        return pwd && pwdConfirm && pwd.length === 6 && pwd.length === 6 && pwd === pwdConfirm;
      },
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
   * 输入框输入事件
   */
  handleChangeInputValue(event) {
    const {
      field
    } = event.currentTarget.dataset;
    const {
      value
    } = event.detail;
    this.setData({
      [field]: value
    });
  },

  /**
   * 错误提示
   */
  handleShowFormError() {
    const {
      pwd,
      pwdConfirm
    } = this.data;
    if (!pwd) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      });
    } else if (!pwdConfirm) {
      wx.showToast({
        title: '请重复密码',
        icon: 'none',
        duration: 2000
      });
    } else if(pwd.length !== 6 || pwdConfirm.length !== 6) {
      wx.showToast({
        title: '密码为6位数',
        icon: 'none',
        duration: 2000
      });
    } else if ( pwd !== pwdConfirm) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000
      });
    }
  },

  /**
   * 提交信息
   */
  handleSubmit() {
    if (!this.data.isFieldValided) {
      this.handleShowFormError();
      return;
    }
    wx.redirectTo({
      url: '/pages/loan-million/auth-two-identityInfo/index'
    });
  },
})
