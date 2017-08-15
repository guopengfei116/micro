<template>
  <article class="index">
      <v-swipe :lunbos="lunbos"></v-swipe>
      <v-nav></v-nav>
  </article>
</template>

<script>
	import URL from '../../js/api/url.js';
	import vSwipe from '../common/swipe.vue';
	import vNav from './nav.vue';

	export default {

		data() {
			return {
				lunbos: []
			};
		},

		methods: {

			// 获取轮播图列表
			getLunbos() {
				let url = URL.lunbos;
				this.$http.get(url).then(rep => {
					let body = rep.body;
					if(body.status == 0) {
						// 把数据中的img属性转为src，以复用轮播图组件
						this.lunbos = rep.body.message.map(item => {
							item.src = item.img;
							return item;
						});
					}
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
