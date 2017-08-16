<template>
  <section class="number-box">
    <div class="mui-numbox">
    	<button class="mui-btn mui-btn-numbox-minus" @click="subtract">-</button>
    	<input class="mui-input-numbox" type="number" v-model="value">
    	<button class="mui-btn mui-btn-numbox-plus" @click="add">+</button>
    </div>
  </section>
</template>

<script>
  export default {

    props: ['initial'],

    data() {
      return {
      	value: this.initial || 0
      };
    },

    // 监听value的变化，发送消息通知给父组件
    watch: {
    	value() {
    		this.$emit('change', this.value);
    	}
    },

    methods: {
      // 减
      subtract() {
				this.value > 0 && this.value--;
      },

      // 加
      add() {
      	this.value++;
      }
    }
  };
</script>

<style lang="less">
	.number-box {
		display: inline-block;
	}
</style>