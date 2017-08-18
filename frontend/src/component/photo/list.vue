<template>
  <section class="photo-list">

  	<!-- 头部 -->
  	<v-title :title="title"></v-title>

    <!-- 分类 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">全部</li>
      <li class="mui-table-view-cell" v-for="item in categoryList" :key="item.id">
        <router-link :to="'/photo/list/' + item.id">{{ item.title }}</router-link>
      </li>
    </ul>

    <!-- 列表 -->
    <div class="mui-card" v-for="item in photoList" :key="item.id">
      <router-link :to="'/photo/detail/' + item.id">
        <div class="mui-card-header mui-card-media" :style="getStyle(item)"></div>
      </router-link>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>{{ item.title }}</p>
          <p style="color: #333;">{{ item.zhaiyao }}</p>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  import URL from '../../js/api/url.js';
  import HTTP from '../../js/api/http.js';
  import vTitle from '../common/title.vue';

  export default {

    data() {
      return {
      	title: '图片分享',
        categoryList: [],
        photoList: []
      };
    },

    watch: {
      // 实例身上有一个$route属性，当前页面变化时，这个属性的值也会跟着变化,
      // 只要页面一变化，那么就根据新的id渲染图片列表
      $route() {
        this.getPhotoList(this.$route.params.id);
      }
    },

    methods: {

      // 获取分类列表
      getCategoryList() {
        let url = URL.photoCategoryList;
        HTTP.get(url).then(body => {
          this.categoryList = body.message;
        });
      },

      // 获取图片列表，请求成功后给每张图片地址添加域名前缀
      getPhotoList(id) {
        let url = URL.photoList + id;
        HTTP.get(url).then(body => {
          this.photoList = body.message.map((photo, i) => {
            photo.img_url = URL.imgDomain + photo.img_url;
            return photo;
          });
        });
      },

      // 获取背景style
      getStyle(item) {
        return 'height:40vw; background-image:url("' + item.img_url + '")';
      }
    },

    created() {
      // 页面一进来就要获取分类列表，然后根据url中附带的id获取图片列表
      this.getCategoryList();
      this.getPhotoList(this.$route.params.id);
    },

    components: {
    	vTitle
    }
  };
</script>

<style lang="less">
  .photo-list {
    .mui-table-view {
      overflow: hidden;
      &-cell {
        float: left;
      }
    }
  }
</style>