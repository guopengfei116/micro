<template>
  <article class="goods-list">
  	<!-- 头部 -->
  	<v-title :title="title"></v-title>
  	<!-- 列表 -->
    <ul class="mui-table-view mui-grid-view">
      <!-- 单个商品 -->
      <li v-for="item in goodsList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
      	<router-link :to="{ name: 'goodsD', params: { id: item.id } }">
	        <div class="mui-card">
	          <!-- 商品图片 -->
	          <div class="mui-card-header">
	          	<img :src="item.img_url"/>
	          </div>
	          <!-- 商品描述 -->
	          <div class="mui-card-footer ">
	            <p class="mui-ellipsis-2">{{ item.title }}</p>
	          </div>
	          <!-- 商品价格 -->
	          <div class="mui-card-content">
	            <p class="price">
	            	<span>￥{{ item.sell_price }}</span>
	            	<s>￥{{ item.market_price }}</s>
	            </p>
	            <p class="tip">
	            	<span>热卖中</span>
	            	<span>剩余{{ item.stock_quantity }}件</span>
	            </p>
	          </div>
	        </div>
        </router-link>
      </li>
    </ul>
    <!-- 加载更多 -->
    <button ref="loadMoreBtn" @click="getGoodsList" class="mui-btn mui-btn-success mui-btn-block">加载更多</button>
  </article>
</template>

<script>
  import URL from '../../js/api/url.js';
  import vTitle from '../common/title.vue';

  export default {

		data() {
			return {
				title: '商品列表',
        goodsList: [],
        pageindex: 1
			};
		},

		methods: {

     // 获取商品列表
      getGoodsList() {
      	let url = `${URL.goodsList}?pageindex=${this.pageindex}`;
        this.$http.get(url).then(rep => {
       	  let body = rep.body;
       	  // 如果当前页已经么有数据了，那么不用push也不用pageindex++了
  				if(body.status == 0 && body.message.length > 0){
  					this.goodsList.push(...body.message);
  					this.pageindex++;
  				}else if(body.message.length == 0){
  					this.$refs.loadMoreBtn.disabled = true;
  				}
        });
      }

		},

		created() {
      this.getGoodsList();
		},

		components: {
      vTitle
		}
  }
</script>

<style lang="less">
  .goods-list {
  	.mui-card {
  		box-shadow: 0px 0px 4px rgba(0, 0, 0, .3);
  	}
  	.mui-card-header {
  		padding: 8px;
  		/*height: 100px;*/
  		img {
  			width: 100%;
  			height: 100%;
  		}
  	}
    .mui-card-content {
      text-align: center;
      .price {
        margin-bottom: 4px;
        color: #000;
        span {
          color: red;
        }
      }
      .tip {
        overflow: hidden;
        padding: 0 8px;
        font-size: 12px;
        span:first-child {
          float: left;
        }
        span:last-child {
          float: right;
        }
      }
    }
  }
</style>