// pages/login/login.js

import storage from '../../utils/storage.js';
console.log(storage, 'storage')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    storage.set('demo', {demo: 123})
    storage.set('zhang', '小米')
    
    wx.login({
      success: function(loginRes) {
        console.log(loginRes, 'loginRes');
        if (loginRes.code) {
        // example: 081LXytJ1Xq1Y40sg3uJ1FWntJ1LXyth
        }
      }
     });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(storage.get('demo'), '000');
    console.log(storage.get('zhang'), '111');
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

  }
})