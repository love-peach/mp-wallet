/**
 * @description 读取本地存储
 * @param { string } key 要读取的key
 * @param { isSync } boolean 是否是同步
 * @param { data } any 需要缓存的数据
 */
const storage = {
  get(key, isSync = true) {
    if (typeof key !== 'string') {
      throw new Error('key 应该是个 string');
    }
    if (!key.trim()) {
      throw new Error('key 不能为空');
    }
    if (isSync) {
      try {
        return wx.getStorageSync(key.trim());
      } catch (e) {
        return e;
      }
    } else {
      return new Promise((resolve, reject) => {
        wx.getStorage({
          key: key.trim(),
          success(res) {
            resolve(res);
          },
          fail(err) {
            reject(err);
          },
        });
      })
    }
  },
  set(key, data, isSync = true) {
    if (typeof key !== 'string') {
      throw new Error('key 应该是个 string');
    }
    if (!key.trim()) {
      throw new Error('key 不能为空');
    }
    if(isSync) {
      try {
        return wx.setStorageSync(key.trim(), data)
      } catch (e) {
        return e;
      }
    } else {
      return new Promise((resolve, reject) => {
        wx.setStorage({
          key: key.trim(),
          data,
          success(res) {
            resolve(res);
          },
          fail(err) {
            reject(err)
          }
        });
      })
    }
  },
  rm(key, isSync = true) {
    if (!key) {
      throw new Error('key 不能为空');
    }
    if (typeof key !== 'string') {
      throw new Error('key 应该是个 string');
    }
    if(isSync) {
      try {
        wx.removeStorageSync(key.trim());
      } catch (e) {
        return e;
      }
    } else {
      return new Promise((resolve, reject) => {
        wx.removeStorage({
          key: key.trim(),
          success(res) {
            resolve(res);
          },
          fail(err) {
            reject(err);
          },
        });
      })
    }
  },
  clear(isSync = true) {
    if (isSync) {
      try {
        return wx.clearStorageSync();
      } catch(e) {
        return e;
      }
    } else {
      return new Promise((resolve, reject) => {
        wx.clearStorage({
          success(res) {
            resolve(res);
          },
          fail(err) {
            reject(err);
          },
        });
      })
    }
  },
};

export default storage;
