<template>
  <div class="module-selection">
    <div class="module-selection__module-list">
      <div
        :class="['module', { 'selected': selectedModule === val }]"
        v-for="(val, key) in definedModules"
        :key="key"
        @click="$emit('onModuleSelection', val)"
      >
        {{ val }}
      </div>
    </div>
  </div>
</template>

<script>
import { pickBy } from '@/utils/fp';

export default {
  name: 'ModuleSelection',
  props: {
    selectedModule: {
      type: String,
      required: true
    },
    modules: {
      type: Object,
      required: true
    }
  },
  computed: {
    definedModules() {
      return pickBy(val => val !== '', this.modules);
    }
  }
}
</script>

<style lang="scss">
.module-selection {
  &__module-list {
    display: flex;
    padding: 50px 0px;
    justify-content: space-around;

    .module {
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
