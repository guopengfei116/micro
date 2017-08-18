
// 对象深拷贝，因为实现方式的限制，必须保证对象为类JSON格式
export function clone(data) {
  let str;
  try {
    str = JSON.stringify(data);
    data = JSON.parse(str);
  }catch(e){
    console.log('--util: 数据clone时在字符串阶段失败--');
  }finally {
    return data;
  }
};

// 数据格式化：{a: 1, b: 2} => '?a=1&b=2'
export function serialize(params) {
  if(!params) { return '' }

  let paramsSerialize = '?';
  for(let key in params) {
    paramsSerialize += `${key}=${params[key]}&`;
  }
  return paramsSerialize.slice(0, -1);
};

// 默认导出所有的方法集合
export default {
  clone,
  serialize
};

