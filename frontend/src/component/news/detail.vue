<template>
  <section class="news-list">

  	<!-- 头部 -->
    <v-title :title="title"></v-title>

    <!-- 详情 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ news.title }}</div>
      <div class="mui-card-footer" >
        <span>创建时间：{{ news.add_time | formatDate }}</span>
        <span>浏览量：{{ news.click }}</span>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner" v-html="news.content"></div>
      </div>
    </div>

    <!-- 评论 -->
  	<v-comment :id="id"></v-comment>

  </section>
</template>

<script>
	import URL from '../../js/api/url.js';
	import HTTP from '../../js/api/http.js';
	import vTitle from '../common/title.vue';
	import vComment from '../common/comment.vue';

	export default {

		data() {
	    return {
	      news: {},
	      title: '新闻详情',
	      id: this.$route.params.id
	    }
	  },

	  created() {
	  	this.id = this.$route.params.id;
	  },

	  methods: {

	    // 根据id获取对应的新闻详情
	    getDetatils() {
	      let url = URL.newsDetail + this.$route.params.id;
	      HTTP.get(url).then(body => {
	        this.news = body.message[0];
	      });
	    }
	  },

	  created() {
	    this.getDetatils();
	  },

	  components: {
	    vTitle,
	    vComment
	  }
	};
</script>

<style lang="less">
	.news-list {
		img {
			width: 100%;
		}
	}
</style>
