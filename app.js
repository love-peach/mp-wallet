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
    token: 'a3938d506fda644133b3d743920cb787',
    baseUrl: 'https://stageloanh5-test.vbillbank.com/api',
    version: '1.0.0'
  }
})
