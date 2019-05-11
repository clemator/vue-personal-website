<template>
  <div class="matrix-display">
    <div
      v-for="line in grid"
      class="matrix-display__line"
    >
      <div
        v-for="cell in line" :key="cell.Y + ',' + cell.X"
      >
        <MatrixCell
          :data="cell"
          @cell-click="onCellClick"
        ></MatrixCell>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MatrixCell from './MatrixCell';

export default {
  name: 'MatrixDisplay',
  components: {
    MatrixCell
  },
  computed: {
    ...mapState('shapeIt/grid', {
      grid: state => state.gridMatrix
    }),
    ...mapGetters('shapeIt/wizard', [
      'currentColor'
    ])
  },
  methods: {
    onCellClick(data) {
      this.$store.dispatch('shapeIt/grid/changeCellColor', { ...data, color: this.currentColor });
    }
  }
}
</script>

<style lang="scss">
.matrix-display {
  display: flex;
  flex-direction: column;
  &__line {
    display: flex;
  }
}
</style>
