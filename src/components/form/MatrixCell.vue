<template>
  <div
    class="matrix-cell"
    :class="{ 'matrix-cell--hidden': isCellHidden }"
    :style="{ 'background-color': data.color }"
    @click="$emit('cell-click', { X: data.X, Y: data.Y })"
  >
    {{ data.module ? '*' : '' }}
  </div>
</template>

<script>
import { CELL } from './../../utils/constants/index';

export default {
  name: 'MatrixCell',
  props: {
    data: {
      type: Object,
      required: true
    },
    isCellHidden: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
.matrix-cell {
  width: 15px;
  height: 15px;
  border: 1px solid black;
  margin: 5px;
  cursor: pointer;

  &--hidden {
    border: none;
    cursor: initial;
  }
}
</style>
