<template>
  <div class="pattern-selection">
    <div class="pattern-selection__patterns-list">
      <div
        :class="['pattern', val.NAME, { 'selected': selectedPattern === val.NAME }]"
        v-for="(val, key) in definedPatterns"
        :key="key"
        @click="$emit('onPatternSelection', val)"
      >
        <!--<img :src="require(`@/assets/images/${val.NAME}.svg`)" />-->
        {{ val.NAME }}
      </div>
    </div>
  </div>
</template>

<script>
import { pickBy } from '@/utils/fp';

export default {
  name: 'PatternSelection',
  props: {
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
  &__patterns-list {
    display: flex;
    padding: 50px 0px;
    justify-content: space-around;

    .pattern {
      height: 100px;
      width: 100px;
      box-sizing: border-box;
      padding: 2px;
      cursor: pointer;
      background-color: $lightGrey;
    }

    .selected {
      padding: 0;
      border: 2px solid $primaryGreen;
      border-radius: 4px;
    }
  }
}
</style>