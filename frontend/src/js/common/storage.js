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
    let result;
    try {
    	result = JSON.parse(strData);
    }finally {
    	return result || {}; // 排除null的情况
    }
  }
};
