<template>
  <div class="default-layout">
    <TopToolbar/>
  </div>
</template>

<script>
import TopToolbar from '~/components/TopToolbar.vue'

export default {
  name: 'TheDefaultLayout',
  components: {
    TopToolbar,
  }
}
</script>

<style lang="scss">
.default-layout {
  height: 100%;
  background-color: #F0F0F0;
}
</style>