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
          :selectedPattern="currentPattern.NAME"
          :patterns="patternTypes"
        ></PatternSelection>

        <ColorSelection
          :callback="selectColor"
          :selectedColor="currentColor"
          :colors="colorList"
        ></ColorSelection>

        <ModuleSelection
          :callback="selectModule"
          :selectedModule="currentModule"
          :modules="moduleList"
        ></ModuleSelection>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { WIZARD, CELL } from './../../utils/constants/index';
import PatternSelection from './PatternSelection';
import ColorSelection from './ColorSelection';
import ModuleSelection from './ModuleSelection';
import MatrixDisplay from './MatrixDisplay';

export default {
  name: 'SurfaceComposition',
  components: {
    PatternSelection,
    ColorSelection,
    ModuleSelection,
    MatrixDisplay
  },
  computed: {
    ...mapGetters('shapeIt/wizard', [
      'currentSurface',
      'currentPattern',
      'currentModule',
      'currentColor'
    ]),
    patternTypes () {
      return WIZARD.PATTERNS;
    },
    colorList() {
      return WIZARD.COLORS;
    },
    moduleList() {
      return WIZARD.MODULES;
    },
    gridOptions () {
      return {
        height: this.currentSurface.HEIGHT,
        width: this.currentSurface.WIDTH,
        defaultCellStatus: CELL.STATUS.DEFAULT,
        defaultCellColor: WIZARD.COLORS.NONE,
        defaultCellModule: WIZARD.MODULES.NONE,
        patternHeight: this.currentPattern.HEIGHT,
        patternWidth: this.currentPattern.WIDTH
      }
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
      this.$store.dispatch('shapeIt/grid/initializeGrid', this.gridOptions);
    },
    /**
     * Select Color
     *  - Dispatch to store
     * @param {String} color
     */
    selectColor (color) {
      this.$store.dispatch('shapeIt/wizard/changeColor', color);
    },
    /**
     * Select Module
     *  - Dispatch to store
     * @param {String} module
     */
    selectModule (module) {
      this.$store.dispatch('shapeIt/wizard/changeModule', module);
    }
  },
  created() {
    if (this.currentPattern.NAME !== WIZARD.PATTERNS.NONE.NAME)
      this.$store.dispatch('shapeIt/grid/initializeGrid', this.gridOptions);
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
      align-items: center;
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
