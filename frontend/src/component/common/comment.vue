<template>
	<section class="comment">
		<!-- 提交评论部分，使用mui的卡片视图 -->
		<div class="mui-card comment_submit">
			<div class="mui-card-header">
				<h3>提交评论</h3>
			</div>
			<div class="mui-card-content">
				<!-- 使用mui文本框与按钮 -->
		    	<textarea v-model.trim="content" rows="5" placeholder="请输入评论内容"></textarea>
				<button @click="putComment" type="button" class="mui-btn mui-btn-success mui-btn-block">提交</button>
			</div>
		</div>
		<!-- 评论列表部分，使用mui的卡片视图 -->
		<div class="mui-card comment_list">
			<div class="mui-card-header">
				<h3>评论列表</h3>
			</div>
			<div class="mui-card-content">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-for="(item, i) in list">
						<div>
							<span>第{{ i + 1 }}楼 </span>
							<span>用户: {{ item.user_name }}</span>
							<span>发表时间: {{ item.add_time | formatDate }}</span>
						</div>
						<p class="comment_list_item">{{ item.content }}</p>
					</li>
				</ul>
			</div>
			<div class="mui-card-footer">
				<button @click="getComment" type="button" class="mui-btn mui-btn-success mui-btn-block">加载更多</button>
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
  			content: '',
  			pageindex: 1,
  			list: []
  		};
  	},

  	props: ['id'],

  	methods: {

  		// 提交评论
  		putComment() {
  			let url = config.commentPut + this.id;
  			let data = {content: this.content};
  			let options = { emulateJSON: true };

  			this.$http.post(url, data, options).then(rep => {
  				if(rep.body.status == 0) {
  					// 把数据添加到评论列表的最前面
	                this.list.unshift({
	                    user_name: '你自个',
	                    add_time: Date.now(),
	                    content: this.content
	                });
	                // 提示
					Toast({
					  message: '操作成功',
					  iconClass: 'icon icon-success'
					});
					// 清空输入框，记得放在最后清空
					this.content = '';
				}
  			});
  		},

  		// 获取评论列表
  		getComment() {
  			let url = config.commentList + this.id;
  			let options = {
  				params:{pageindex: this.pageindex}
  			};

  			this.$http.get(url, options).then(rep => {
  				let body = rep.body;

  				// 如果当前页已经么有数据了，那么不用push也不用pageindex++了
  				if(body.status == 0 && body.message.length > 0){
  					this.list.push(...body.message);
  					this.pageindex++;
  				}
  			});
  		}
  	},

  	created() {
  		this.getComment();
  	}
  };
</script>

<style lang="less">
	.comment {
		.mui-btn-success {
			background-color: #3dbdd0;
			border-color: #3dbdd0;
		}
		/* 提交评论 */
		&_submit {
			.mui-card-content {
				padding: 2px 4px;
			}
		}
		/* 提交列表 */
		&_list {
			&_item {
				background-color: #d8d8d8;
			}
		}
	}
</style>
