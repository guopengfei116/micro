<template>
	<section class="swipe">
		<mt-swipe :auto="2000">
		  <mt-swipe-item v-for="item in list">
		  	<a :href="item.url">
		  		<img :src="item.img"/>
		  	</a>
		  </mt-swipe-item>
		</mt-swipe>
	</section>
</template>

<script>
	import config from '../../js/config/api.js';
	export default {
		data() {
			return {
				list: []
			};
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				let url = config.lunbos;
				this.$http.get(url).then(rep => {
					rep.body.status == 0 && (this.list = rep.body.message);
				});
			}
		}
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