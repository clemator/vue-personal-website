<template>
  <div class="surface-selection">
    <div
      class="surface-selection__container"
    >
      <div
        class="surface-selection__container--door"
      >
        <BaseButton v-on:click="choseDoorSurface()">DOOR</BaseButton>
      </div>

      <div
        class="surface-selection__container--wall"
      >
        <BaseButton v-on:click="choseWallSurface()">WALL</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseButton } from './../bootstrap';

export default {
  name: 'SurfaceSelection',
  components: {
    BaseButton
  },
  methods: {
    choseDoorSurface() {
      console.log('DOOR');
    },
    choseWallSurface() {
      console.log('WALL');
    }
  }
}
</script>

<style lang="scss">

</style>