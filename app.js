//app.js

// 扩展 page
import wxPage from './utils/wxPage';

// 异步变同步
const regeneratorRuntime = require('./lib/runtime');

App({
  onLaunch: function () {
  
  },
  wxPage,
  regeneratorRuntime,
  globalData: {
    userInfo: null,
    platformOs: 'h5',
    sysType: 'wechat',
    token: '39af25a9702385e6c3546fcfd2d2dd4c',
    baseUrl: 'https://stageloanh5-test.vbillbank.com/api',
    version: '1.0.0'
  }
})
