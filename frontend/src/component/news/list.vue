<template>
  <article class="news-list">

  	<!-- 头部 -->
  	<v-title :title="title"></v-title>

  	<!-- 列表 -->
    <ul class="mui-table-view">
        <li v-for="item in list" :key="item.id" class="mui-table-view-cell mui-media">
            <router-link :to="'/news/detail/' + item.id">
                <img :src="item.img_url" class="mui-media-object mui-pull-left">
                <div class="mui-media-body">
                    <h4 class="mui-ellipsis">{{ item.title }}</h4>
                    <div class="list_item">
                        <p>创建时间：{{ item.add_time | formatDate }}</p>
                        <p>点击量：{{ item.click }}</p>
                    </div>
                </div>
            </router-link>
        </li>
    </ul>

  </article>
</template>

<script>
	import URL from '../../js/api/url.js';
	import HTTP from '../../js/api/http.js';
	import vTitle from '../common/title.vue';

	export default {

	    data() {
	        return {
	        		title: '新闻咨询',
	            list: []
	        };
	    },

	    methods: {

	        // 获取新闻列表
	        getNews() {
	            let url = URL.newsList;
	            HTTP.get(url).then(body => {
	                this.list = body.message;
	            });
	        }
	    },

	    created() {
	        this.getNews();
	    },

	    components: {
	    	vTitle
	    }
	};
</script>

<style lang="less">
    .list {
        &_item p{
            display: inline-block;
        }
    }
</style>
