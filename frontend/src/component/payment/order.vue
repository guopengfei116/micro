<template>
	<section class="order">
		<!-- 标题 -->
	  	<v-title :title="title"></v-title>
	</section>
</template>

<script>
	import vTitle from '../common/title.vue';

	export default {
	    data() {
	    	return {
				title: '确认付款'
	    	};
	    },
	    components: {
	      vTitle
	    }
    };
</script>

<style lang="less">
</style>