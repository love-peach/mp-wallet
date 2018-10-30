const getLocation = (params) => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      ...params,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

// import QQMapWX from '../../lib/qqmap-wx-jssdk.min.js';
const QQMapWX = require('../lib/qqmap-wx-jssdk.min.js');
const QQMapSdk = new QQMapWX({
  key: 'UN2BZ-ZNGH6-IHISU-MHBZB-5Z7PS-VLBYA' // 必填
});

/**
 * @description 读取本地存储
 * @param { params } obj 经纬度 默认为当前位置 也可以传递指定的经纬度
 * @param { latitude } num 维度
 * @param { longitude } num 经度
 */
const getLocationFormat = (params) => {
  let locationParams = null;
  if (params && params.latitude && params.longitude) {
    locationParams = {
      latitude: params.latitude,
      longitude: params.longitude
    };
  }
  return new Promise((resolve, reject) => {
    QQMapSdk.reverseGeocoder({
      location: locationParams,
      success: function(res) {
        resolve(res.result);
      },
      fail: function(err) {
        wx.showToast({
          title: err.message,
          icon: 'none',
          mask: false,
          duration: 3000
        });
        reject(err);
      }
    });
  });
};

const login = (params) => {
  return new Promise((resolve, reject) => {
    wx.login({
      ...params,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

module.exports = {
  getLocation,
  getLocationFormat,
  login,
};
