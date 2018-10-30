//app.js
global.regeneratorRuntime = require('./lib/runtime');
App({
  onLaunch: function () {
    
    
  },
  
  globalData: {
    userInfo: null,
    platformOs: 'h5',
    sysType: 'wechat',
    token: '2ab1e38fc061d9f0e10ca451327648d9',
    baseUrl: 'https://stageloanh5-test.vbillbank.com/api',
    version: '1.0.0',
    makePhoneCallCustomerService() {
      wx.makePhoneCall({
        phoneNumber: '4000887626',
      });
    }
  }
})
