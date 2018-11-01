import api from '../api/api';
import wxApi from '../utils/wxApi';

const wxPage = function(config) {
  const { onLoad } = config;
  // TODO: 添加公用方法

  // 添加 http 请求
  config.api = api;

  // 添加 打电话函数
  config.handleCallCustomerService = wxApi.makePhoneCall;

  // 统一处理 onload
  config.onLoad = function(onLoadOptions) {
    // TODO:  打点
    console.log('可以打点');

    // TODO: 获取上一个页面路由
    const pages = getCurrentPages()
    this.__previousPage = pages[pages.length - 2];
    if(this.__previousPage) {
      console.log('上一个路由:', this.__previousPage.route);
    } else {
      console.log('上一个路由: 没有 这是首页');
    }

    if (typeof onLoad === 'function') {
      onLoad.call(this, onLoadOptions);
    }
  };
  return Page(config);
}

export default wxPage;
