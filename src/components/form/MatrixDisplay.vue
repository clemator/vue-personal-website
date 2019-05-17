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
          :isCellHidden="(onPreview && cell.status === 'default') ? true : false"
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
      'currentColor',
      'currentModule',
      'isColorSelected',
      'isModuleSelected',
      'onPreview'
    ])
  },
  methods: {
    onCellClick(data) {
      if (this.onPreview)
        return;
      else if (this.isColorSelected)
        this.$store.dispatch('shapeIt/grid/changeCellColor', { ...data, color: this.currentColor });
      else if (this.isModuleSelected)
        this.$store.dispatch('shapeIt/grid/changeCellModule', { ...data, module: this.currentModule });
    }
  }
}
</script>

<style lang="scss">
.matrix-display {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  &__line {
    display: flex;
  }
}
</style>
