<template>
  <article class="index">
      <v-swipe :lunbos="lunbos"></v-swipe>
      <v-nav></v-nav>
  </article>
</template>

<script>
	import URL from '../../js/api/url.js';
	import HTTP from '../../js/api/http.js';
	import vSwipe from '../common/swipe.vue';
	import vNav from './nav.vue';

	export default {

		data() {
			return {
				lunbos: []
			};
		},

		methods: {

			// 获取轮播图列表数据，
			// 成功后把每一项的img属性转为src，以复用轮播图组件
			getLunbos() {
				let url = URL.lunbos;
				HTTP.get(url).then(body => {
          this.lunbos = body.message.map(item => {
            item.src = item.img;
            return item;
          });
				});
			}
		},

		created() {
			this.getLunbos();
		},

	  components: {
	  	vSwipe,
	  	vNav
	  }
	};
</script>

<style lang="less">
</style>
