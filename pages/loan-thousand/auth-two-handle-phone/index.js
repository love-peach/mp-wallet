// pages/loan-thousand/auth-two-face/index.js
const app = getApp();
app.wxPage({

  /**
   * 页面的初始数据
   */
  data: {
    cardHandPlaceholder: '/assets/images/idcard_s.png',
    cardHand: '',
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
   * 用户选择图片
   */
  handleSelectImage: function (event) {
    const that = this;
    const {
      cardSide
    } = event.currentTarget.dataset;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const filePath = res.tempFilePaths[0];
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        });
        that.handleTransToBase64(filePath, cardSide);
      }
    });
  },

  /**
   * 将本地图片 转为 base64
   */
  handleTransToBase64(filePath, cardSide) {
    const that = this;
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'base64',
      success: (res) => {
        const base64Data = `data:image/jpeg;base64,${res.data}`;
        if (cardSide === 'cardHand') {
          that.handleUploadIdCardHand(filePath, cardSide, base64Data)
        }
      }
    });
  },

  /**
   * 上传身份证 - 手持照片
   */
  handleUploadIdCardHand(filePath, cardSide, base64Data) {
    const that = this;
    const params = {
      img: base64Data,
      ocrType: '1',
    };
    this.api.uploadIdCardFront(params)
      .then(res => {
        wx.hideToast();
        if (res.code === '0000') {
          that.setData({
            [cardSide]: filePath,
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: false,
            duration: 2000
          });
        }
      })
      .catch(err => {
        console.log(err, 'err');
        wx.hideToast();
        wx.showModal({
          title: '错误提示',
          content: '上传图片失败',
          showCancel: false,
          success: function (res) {
            console.log(res, 'res');
          }
        });
      });
  },

  /**
   * 提交授信
   */
  handleSubmit() {
    if (!this.data.cardHand) {
      wx.showToast({
        title: '请上传本人照片',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.redirectTo({
      url: '/pages/select-product/select-product'
    });
  },
})
