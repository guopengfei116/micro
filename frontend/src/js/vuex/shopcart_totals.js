import storage from '../common/storage.js';
import Vue from 'vue';

// 本地存储的key
const STORAGE_KEY = 'shopcartTotals';

export default {

  // 数据
  state: storage.get(STORAGE_KEY), // 初始数据从storage里读取

  // 取值操作
  getters: {

    // 获取所有的id
    idList(state, getters) {
      return Object.keys(state);
    },

    // 获取所有的购买数量
    totalList(state, getters) {
      return Object.values(state);
    },

    // 所有商品的购买总数
    totalSum(state, getters) {
      console.log(state)
      let totals = getters.totalList;
      return totals.length && totals.reduce((v1, v2) => v1+v2);
    }

  },

  // 设值操作
  mutations: {

    // 依据ID删除数据
    remove(state, id) {
      delete state[id];
      storage.set(STORAGE_KEY, state);
    },

    // 依据ID存储商品购买数量
    // 添加新值需要使用Vue.set方法，否则该值的后续变化vue无法监听
    set(state, { id, total }) {
      Vue.set(state, id, total);
      storage.set(STORAGE_KEY, state);
    }

  }
};
