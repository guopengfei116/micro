<template>
	<section class="comment">
		<!-- 使用mui的卡片视图 -->
		<div class="mui-card">
			<div class="mui-card-header">
				<h3>提交评论</h3>
			</div>
			<div class="mui-card-content">
				<!-- 使用mui文本框与按钮 -->
		    	<textarea v-model.trim="content" rows="5" placeholder="请输入评论内容"></textarea>
				<button @click="putComment" type="button" class="mui-btn mui-btn-success mui-btn-block">提交</button>
			</div>
		</div>
	</section>
</template>

<script>
  import config from '../../js/config/api.js';  // 接口配置
  import { Toast } from 'mint-ui';  // 提示框组件
  
  // 组件定义
  export default {
  	data() {
  		return {
  			content: ''
  		};
  	},
  	props: ['id'],
  	methods: {
  		// 提交评论
  		putComment() {
  			let url = config.commentPut + this.id;
  			this.$http.post(url, {content: this.content}, {emulateJSON: true}).then(rep => {
  				if(rep.body.status == 0) {
					Toast({
					  message: '操作成功',
					  iconClass: 'icon icon-success'
					});
					this.content = '';
				}
  			});
  		}
  	}
  };
</script>

<style>
</style>
