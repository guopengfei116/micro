import { clone } from './util.js';

const cache = {};
const maxAge = 50000;  // 5秒有效期

export default {

  /**
   * @function 存储，存储的时候添加一个时间戳
   * @params { isClone: boolean }  是否需要clone一个数据副本进行存储，
   *   以防止引用数据类型后续改变造成的缓存数据污染
   * */
  set(key, data, isClone) {
    if(isClone) {
      data = clone(data);
    }

    cache[key] = {
      data: data,
      expire: Date.now() + maxAge
    };
  },

  /**
   * @function 读取，存在缓存并且未过期则返回缓存数据，否则删除
   * @params { isClone: boolean }  是否需要clone一个数据副本返回出去，
   *   以防止引用数据类型后续改变造成的缓存数据污染
   */
  get(key, isClone) {
    let middleData = cache[key];
    if(middleData && this.isValid(middleData)) {
      return isClone? clone(middleData.data): middleData.data;
    }else {
      this.remove(key);
    }
  },

  // 删除数据
  remove(key) {
    delete cache[key];
  },

  // 缓存有效性检测，目前只依据到期时间判断有效性
  isValid(middleData) {
    return middleData.expire > Date.now();
  }
};
