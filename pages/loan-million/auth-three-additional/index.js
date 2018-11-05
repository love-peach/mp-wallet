// pages/login/login.js
// https://www.jb51.net/article/137920.htm

const app = getApp();

app.wxPage({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '/assets/images/icon-extra-taobao.png',
    additionalList: [
      {
        text: '淘宝授权',
        imgSrc: '/assets/images/icon-extra-taobao.png',
        authType: 'taobao',
        authTypeCode: 11,
      },
      {
        text: '京东授权',
        imgSrc: '/assets/images/icon-extra-jd.png',
        authType: 'jingdong',
        authTypeCode: 10,
      },
      {
        text: '信用卡认证',
        imgSrc: '/assets/images/icon-extra-creditImg.png',
        authType: 'creditCard',
        authTypeCode: 5,
      },
    ],
    taobaoSts: 0,
    jingdongSts: 0,
    creditCardSts: 0,
    authStatusTip: {
      taobao: [false, '淘宝授权中', '淘宝已完成授权'],
      jingdong: [false, '京东授权中', '京东已完成授权'],
      creditCard: [false, '信用卡授权中', '信用卡已完成授权'],
    },
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
    });
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
    wx.redirectTo({
      url: '/pages/loan-million/auth-four-checking/index'
    });
  },
  handleSubmit1() {
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
    wx.redirectTo({
      url: '/pages/loan-million/auth-four-success/index'
    });
  },
  handleSubmit2() {
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
    wx.redirectTo({
      url: '/pages/loan-million/auth-four-failed/index'
    });
  }
})
