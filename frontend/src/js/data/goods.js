import storage from '../common/storage.js';

const STORAGE_KEY = 'goodstotal'; // 本地存储的key
let goodsTotal = storage.get(STORAGE_KEY); // 获取本地存储的数据

export default {

  // 依据ID存储商品购买数量
  set(id, total) {
  	goodsTotal[id] = total;
  	storage.set(STORAGE_KEY, goodsTotal);
  },

  // 依据ID获取商品购买数量
  get(id) {
  	return goodsTotal[id] || 0;
  },

  // 获取购买数量总和
  getAll() {
  	return Object.values(goodsTotal).reduce((v1, v2) => v1+v2) || 0;
  },

  // 获取数据
  getData() {
  	return goodsTotal;
  }
};