<template>
  <section class="title mint-header">
  	<!-- 返回按钮 -->
  	<div @click="rollback" class="mint-header-button is-left">
			<button class="mint-button mint-button--default mint-button--normal">
				<span class="mint-button-icon">
					<i class="mintui mintui-back"></i>
				</span> 
				<label class="mint-button-text">返回</label>
			</button>
  	</div>
  	<!-- 标题 -->
  	<h1 class="mint-header-title">{{ title }}</h1> 
  	<!-- 用于平衡标题，让其居中 -->
  	<div class="mint-header-button is-right"></div>
  </section>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: [
			'title'
		],
		methods: {
			// 回退到上一页
			rollback() {
				this.$router.go(-1);
			}
		}
	};
</script>

<style lang="less">
	.title {
		background-color: #fff;
		border-bottom: 1px solid #ccc;
		color: #24b189;
	}
</style>
