<template>
  <div class="surface-selection">
    <div
      class="surface-selection__container"
    >
      <div
        class="surface-selection__container--door"
        :class="{ active: isDoorSelected}"
        @click="choseDoorSurface()"
      >
        <base-ripple
          :color="'#000'"
          class="surface-ripple"
          fluid
        >
          <img class="container-image" src="@/assets/images/door.svg">
        </base-ripple>
      </div>

      <div
        class="surface-selection__container--wall"
        :class="{ active: isWallSelected}"
        @click="choseWallSurface()"
      >
        <base-ripple
          :color="'#000'"
          class="surface-ripple"
          fluid
        >
          <img class="container-image" src="@/assets/images/wall.svg">
        </base-ripple>
      </div>
    </div>
    <div
      class="surface-selection__footer"
    >
      <BaseButton
        class="submit-button"
        type="submit"
        :status="isSurfaceSelected ? 'default' : 'disabled'"
        @click="submitChoice()"
      >
        Valider
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { WIZARD } from './../../utils/constants/index';
import BaseRipple from './../bootstrap/effect/BaseRipple';
import BaseButton from './../bootstrap/button/BaseButton';

export default {
  name: 'SurfaceSelection',
  components: {
    BaseRipple,
    BaseButton
  },
  data() {
    return {
      surfaceSelected: WIZARD.SURFACES.NONE
    }
  },
  props: {
    callback: {
      type: Function,
      required: true
    }
  },
  computed: {
    isDoorSelected() {
      return this.surfaceSelected.NAME === WIZARD.SURFACES.DOOR.NAME;
    },
    isWallSelected() {
      return this.surfaceSelected.NAME === WIZARD.SURFACES.WALL.NAME;
    },
    isSurfaceSelected() {
      return this.surfaceSelected.NAME !== WIZARD.SURFACES.NONE.NAME;
    }
  },
  methods: {
    choseDoorSurface() {
      this.surfaceSelected = WIZARD.SURFACES.DOOR;
    },
    choseWallSurface() {
      this.surfaceSelected = WIZARD.SURFACES.WALL;
    },
    submitChoice() {
      this.callback(this.surfaceSelected);
    }
  }
}
</script>

<style lang="scss">
.surface-selection {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 25px;
  &__container {
    flex: 1;
    display: flex;
    justify-content: space-around;
    padding: 25px 0;
    &--door, &--wall {
      width: 40%;
      box-sizing: border-box;
      padding: 20px;
      border: 1px solid $light-grey;
      border-radius: 6px;
      transition: border 0.3s, padding 0.3s;
      cursor: pointer;

      .surface-ripple {
        display: flex;
        justify-content: center;
        user-select: none;
        .container-image {
          width: 100%;
        }
      }

      &:hover, &.active {
        padding: 15px;
        border-width: 5px;
      }
      &:hover {
        border-color: $primary-dark-green;
      }
      &.active {
        border-color: $primary-green;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: center;
    .submit-button {
      padding: 5px 20px;
    }
  }
  
}
</style>