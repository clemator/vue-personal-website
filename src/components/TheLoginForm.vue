<template>
  <div
    class="the-login-form"
  >
    <form
      class="the-login-form__form"
      v-bind:class="{'form-pending': onPending, 'form-error': error}"
      @submit.prevent="login(email, password)"
    >
      <input
        class="base-input"
        v-model="email"
        type="email"
        placeholder="Enter your email"
      >

      <input
        class="base-input"
        v-model="password"
        type="password"
        placeholder="Enter your password"
      >

      <button
        type="submit"
      >
        Login
      </button>

      <div
        class="error-block"
      >
        <div
          v-if="error"
          class="error-text"
        >
          {{ error }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: '',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState('authentication/connexion', {
      error: state => state.error,
      onPending: state => state.onPending
    })
  },
  methods: {
    login(email, password) {
      this.$store.dispatch('authentication/connexion/login', { email, password })
        .then(() => {
          console.log('CONNECTED')
        })
    }
  }
}
</script>

<style lang="scss">
.the-login-form {
  height: calc(100% - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  &__form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    height: 100%;
    min-height: 200px;
    max-height: 500px;

    .error-block {
      height: 20px;
      .error-text {
        line-height: 20px;
        color: red;
      }
    }
  }
}
</style>
