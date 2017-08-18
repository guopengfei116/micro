import Vue from 'vue';
import cache from '../common/cache.js';

// 主方法
function http(method, url, ...arg) {

  return new Promise(function(resolve, reject) {

    // get请求优先使用缓存
    if(method === 'get') {
      let data = cache.get(url);
      if(data) {
        return resolve(data);
      }
    }

    // 发起http请求，成功后修改promise状态
    Vue.http[method](url, ...arg).then(function(rep) {
      let body = rep.body;
      method === 'get' && cache.set(url, body);  // 如果是get请求要缓存结果
      resolve(body);
    }, reject);

  });
}

// 添加细分静态方法
Object.assign(http, {

  // GET请求
  get(url, config) {
      return this('get', url, config);
  },

  // POST请求
  post(url, data = {}, config = {}) {
    let defConfig = {emulateJSON: true};  // 默认数据格式为formdata
    Object.assign(defConfig, config);
    return this('post', url, data, defConfig);
  }

});

// 暴漏http方法
export default http;