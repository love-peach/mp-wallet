// 链接：https://www.jianshu.com/p/ad1e5b581e18

// const app = getApp();

/**
 * 封装请求方法
 * @param {url} str 请求地址
 * @param {params} obj 请求数据
 * @param {method} str 请求方法名
 * @param {header} obj 请求 header 配置项
 */
const request = (url, params, method, options) => {
  // TODO: app 只能在这里引入，如果在前面引入，会造成还未获取到 app.
  const app = getApp();
  return new Promise((resolve, reject) => {
    const headerDefault = {
      'Content-Type': 'application/json; charset=UTF-8',
      'SXF-TOKEN': app.globalData.token,
      'PLATFORM-OS': app.globalData.platformOs,
      'sysType': app.globalData.sysType,
    };
    const headerConfig = Object.assign({}, headerDefault, options);
    wx.request({
      url: `${app.globalData.baseUrl}${url}`,
      method,
      data: params,
      header: headerConfig,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if ( res.statusCode === 401) {
          wx.showToast({
            title: '请求异常，请重新登录',
            icon: 'none',
            mask: true,
            duration: 2000,
          });
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/select-product/select-product'
            });
          }, 2000)
        } else {
          wx.showToast({
            title: `${res.statusCode} 服务器异常`,
            icon: 'none',
            mask: false,
            duration: 2000,
          });
          reject(res.data)
        }
      },
      fail(error) {
        reject(error.data)
      }
    })
  })
}

const get = (url, params, options) => {
  return request(url, params, 'GET', options);
}

const post = (url, params, options) => {
  return request(url, params, 'POST', options);
}

const put = (url, params, options) => {
  return request(url, params, 'PUT', options);
}

// 不能声明DELETE（关键字）
const remove = (url, params, options) => {
  return request(url, params, 'DELETE', options);
}

module.exports = {
  get,
  post,
  put,
  remove
}
