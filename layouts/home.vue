<template>
  <div class="home-layout">
    <TopToolbar/>
    <nuxt/>
  </div>
</template>

<script>
import TopToolbar from '~/components/TopToolbar.vue'

export default {
  name: 'home',
  components: {
    TopToolbar,
  }
}
</script>

<style lang="scss">
.home-layout {
  height: 100%;
  background-color: #F0F0F0;
}
</style>