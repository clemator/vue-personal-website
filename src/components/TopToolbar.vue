<template>
  <div class="top-toolbar">
    <h3
      class="top-toolbar__title"
    >
      Clemator's hideout
    </h3>
    <button
      :if="! isUserLoggedIn"
      @click="login({ email: 'test@toto.com', password: 'Azerty1234'})"
    >
      Login
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TopToolbar',
  computed: {
    ...mapState('authentication', {
      isUserLoggedIn: state => state.isConnected
    })
  },
  methods: {
    ...mapActions('authentication/connexion', {
      login: 'login'
    })
  }
}
</script>

<style lang="scss" scoped>
.top-toolbar {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.5);

  &__title {

  }
}
</style>
