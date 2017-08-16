export default {

  // 存储数据到本地
  set(key, data) {
  	try {
  		data = JSON.stringify(data);
  	}finally {
  		localStorage.setItem(key, data);
  	}
  },

  // 读取本地数据
  get(key) {
    let strData = localStorage.getItem(key);
    try {
    	return JSON.parse(strData) || {}; // 排除null的情况
    }catch(e) {
    	return strData; // 解析错误就原物返回
    }
  }
};
