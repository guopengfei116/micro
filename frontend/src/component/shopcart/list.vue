<template>
  <article class="shopcart-list">

		<!-- 标题 -->
		<v-title :title="title"></v-title>

    <!-- 商品列表 -->
    <div class="goods" v-for="item in shopcartList" :key="item.id">
      <mt-switch class="switch" v-model="item.selected"></mt-switch>
      <img class="img" :src="item.src">
      <div class="inforight">
        <h4 class="mui-ellipsis-2">{{ item.title }}</h4>
        <div class="bottom">
          <ul>
            <li>￥{{ item.sell_price }}</li>
            <li>
              <div class="mui-numbox">
              	<button class="mui-btn mui-btn-numbox-minus">-</button>
              	<input class="mui-input-numbox" type="number">
              	<button class="mui-btn mui-btn-numbox-plus">+</button>
              </div>
            </li>
            <li>
              <a href="javascript:void(0)" @click="remove(item.id)">删除</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 总价 -->
    <div class="total">
      <div class="total_val">
        <ul>
          <li>总计（不含运费）</li>
          <li>已勾选商品 {{ sumTotal }} 件，总价: ￥{{ priceTotal }} 元</li>
        </ul>
      </div>
      <div class="total_btn">
      	<mt-button type="primary">付 款</mt-button>
      </div>
    </div>

  </article>
</template>

<script>
  import URL from '../../js/api/url.js';
  import goodsStorage from '../../js/model/goods.js';
  import vTitle from '../common/title.vue';

  export default {

    data() {
    	return {
    		title: '购物车',
    		shopcartList: []
    	};
    },

    computed: {

    	// 所选商品价格总和：
    	// 1、遍历购物车，每个选中状态的商品单价 * 选取数量，得到每个商品的总价
    	// 2、把每个商品的总价相加得到全部商品总价
      priceTotal() {
        let priceList = this.shopcartList
          .map(item => item.selected? item.sell_price * goodsStorage.get(item.id) : 0);
        return priceList.length && priceList.reduce((v1, v2) => v1+v2);
      },

      // 所选商品数量总和：
      // 1、遍历购物车，取得每个选中状态的商品数量
    	// 2、把每个商品的数量相加得到全部商品的数量
      sumTotal() {
      	let totalList = this.shopcartList.map(item => item.selected? goodsStorage.get(item.id) : 0);
      	return totalList.length && totalList.reduce((v1, v2) => v1+v2);
      }
    },

    methods: {

    	// 获取购物车商品列表
    	getShopcartList() {

    		// 获取购物车所有商品的id，如果没有那么就不用发送请求了
    		let ids = goodsStorage.getIDList().toString();
    		if(!ids) {
    			return;
    		}

    		// 请求接口获取购物车中每个商品的详细信息
    		let url = URL.shopcartList + ids;
    		this.$http.get(url).then(rep => {
					let body = rep.body;
					// 请求成功后，需要对商品的图片地址添加域名前缀，
					// 同时给每条数据添加一个selected属性作为商品的选取开关，默认为选中状态true
					if(body.status == 0) {
						this.shopcartList = body.message.map(item => {
							item.src = URL.imgDomain + item.thumb_path;
							item.selected = true;
							return item;
						});
					}
    		});
    	},

    	// 删除商品
    	// 1、从购物车列表中删除：通过id找到商品在列表中的下标，然后splice删除
    	// 2、从storage中删除：调用封装好的删除方法即可实现
    	remove(id) {
    		let index = this.shopcartList.findIndex(item => item.id == id);
    		index > -1 && this.shopcartList.splice(index, 1);
				goodsStorage.remove(id);
    	}
    },

    created() {
      this.getShopcartList();
    },

    components: {
    	vTitle
    }
  };
</script>

<style lang="less">
  .shopcart-list {
    .goods {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      height: 102px;
      display: flex;
      padding: 5px;
      .switch {
        flex: 0 0 52px;
      }
      .img {
        margin-left: 5px;
        height: 75px;
        width: 75px;
        flex: 0 0 85px;
      }
      .inforight {
        margin-left: 5px;
        flex: 1;
      }
      .inforight ul {
        padding-left: 0px;
      }
      .inforight li {
        list-style: none;
        display: inline-block;
      }
      .inforight h4 {
        color: #0094ff;
        font-size: 14px;
      }
      .bottom li:first-child {
        color: red;
        margin-right: 5px;
      }
      .bottom li:last-child {
        margin-left: 5px;
      }
    }
    .total {
      height: 84px;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      padding: 5px 14px;
      ul {
		    padding-left: 0px;
		    margin: 14px 0;
		    li {
		      list-style: none;
		      font-size: 14px;
		    }
		  }
		  &_val {
		  	flex: 1;
		  }
		  &_btn {
		  	flex: 0 0 60px;
	      margin: 18px 0 0 0;
		  }
    }
  }
</style>