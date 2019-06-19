<template>
  <div class="shape-it-layout">
    <TheFormWizard/>
  </div>
</template>

<script>
import TheFormWizard from '@/components/wizard/TheFormWizard';

export default {
  name: 'ShapeItLayout',
  components: {
    TheFormWizard
  }
}
</script>

<style lang="scss">
.shape-it-layout {
  height: 100%;
}
</style>