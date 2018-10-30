// pages/login/login.js
// https://www.jb51.net/article/137920.htm
import store from '../../utils/store.js';
import api from '../../api/api.js';
import * as wxApi from '../../utils/wxApi.js';
import { getUrlParam } from '../../utils/util.js';;

const { regeneratorRuntime } = global;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // wx.authorize({scope: "scope.userLocation"});
    const location = await wxApi.getLocation();
    const { address } = await wxApi.getLocationFormat();

    wxApi.login().then(res => {
      console.log(res, 'res')
      if (res.code) {
        const params = {
          address,
          location: `${location.longitude},${location.latitude}`,
          osType: 'wechat',
          sessionId: 'h5',
          wxCode: res.code,
          wxStep: 'wxauth02',
        }
        // var appId = 'wx2988a731ca3166af'
        // var secret = 'be0e944aecb42e7d82eb24c5124c4d45'
        // const that = this;
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code',
        //   data: {},
        //   header: {
        //     'content-type': 'json'
        //   },
        //   success: function (res) {
        //     console.log(res.data, 'res000');
        //     that.setData({
        //       openid: res.data.openid
        //     })
        //   }
        // })
        // return;
        api.wechatAuthLogin(params).then(res => {
          console.log(res, 'res');
        }).catch(err => {
          console.log('用 code 换取 appId 失败')
        })
      }
    })
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

  }
})
