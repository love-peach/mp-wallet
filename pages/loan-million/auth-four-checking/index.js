const app = getApp();

app.wxPage({

  /**
   * 页面的初始数据
   */
  data: {
    isReachBottom: false,
    filePath: '',
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
    this.setData({
      isReachBottom: true
    });
    console.log(123);
  },

  /**
   * 监听用户滑动页面事件。
   */
  onPageScroll(e) {
    console.log(e, 'e')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 下载app
   */
  handleDounload() {
    const that = this;
    console.log('下载')
    this.wxApi.downloadFile({
      url: 'https://stageloanh5-test.vbillbank.com/img/small1000-84a2b62f.png'
    }).then(res => {
      if (res.statusCode === 200) {
        console.log(res.tempFilePath);
        
        // wx.getFileSystemManager().readFile({
        //   filePath: res.tempFilePath,
        //   success(result) {
        //     console.log(result, 'result');
        //   }
        // })
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(result) {
            console.log(result, 'result');
            that.setData({
              filePath: result.savedFilePath,
            });
            wx.openDocument({
              filePath: result.savedFilePath,
              success(result2) {
                console.log(result2, 'result2')
              },
              fail(err) {
                console.log(err, 'err')
              }
            })
          }
        })
        // wx.getSavedFileList({
        //   success(result) {
        //     console.log(result, 'result')
        //   }
        // })
      }
    }).catch(err => {
      console.log(err);
    })
  },

  // 预览二维码
  handlePreviewQrcode(event) {
    console.log(event);

    const { src } = event.target.dataset;
    wx.previewImage({
      current: src, // 当前显示图片的http链接   
      urls: [src],
    });
  }
})
