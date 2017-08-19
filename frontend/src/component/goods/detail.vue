<template>
  <article class="goods-detail">

  	<!-- 头部 -->
  	<v-title :title="title"></v-title>

  	<!-- 轮播图 -->
	  <v-swipe :lunbos="hums"></v-swipe>

  	<!-- 商品购买 -->
    <div class="mui-card">
      <!-- 名称 -->
      <div class="mui-card-header">{{ goods.title }}</div>
      <!-- 价格 -->
      <div class="mui-card-content mui-card-content-inner">
        <div class="price"> <s>市场价:￥{{ goods.sell_price }}</s> <span>销售价: </span> <em>￥{{ goods.market_price }}</em> </div>
        <div> <span>购买数量：</span>
          <!--数字输入框 -->
					<v-numbox :initial="total" @change="upTotal"></v-numbox>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="mui-card-footer">
	  		<router-link to="/shopcart" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">结算</router-link>
        <div></div>
        <button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined" @click="joinShopcart">加入购物车</button>
      </div>
    </div>

		<!-- 评论与介绍 -->
		<div class="mui-card">
			<!-- 选项卡 -->
	    <mt-navbar v-model="selectedTab">
			  <mt-tab-item id="vComment">商品评论</mt-tab-item>
			  <mt-tab-item id="vInfo">图文介绍</mt-tab-item>
			</mt-navbar>
			<!-- 内容 -->
			<component :is="selectedTab" :id="id"></component>
		</div>

  </article>
</template>

<script>
	import URL from '../../js/api/url.js';
	import HTTP from '../../js/api/http.js';
  import vTitle from '../common/title.vue';
  import vSwipe from '../common/swipe.vue';
  import vNumbox from '../common/numbox.vue';
  import vComment from '../common/comment.vue';
  import vInfo from './son/info.vue';

  export default {

    data() {
    	return {
    		title: '商品购买',
    		id: this.$route.params.id,
    		total: this.$store.state[this.$route.params.id],
    		hums: [],
			  goods: {},
			  selectedTab: ''
    	};
    },

    methods: {

    	// 获取商品缩略图，请求成功后给每张图片地址添加域名前缀
      getHums() {
        let url = URL.photoHums + this.id;
        HTTP.get(url).then(body => {
          this.hums = body.message.map(function(photo, i) {
            photo.src = URL.imgDomain + photo.src;
            return photo;
          });
        });
      },

      // 获取价格信息
      getGoodsPrice() {
      	let url = URL.goodsPrice + this.id;
      	HTTP.get(url).then(body => {
      		this.goods = body.message[0];
      	});
      },

      // 更新商品购买数量
      upTotal(total) {
      	this.total = total;
      },

      // 加入购物车，修改vuex的数据，底部购物车总数会监听到变化而更新
      joinShopcart() {
      	this.$store.commit('set', {
      	  id: this.id,
      	  total: this.total
      	});
      }
    },

    created() {
    	this.getHums();
    	this.getGoodsPrice();
    },

    components: {
    	vTitle,
    	vSwipe,
    	vNumbox,
    	vComment,
    	vInfo
    }
  };
</script>

<style lang="less">
  .goods-detail {
    .mui-card-content {
      .price {
        color: rgb(51, 51, 51);
        margin-bottom: 4px;
        span {
          margin-left: 6px;
        }
        em {
          font-size: 18px;
          color: red;
        }
      }
    }
    .mui-card-footer {
      div {
        width: 100%;
      }
      .mui-btn {
        padding: 8px 0;
        font-size: 16px;
      }
    }
    .mint-tab-item {
    	&.is-selected {
    		margin-bottom: 0;
    		border-bottom: 3px solid #2ce094;
    		color: #2ce094;
    	}
    }
    .mint-tab-item-label {
    	font-size: 18px;
    	color: #2ce094;
    }
    .mint-tab-container {
    	margin-top: 6px;
    }
  }
</style>