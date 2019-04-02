<template>
  <div class="user-layout">
    <TopToolbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import TopToolbar from '../components/TopToolbar.vue';

export default {
  name: 'UserLayout',
  components: {
    TopToolbar,
  },
};
</script>

<style lang="scss">
.user-layout {
  height: 100%;
  background-color: #F0F0F0;
}
</style>