<template>
  <div
    :class="['matrix-cell', { 'matrix-cell--hidden': isCellHidden }]"
    :style="{ 'background-color': getCellColor }"
    @click="$emit('onCellClick', { ...data })"
  >
    {{ data.module ? '*' : '' }}
  </div>
</template>

<script>
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
  },
  computed: {
    getCellColor() {
      if (this.isCellHidden) {
        return '#F0F0F0';
      }
      else {
        return this.data.color || '#ffffff';
      }
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
    background-color: #F0F0F0;
    border: none;
    cursor: initial;
  }
}
</style>
