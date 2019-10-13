<template>
  <div class="matrix-display">
    <div
      class="matrix-display__line"
      v-for="(line, index) in grid"
      :key="index"
    >
      <div
        v-for="cell in line"
        :key="cell.Y + ',' + cell.X"
      >
        <MatrixCell
          :data="cell"
          :isCellHidden="(onPreview && cell.status === 'default') ? true : false"
          @onCellClick="onCellClick"
        ></MatrixCell>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MatrixCell from '@/components/form/MatrixCell';
import { WIZARD } from './../../utils/constants/index';

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
    /**
     * On Cell Click
     * - Handle the cell click interaction
     * @param {Object} cellData
     */
    onCellClick(cellData) {
      // On preview mode, do not allow any interactions with cells
      if (this.onPreview)
        return;
      // On color selection mode, if the cell color is the same as the color selection, reset it
      // Otherwise, set the cell color
      else if (this.isColorSelected) {
        this.$store.dispatch('shapeIt/grid/changeCellColor',
        {
          ...cellData,
          color: (this.currentColor !== cellData.color) ? this.currentColor : WIZARD.COLORS.NONE
        });
      }
      // On module selection mode, if the cell module is the same as the module selection, reset it
      // Otherwise, set the cell module
      else if (this.isModuleSelected) {
        this.$store.dispatch('shapeIt/grid/changeCellModule',
        {
          ...cellData,
          module: (this.currentModule !== cellData.module) ? this.currentModule : WIZARD.MODULES.NONE
        });
      }
    }
  }
}
</script>

<style lang="scss">
.matrix-display {
  display: flex;
  flex-direction: column;
  background-color: $lightGrey;
  border: 1px solid black;

  &__line {
    display: flex;
  }
}
</style>
