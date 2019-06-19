<template>
  <div class="color-selection">
    <div class="color-selection__color-list">
      <div
        v-for="(val, key) in definedColors"
        :key="key"
        class="color"
        :class="{'selected': selectedColor === val}"
        :style="{ 'background-color': val }"
        @click="callback(val)"
      ></div>
    </div>
  </div>
</template>

<script>
import { pickBy } from '@/utils/fp';

export default {
  name: 'ColorSelection',
  props: {
    callback: {
      type: Function,
      required: true
    },
    selectedColor: {
      type: String,
      required: true
    },
    colors: {
      type: Object,
      required: true
    }
  },
  computed: {
    definedColors() {
      return pickBy(val => val !== '', this.colors);
    }
  }
}
</script>

<style lang="scss">
.color-selection {
  &__color-list {
    display: flex;
    padding: 50px 0px;
    justify-content: space-around;
    .color {
      height: 30px;
      width: 30px;
      box-sizing: border-box;
      border: 1px solid black;
      border-radius: 4px;
      cursor: pointer;
    }
    .selected {
      border: 2px solid $primary-green;
    }
  }
}
</style>
