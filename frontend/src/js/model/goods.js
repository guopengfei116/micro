import storage from '../common/storage.js';

const STORAGE_KEY = 'goodstotal'; // 本地存储的key
let goodsTotal = storage.get(STORAGE_KEY); // 获取本地存储的数据

export default {

  // 依据ID存储商品购买数量
  set(id, total) {
  	goodsTotal[id] = total;
  	storage.set(STORAGE_KEY, goodsTotal);
  },

  // 依据ID获取商品购买数量，如果没有ID那么返回所有商品的购买总数
  get(id) {
  	if (id) {
  		return goodsTotal[id] || 0;
  	}else {
      let values = this.getTotalList();
  	  return values.length && values.reduce((v1, v2) => v1+v2);
  	}
  },

  // 获取所有的id
  getIDList() {
  	return Object.keys(goodsTotal);
  },

  // 获取所有的购买数量
  getTotalList() {
  	return Object.values(goodsTotal);
  },

  // 获取数据
  getData() {
  	return goodsTotal;
  }
};