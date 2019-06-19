<template>
  <div class="anonymous-layout">
    <TopToolbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import TopToolbar from '@/components/TopToolbar';

export default {
  name: 'AnonymousLayout',
  components: {
    TopToolbar,
  }
};
</script>

<style lang="scss">
.anonymous-layout {
  height: 100%;
  background-color: $light-grey;
}
</style>
