<template>
  <div class="the-login-form">
    <form
      class="the-login-form__form"
      @submit="login(email, password)"
    >
      <input v-model="email" type="email" placeholder="Enter your email">
      <input v-model="password" type="password" placeholder="Enter your password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: '',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('authentication/connexion', {
      login: 'login'
    })
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
    
  }
}
</style>
