<template>
  <article class="index">
      <v-swipe></v-swipe>
      <v-nav></v-nav>
  </article>
</template>

<script>
	import vSwipe from './swipe.vue';
	import vNav from './nav.vue';
	export default {
	  components: {
	  	vSwipe,
	  	vNav
	  }
	};
</script>

<style>

</style>
