<template>
  <section class="swipe">
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="(item, i) in lunbos" :key="i">
        <a :href="item.url"> <img :src="item.src" /> </a>
      </mt-swipe-item>
    </mt-swipe>
  </section>
</template>

<script>
  import URL from '../../js/api/url.js';

  export default {
  	props: ['lunbos']
  };
</script>

<style lang="less">
  .swipe {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>