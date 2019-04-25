<template>
  <div class="pattern-selection">
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
          <img :src="require(`@/assets/images/${val.NAME}.svg`)" />
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
        background-color: $light-grey;
      }
    }
  }
}
</style>