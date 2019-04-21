<template>
  <div class="surface-composition">
    <slot></slot>
    <div
      class="surface-composition__container"
    >
      <div
        class="surface-composition__container__left-part"
      >
        <img class="container-image" :src="require(`@/assets/images/${currentSurface}.svg`)">
      </div>

      <div
        class="surface-composition__container__right-part"
      >
        TEST
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SurfaceComposition',
  computed: {
    ...mapGetters('shapeIt/wizard', [
      'currentSurface'
    ])
  }
}
</script>

<style lang="scss">
.surface-composition {
  height: 100%;
  &__container {
    display: flex;
    height: 100%;
    &__left-part {
      flex: 1;
    }
    &__right-part {
      flex: 1;
    }
  }
}
</style>
