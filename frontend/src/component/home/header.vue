<template>
  <header class="header">
  		<div></div>
      <mt-header fixed title="小本买卖"></mt-header>
  </header>
</template>

<script>
export default {

};
</script>

<style lang="less">
	.header {
		/* 头部空标签占位 */
		div {
			height: 40px;
		}
		/* 修改mintUI样式 */
		.mint-header {
	    background-color: #2ce094;
	    &-title {
	    	font-size: 22px;
	    	font-weight: 900;
	    }
	  }
	}
</style>

