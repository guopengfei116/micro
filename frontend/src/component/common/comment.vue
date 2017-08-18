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
				<button ref="loadMoreBtn" @click="getComment" type="button" class="mui-btn mui-btn-success mui-btn-block">加载更多</button>
			</div>
		</div>
	</section>
</template>

<script>
  import URL from '../../js/api/url.js';  // 接口配置
  import HTTP from '../../js/api/http.js';
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

  			let url = URL.commentPut + this.id;
  			let data = {content: this.content};

        // 发表成功后把新评论添加到列表的最前面，同时清空输入框
        HTTP.post(url, data).then(body => {
          this.list.unshift({
              user_name: '你自个',
              add_time: Date.now(),
              content: this.content
          });
          this.content = '';
        });

  		},

  		// 获取评论列表
  		getComment() {

  			let url = URL.commentList + this.id;
  			let options = {
  				params:{pageindex: this.pageindex}
  			};

        // 如果是空数据，那么证明这已经是最后一页，
        // 不用push也不用pageindex++，禁掉按钮点击功能实现最大程度优化
  			HTTP.get(url, options).then(body => {
          if(body.message.length > 0){
            this.list.push(...body.message);
            this.pageindex++;
          }else {
            this.$refs.loadMoreBtn.disabled = true;
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
