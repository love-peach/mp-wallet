// pages/loan-thousand/auth-two-face/index.js
const app = getApp();
app.wxPage({

  /**
   * 页面的初始数据
   */
  data: {

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
   * 提交授信
   */
  handleSubmit() {
    this.api.goFaceAuth()
      .then(res => {
        if (res.code === '0000') {
          const webViewUrl = res.data.replace(/\?/ig, '&');
          wx.navigateTo({
            url: `/pages/web-view/index?webViewUrl=${webViewUrl}`
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: true,
            duration: 2000
          });
        }
      })
      .catch(err => {
        wx.showToast({
          title: err,
          icon: 'none',
          mask: true,
          duration: 2000
        });
      });

    // wx.redirectTo({
    //   url: '/pages/select-product/select-product'
    // });
  },
})
