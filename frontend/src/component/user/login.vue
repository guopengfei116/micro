<template>
  <section class="login">

  	<!-- 标题 -->
  	<v-title :title="title"></v-title>

  	<!-- 输入框 -->
  	<div class="mui-content">
	    <form id='login-form' class="mui-input-group">
	      <div class="mui-input-row">
	      	<label>账号</label> <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="user_name">
	      </div>
	      <div class="mui-input-row">
	      	<label>密码</label> <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="user_pwd">
	      </div>
	    </form>
	    <div class="mui-content-padded">
	      <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="login">登录</button>
	      <div class="link-area">
	        <a id='reg'>注册账号</a> <span class="spliter">|</span>
	        <a id='forgetPassword'>忘记密码</a>
	      </div>
	    </div>
  	</div>

  </section>
</template>

<script>
  import { Toast } from 'mint-ui';
  import vTitle from '../common/title.vue';

  export default {

    data() {
    	return {
			title: '登陆',
			user_name: '',
			user_pwd: ''
    	};
    },

    methods: {
    	// 登陆，模拟接口效验账号密码，正确后设置登陆cookie，然后跳转至下一页
    	login() {
			if(this.user_name == 'self' && this.user_pwd == '111111') {
				document.cookie = 'SESSIONID=' + Date.now();
				this.$router.push(this.$route.query.nextpage);
			}else {
				Toast('账号密码错误！');
			}
    	}
    },

    components: {
      vTitle
    }
  };
</script>

<style lang="less">
	.login {
		.mui-input-group {
			margin-top: 10px;
			padding: 0 10px;
			&:first-child {
				margin-top: 20px;
			}
			label {
				width: 22%;
			}
			.mui-input-row label~input,
			.mui-input-row label~select,
			.mui-input-row label~textarea {
				width: 78%;
			}
		}
		.mui-content-padded {
			margin-top: 25px;
			.mui-btn {
				padding: 10px;
			}
			.link-area {
				display: block;
				margin-top: 25px;
				text-align: center;
			}
			.spliter {
				color: #bbb;
				padding: 0px 8px;
			}
		}
	}
</style>