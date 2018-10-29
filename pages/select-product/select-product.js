// pages/select-product/select-product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [
      {
        type: 'thousand',
        statusText: '立即申请',
        textColor: '#B8874C',
        bgUrl: 'https://stageloanh5-test.vbillbank.com/img/small1000-84a2b62f.png'
      }, 
      {
        type: 'million',
        statusText: '立即申请',
        textColor: '#181818',
        bgUrl: 'https://stageloanh5-test.vbillbank.com/img/s10000-11881e81.png'
      }
    ]
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
   * 跳转之前做一些处理
   */
  doSomethionBeforeJump: function(event) {
    const productType = event.currentTarget.dataset.type;
    if (productType === 'thousand') {
      this.recordThousandProduct();
      this.goWhere();
    } else if (productType === 'million') {
      this.recordMillionProduct();
      this.goWhere();
    }
  },

  /**
   * 记录千元版
   */
  recordThousandProduct: function() {
    console.log('qian');
  },

  /**
   * 记录万元版
   */
  recordMillionProduct: function () {
    console.log('wan');
  },
  
  /**
   * 根据授权状态跳不同页面
   */
  goWhere: function() {
    wx.navigateTo({
      url: '/pages/loan-thousand/real-name-certification/index'
    });
  }

})