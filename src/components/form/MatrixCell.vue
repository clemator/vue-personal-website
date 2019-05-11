<template>
  <div
    class="matrix-cell"
    :style="{ 'background-color': data.color }"
    @click="$emit('cell-click', { X: data.X, Y: data.Y })"
  >
  </div>
</template>

<script>
export default {
  name: 'MatrixCell',
  props: {
    data: {
      type: Object,
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
}
</style>
