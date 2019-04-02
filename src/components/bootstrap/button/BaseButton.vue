<template>
  <button
    :class="{
      'base-button--primary': variant === 'primary',
      'base-button--disabled': status === 'disabled',
      'base-button--waiting': status === 'waiting',
    }"
    :disabled="status === 'disabled'"
    :type="type"
    class="base-button"
    v-on="onEvent()"
  >
    <base-spinner
      v-if="status === 'waiting'"
      size="15px"
      color="#FAFAFA"
    />
    <slot v-else />
  </button>
</template>

<script>
import BaseSpinner from './../effect/BaseSpinner';

export default {
  name: 'BaseButton',
  components: {
    BaseSpinner
  },
  props: {
    status: {
      type: String,
      required: false,
      default: 'default'
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    variant: {
      type: String,
      required: false,
      default: 'primary'
    }
  },
  methods: {
    onEvent() {
      return {
        ...this.$listeners,
        click: this.onClick
      }
    },
    onClick() {
      if (!this.status === 'disabled')
        return this.$emit('click')
    }
  }
}  
</script>

<style lang="scss">

</style>