<template>
  <article class="list">
  	<v-title title="新闻咨询"></v-title>
    <ul class="mui-table-view">
        <li v-for="item in list" :key="item.id" class="mui-table-view-cell mui-media">
            <a href="javascript:;">
                <img :src="item.img_url" class="mui-media-object mui-pull-left">
                <div class="mui-media-body">
                    <h4 class="mui-ellipsis">{{ item.title }}</h4>
                    <div class="list_item">
                        <p>创建时间：{{ item.add_time }}</p>
                        <p>点击量：{{ item.click }}</p>
                    </div>
                </div>
            </a>
        </li>
    </ul>
  </article>
</template>

<script>
	import config from '../../js/config/api.js';
	import vTitle from '../common/title.vue';
	export default {
	    data() {
	        return {
	            list: []  
	        };
	    },
	    methods: {
	        // 获取新闻列表
	        getNews() {
	            let url = config.newsList;
	            this.$http.get(url).then(rep => {
	                rep.body.status == 0 && (this.list = rep.body.message);
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
