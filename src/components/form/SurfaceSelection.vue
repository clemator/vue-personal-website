<template>
  <div class="surface-selection">
    <div
      class="surface-selection__container"
    >
      <div
        class="surface-selection__container--door"
        @click="choseDoorSurface()"
      >
        <img class="container-image" src="@/assets/images/door.svg">
      </div>

      <div
        class="surface-selection__container--wall"
        @click="choseWallSurface()"
      >
        <img class="container-image" src="@/assets/images/wall.svg">
      </div>
    </div>
  </div>
</template>

<script>
import { WIZARD } from './../../utils/constants/index';

export default {
  name: 'SurfaceSelection',
  props: {
    callback: {
      type: Function,
      required: true
    }
  },
  methods: {
    choseDoorSurface() {
      this.callback(WIZARD.SURFACES.DOOR);
    },
    choseWallSurface() {
      this.callback(WIZARD.SURFACES.WALL);
    }
  }
}
</script>

<style lang="scss">
.surface-selection {
  height: 100%;
  &__container {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &--door, &--wall {
      display: flex;
      justify-content: center;
      width: 40%;
      height: 90%;
      box-sizing: border-box;
      padding: 20px;
      border: 1px solid $light-grey;
      border-radius: 6px;
      transition-property: border, padding;
      transition-duration: 0.3s;
      transition-delay: 0s;
      transition-timing-function: ease;
      cursor: pointer;
      .container-image {
        width: 100%;
      }
      &:hover {
        padding: 15px;
        border-width: 5px;
        border-color: $primary-green;
      }
    }
  }
}
</style>