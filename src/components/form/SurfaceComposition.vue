<template>
  <div class="surface-composition">
    <slot></slot>
    <div
      class="surface-composition__container"
    >
      <div
        class="surface-composition__container__left-part"
      >
        <!--<img class="container-image" :src="require(`@/assets/images/${currentSurface}.svg`)">-->
        <MatrixDisplay></MatrixDisplay>
      </div>

      <div
        class="surface-composition__container__right-part"
      >
        <PatternSelection
          :callback="selectPattern"
          :selectedPattern="currentPatternName"
          :patterns="patternTypes"
        ></PatternSelection>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { WIZARD, CELL } from './../../utils/constants/index';
import PatternSelection from './PatternSelection';
import MatrixDisplay from './MatrixDisplay';

export default {
  name: 'SurfaceComposition',
  components: {
    PatternSelection,
    MatrixDisplay
  },
  computed: {
    ...mapGetters('shapeIt/wizard', [
      'currentSurface',
      'currentPatternName'
    ]),
    patternTypes () {
      return WIZARD.PATTERNS;
    }
  },
  methods: {
    /**
     * Select Pattern
     *  - Dispatch to store
     * @param {Object} pattern
     */
    selectPattern (pattern) {
      this.$store.dispatch('shapeIt/wizard/changePatternType', pattern);
      const gridOptions = {
        height: this.currentSurface.HEIGHT,
        width: this.currentSurface.WIDTH,
        defaultCellStatus: CELL.STATUS.DEFAULT,
        defaultCellColor: CELL.COLORS.NONE,
        defaultCellModule: CELL.MODULES.NONE,
        patternHeight: pattern.HEIGHT,
        patternWidth: pattern.WIDTH
      };
      this.$store.dispatch('shapeIt/grid/initializeGrid', gridOptions);
    }
  }
}
</script>

<style lang="scss">
.surface-composition {
  height: 100%;
  padding: 25px 20px;
  &__container {
    display: flex;
    justify-content: space-between;
    height: 100%;
    &__left-part, &__right-part {
      box-sizing: border-box;
    }
    &__left-part {
      width: 55%;
      display: flex;
      justify-content: center;
      align-items: stretch;
      .container-image {
        width: 100%;
      }
    }
    &__right-part {
      width: 45%;
      border: 3px solid $light-grey;
      border-radius: 6px;
    }
  }
}
</style>
