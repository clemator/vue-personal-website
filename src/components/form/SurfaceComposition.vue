<template>
  <div class="surface-composition">
    <slot/>

    <div class="surface-composition__container">
      <div class="surface-composition__container__left-part">
        <!--<img class="container-image" :src="require(`@/assets/images/${currentSurface}.svg`)">-->
        <MatrixDisplay></MatrixDisplay>
      </div>

      <div class="surface-composition__container__right-part">
        <PatternSelection
          :selectedPattern="currentPattern.NAME"
          :patterns="patternTypes"
          @onPatternSelection="selectPattern"
        ></PatternSelection>

        <ColorSelection
          :selectedColor="currentColor"
          :colors="colorList"
          @onColorSelection="selectColor"
        ></ColorSelection>

        <ModuleSelection
          :selectedModule="currentModule"
          :modules="moduleList"
          @onModuleSelection="selectModule"
        ></ModuleSelection>

        <div class="call-to-action-container">
          <BaseButton
            class="preview-button"
            :status="isMatrixUntouched ? 'disabled' : 'default'"
            @click="toggleSurfacePreview"
          >
            <span>Preview</span>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { WIZARD, CELL } from './../../utils/constants/index';
import { BaseButton } from '@/components/bootstrap';
import PatternSelection from '@/components/form/PatternSelection';
import ColorSelection from '@/components/form/ColorSelection';
import ModuleSelection from '@/components/form/ModuleSelection';
import MatrixDisplay from '@/components/form/MatrixDisplay';

export default {
  name: 'SurfaceComposition',
  components: {
    PatternSelection,
    ColorSelection,
    ModuleSelection,
    MatrixDisplay,
    BaseButton
  },
  computed: {
    ...mapGetters('shapeIt/wizard', [
      'currentSurface',
      'currentPattern',
      'currentModule',
      'currentColor',
      'onPreview'
    ]),
    ...mapGetters('shapeIt/grid', [
      'isMatrixUntouched'
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
      if (this.isMatrixUntouched)
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
    },
    /**
     * Toggle Surface Preview
     */
    toggleSurfacePreview() {
      if (!this.onPreview)
        this.$store.dispatch('shapeIt/wizard/setPreview');
      else
        this.$store.dispatch('shapeIt/wizard/cancelPreview');
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
      display: flex;
      flex-direction: column;
      width: 45%;
      border: 3px solid $lightGrey;
      border-radius: 6px;

      .call-to-action-container {
        display: flex;
        justify-content: center;
        padding: 50px 0;

        .preview-button {
          height: 40px;
          width: 150px;

          span {
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
