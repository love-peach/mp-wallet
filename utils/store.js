import storage from './storage.js';

const store = {};

const storeList = {
  SXFToken: 'SXF-TOKEN', // token
};

// 本地存储工厂函数，生成 set get remove 方法
const storeFactory = (funcName, key) => {
  store[`set${funcName}`] = (data, isSync = true) => storage.set(key, data, isSync);
  store[`get${funcName}`] = (isSync = true) => storage.get(key, isSync);
  store[`rm${funcName}`] = (isSync = true) => storage.rm(key, isSync);
};

Object.keys(storeList).forEach((funName) => {
  storeFactory(funName, storeList[funName]);
});

export default store;