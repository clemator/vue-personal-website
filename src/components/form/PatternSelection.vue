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
          :class="[val.NAME, {'selected': selectedPattern === val.NAME}]"
          @click="callback(val)"
        >
          <!--<img :src="require(`@/assets/images/${val.NAME}.svg`)" />-->
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
      padding: 50px 80px;
      justify-content: space-between;
      .pattern {
        height: 100px;
        width: 100px;
        box-sizing: border-box;
        padding: 2px;
        cursor: pointer;
        background-color: $light-grey;
      }
      .selected {
        padding: 0;
        border: 2px solid $primary-green;
        border-radius: 4px;
      }
    }
  }
}
</style>