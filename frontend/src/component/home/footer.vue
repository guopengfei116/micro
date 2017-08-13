<template>
  <footer class="footer">
  		<div></div>
      <nav class="mui-bar mui-bar-tab">
				<router-link class="mui-tab-item mui-active" to="/index">
					<span class="mui-icon mui-icon-home"></span>
					<span class="mui-tab-label">首页</span>
				</router-link>
				<router-link class="mui-tab-item" to="/goods/list">
					<span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
					<span class="mui-tab-label">商品购买</span>
				</router-link>
				<router-link class="mui-tab-item" to="/shopcart">
					<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
						<span class="mui-badge">0</span>
					</span>
					<span class="mui-tab-label">购物车</span>
				</router-link>
				<router-link class="mui-tab-item" to="/personal">
					<span class="mui-icon mui-icon-contact"></span>
					<span class="mui-tab-label">个人中心</span>
				</router-link>
			</nav>
  </footer>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
	.footer {
		
		/* 底部空标签占位 */
		div {
			height: 50px;
		}
		
		/* 修改tab激活颜色 */
		.mui-bar-tab .mui-tab-item.mui-active {
			color: #24b189;
		}
	}
</style>
