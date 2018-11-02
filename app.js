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
    token: '6789ec720f8010842f4ff87e9f2d32f6',
    baseUrl: 'https://stageloanh5-test.vbillbank.com/api',
    version: '1.0.0'
  }
})
