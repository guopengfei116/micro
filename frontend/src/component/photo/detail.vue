<template>
  <section class="detail">
  	<!-- 头部 -->
  	<v-title :title="title"></v-title>
  	<!-- 详情 -->
    <div class="mui-card">
    	<!-- 标题 -->
      <div class="mui-card-header">
        <h4>{{ info.title }}</h4>
        <p> <span>发布时间：{{ info.add_time | formatDate }}</span> <span>预览量：{{ info.click }}</span> </p>
      </div>
      <!-- 缩略图 -->
      <div class="mui-card-content">
        <ul class="mui-table-view mui-grid-view">
          <li class="mui-table-view-cell mui-media mui-col-xs-4" v-for="item in hums" :key="item.src"> <img :src="item.src" /> </li>
        </ul>
      </div>
      <!-- 描述部分 -->
      <div class="mui-card-footer" v-html='info.content'></div>
    </div>
  </section>
</template>

<script>
  import URL from '../../js/api/url.js';
  import vTitle from '../common/title.vue';

  export default {
    data() {
      return {
      	title: '图片详情',
        info: {},
        hums: []
      };
    },
    methods: {

      // 获取描述信息
      getInfo() {
        let url = URL.photoInfo + this.$route.params.id;
        this.$http.get(url).then(rep => {
          let body = rep.body;
          body.status == 0 && (this.info = body.message[0]);
        });
      },

      // 获取缩略图
      getHums() {
        let url = URL.photoHums + this.$route.params.id;
        this.$http.get(url).then(rep => {
          let body = rep.body;
          if(body.status == 0) {
            // 遍历图片列表，修改每一个图片对象的img_url地址
            this.hums = body.message.map(function(photo, i) {
              photo.src = URL.imgDomain + photo.src;
              return photo;
            });
          }
        });
      }
    },
    created() {
      this.getInfo();
      this.getHums();
    },
    components: {
    	vTitle
    }
  };
</script>

<style lang="less">
  .detail {
    .mui-card-header,
    .mui-card-footer {
      display: block
    }
    .mui-card-content img {
      width: 100%;
    }
  }
</style>
