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
        >
          {{ val.NAME }}
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
      margin: 0 50px;
      justify-content: space-between;
    }
  }
}
</style>