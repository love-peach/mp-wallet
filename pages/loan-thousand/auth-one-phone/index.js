// pages/loan-thousand/auth-one-phone/index.js
const app = getApp();
app.wxPage({

  /**
   * 页面的初始数据
   */
  data: {
    yunxingshangSts: 0,
    authStatusTip: {
      yunxingshang: [false, '运行商授权中', '运行商已完成授权'],
    },
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
   * 验证授信状态
   */
  handleGetAuthStatus(type) {
    const { authStatusTip } = this.data;
    return authStatusTip[type][this.data[`${type}Sts`]];
  },

  /**
   * 去授信
   */
  handleAuthTo(event) {
    const { authType, authTypeCode } = event.target.dataset;
    const authTip = this.handleGetAuthStatus(authType)
    if(authTip) {
      wx.showToast({
        title: authTip,
        icon: 'none',
        mask: true,
        duration: 2000
      });
      return;
    }
    console.log('去授权');
    const params = {
      'build-typ': authTypeCode,
      'smallLoan': 0,
    }
    // wx.navigateTo({
    //   url: `/pages/web-view/index?url=http://baidu.com`
    // });
    // return;
    this.api.goThirdPartyAuth(params).then(res => {
      if (res.code === '0000') {
        const webViewUrl = res.data['cred-process-url'].replace(/\?/ig, '&');
        console.log(webViewUrl, 'webViewUrl');
        wx.navigateTo({
          url: `/pages/web-view/index?url=${webViewUrl}`
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true,
          duration: 2000
        });
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        mask: true,
        duration: 2000
      });
    });
  },

  /**
   * 提交授信
   */
  handleSubmit() {
    console.log('下一步');
    wx.redirectTo({
      url: '/pages/loan-thousand/auth-two-face/index'
    });
  },

})
