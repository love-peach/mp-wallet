//app.js
global.regeneratorRuntime = require('./lib/runtime');
App({
  onLaunch: function () {
    
    
  },
  
  globalData: {
    userInfo: null,
    platformOs: 'h5',
    sysType: 'wechat',
    token: '7df966bc8fe81011e20c1ed0a935f555',
    baseUrl: 'https://stageloanh5-test.vbillbank.com/api',
    version: '1.0.0',
    makePhoneCallCustomerService() {
      wx.makePhoneCall({
        phoneNumber: '4000887626',
      });
    }
  }
})
