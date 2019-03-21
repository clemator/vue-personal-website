<template>
  <button
    :class="['button', className]"
    @click="callback"
  >
    <base-ripple>
      <slot :myData="data">
        <p>{{ label }}</p>
      </slot>
    </base-ripple>
  </button>
</template>

<style lang="scss">
.button {
  border-color: transparent;

  &.submit {
    width: 100%;
    background-color: $primary-sun-bright;
    border-radius: 6px;

    p {
      font-size: $heading-small;
      color: $font-white;
    }
  }

  &.text {
    width: 100%;
    background-color: $primary-white;

    p {
      color: $gray-dark;
    }
  }

  &.icon {
    background-color: transparent;
    padding-right: 5px;
  }

  &:hover {
    cursor: pointer;
  }

  div {
    width: 100%;
  }

  p {
    padding: space-x(1) space-x(2);
    width: 100%;
  }
}
</style>

<script>
export default {
  name: 'BaseButton',
  data() {
    return {
      data: {
        value: true,
        label: 'test data'
      }
    }
  },
  props: {
    className: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: false,
      default: () => {}
    }
  }
}
</script>
