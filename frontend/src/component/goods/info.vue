<template>
  <section class="goods-info">
    <div class="mui-card">
      <div class="mui-card-header">{{ info.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner" v-html="info.content"></div>
      </div>
    </div>
  </section>
</template>

<script>
  import URL from '../../js/api/url.js';

  export default {

    props: ['id'],

    data() {
      return {
        info: {}
      };
    },

    methods: {

      // 获取图文介绍
      getGoodsInfo() {
        let url = URL.goodsInfo + this.id;
        this.$http.get(url).then(rep => {
          let body = rep.body;
          body.status == 0 && (this.info = body.message[0]);
        });
      }
    },

    created(){
      this.getGoodsInfo();
    }
  }
</script>

<style lang="less">
  .goods-info {
    img {
      width: 100%;
    }
  }
</style>