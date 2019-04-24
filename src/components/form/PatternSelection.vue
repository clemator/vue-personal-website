<template>
  <div class="pattern-selection">
    <svg height="0" width="0">
      <defs>
        <clipPath id="svgTextPath">
          <path fill="#FFFFFF" stroke="#000000" stroke-width="1.5794" d="m 13.22904,270.56726 a 13.204147,13.204261 0 0 0 -13.20416107,13.20428 13.204147,13.204261 0 0 0 9.5708e-4,0.0261 13.204147,13.204261 0 0 1 13.17736399,13.17693 13.204147,13.204261 0 0 0 0.02585,10e-4 13.204147,13.204261 0 0 0 0.02625,-10e-4 13.204147,13.204261 0 0 1 13.176954,-13.17707 13.204147,13.204261 0 0 0 9.59e-4,-0.0258 13.204147,13.204261 0 0 0 -13.204163,-13.20428 z"/>
        </clipPath>
      </defs>
    </svg>
    <div
      class="pattern-selection__container"
    >
      <div
        class="pattern-selection__container__patterns-list"
      >
        <div
          v-for="(val, key) in definedPatterns"
          :key="key"
          class="pattern"
          :class="val.NAME"
        >
          &nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pickBy } from './../../utils/fp';

export default {
  name: 'PatternSelection',
  props: {
    callback: {
      type: Function,
      required: true
    },
    selectedPattern: {
      type: String,
      required: true
    },
    patterns: {
      type: Object,
      required: true
    }
  },
  computed: {
    definedPatterns () {
      return pickBy(val => val.NAME !== '', this.patterns);
    }
  }
}
</script>

<style lang="scss">
.pattern-selection {
  &__container {
    &__patterns-list {
      display: flex;
      padding: 50px 80px;
      justify-content: space-between;
      .pattern {
        height: 100px;
        width: 100px;
        cursor: pointer;
        background-color: red;
        &.diamond {
          clip-path: $diamond-pattern;
        }
        &.hexagon {
          clip-path: $hexagon-pattern;
        }
        &.rubis {
          clip-path: $rubis-pattern;
        }
        &.crescent {
          clip-path: url(#svgTextPath);
        }
      }
    }
  }
}
</style>