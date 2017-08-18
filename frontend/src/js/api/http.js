import Vue from 'vue';
import cache from '../common/cache.js';
import { serialize } from '../common/util.js';

// 数据缓存时是否需要clone
const isClone = true;

// 主方法
function http(method, url, ...arg) {

  return new Promise(function(resolve, reject) {

    // get请求优先使用缓存
    if(method === 'get') {
      let data = cache.get(url, isClone);
      if(data) {
        return resolve(data);
      }
    }

    // 发起http请求，成功后修改promise状态
    Vue.http[method](url, ...arg).then(function(rep) {
      let body = rep.body;
      method === 'get' && cache.set(url, body, isClone);  // 如果是get请求要缓存结果
      resolve(body);
    }, reject);

  });
}



// 添加细分静态方法
Object.assign(http, {

  // GET请求
  get(url, config = {}) {
    let serializeParams = serialize(config.params);
    delete config.params;

    return this('get', url + serializeParams, config);
  },

  // POST请求，默认把数据转换为formdata格式发送
  post(url, data = {}, config = {}) {
    let serializeParams = serialize(config.params);
    delete config.params;

    let defConfig = {emulateJSON: true};
    Object.assign(defConfig, config);

    return this('post', url + serializeParams, data, defConfig);
  }

});

// 暴漏http方法
export default http;