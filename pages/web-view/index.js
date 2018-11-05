Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let searchArr = [];
    let searchStr = '';
    for (let key in options) {
      if (key !== 'webViewUrl') {
        let tempSearch = `${key}=${options[key]}`;
        searchArr.push(tempSearch);
      }
    }
    searchStr = '?' + searchArr.join('&');
    this.setData({
      webUrl: options.webViewUrl + searchStr
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    const { webUrl } = this.data;
    const srcNew = webUrl.replace(/\?/ig, '&');
    if (e.from === 'button') {
      console.log(e.target)
    }
    return {
      title: '随行付钱包',
      path: `/pages/web-view/index?webViewUrl=${srcNew}`
    }
  }
})
