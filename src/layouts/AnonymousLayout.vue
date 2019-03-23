<template>
  <div class="anonymous-layout">
    <TopToolbar/>
    <TheLoginForm/>
  </div>
</template>

<script>
import TopToolbar from '../components/TopToolbar'
import TheLoginForm from '../components/TheLoginForm'

export default {
  name: 'AnonymousLayout',
  components: {
    TopToolbar,
    TheLoginForm
  }
}
</script>

<style lang="scss">
.anonymous-layout {
  height: 100%;
  background-color: #F0F0F0;
}
</style>
