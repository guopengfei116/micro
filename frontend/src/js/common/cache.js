const cache = {};
const maxAge = 50000;  // 5秒有效期

export default {

  // 存储，存储的时候添加一个时间戳
  set(key, value) {
    cache[key] = {
      value: value,
      time: Date.now()
    };
  },

  // 读取，存在缓存并且未过期则返回缓存数据，否则删除
  get(key) {
    let tempObj = cache[key];
    if(tempObj && this.isValid(tempObj.time)) {
      return tempObj.value;
    }else {
      this.remove(key);
    }
  },

  // 删除数据
  remove(key) {
    delete cache[key];
  },

  // 缓存有效性检测，当前时间 > 存储时间一定数值则无效
  isValid(saveTime) {
    let currentTime = Date.now();
    return currentTime - saveTime > maxAge;
  }
};
