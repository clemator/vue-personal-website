<template>
  <div class="color-selection">
    <div class="color-selection__color-list">
      <div
        :class="['color', { 'selected': selectedColor === val }]"
        v-for="(val, key) in definedColors"
        :key="key"
        :style="{ 'background-color': val }"
        @click="$emit('onColorSelection', val)"
      ></div>
    </div>
  </div>
</template>

<script>
import { pickBy } from '@/utils/fp';

export default {
  name: 'ColorSelection',
  props: {
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
      border: 2px solid $primaryGreen;
    }
  }
}
</style>
