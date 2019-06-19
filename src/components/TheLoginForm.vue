<template>
  <div
    class="the-login-form"
  >
    <form
      class="the-login-form__form"
      :class="{'the-login-form__form--pending': onPending, 'the-login-form__form--error': error}"
      @submit.prevent="login(email, password)"
    >
      <div
        class="input-container"
      >
        <div
          class="input-label"
        >
          Email
        </div>
        <input
          v-autofocus
          class="base-input"
          v-model="email"
          type="email"
        >
      </div>

      <div
        class="input-container"
      >
        <div
          class="input-label"
        >
          Password
        </div>
        <input
          class="base-input"
          v-model="password"
          type="password"
        >
      </div>

      <div
        class="form-call-to-action"
      >

        <BaseButton
          class="submit-button"
          type="submit"
          variant="primary"
          :status="onPending ? 'waiting' : 'default'"
        >
          Login
        </BaseButton>

        <div
          class="error-block"
        >
          <transition
            :duration="errorAnimationDuration"
            name="custom-classes-transition"
            enter-active-class="animated fadeInDown"
          >
            <div
              v-if="error"
              class="error-text"
            >
              {{ error }}
            </div>
          </transition>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { BaseButton } from '@/components/bootstrap';

export default {
  name: '',
  components: {
    BaseButton
  },
  data() {
    return {
      email: '',
      password: '',
      errorAnimationDuration: 500
    };
  },
  computed: {
    ...mapState('authentication/connexion', {
      error: state => state.error,
      onPending: state => state.onPending
    })
  },
  methods: {
    login(email, password) {
      this.resetFormError();

      if (!this.email || !this.password)
        return;

      this.$store.dispatch('authentication/connexion/login', { email, password })
        .then(() => {
          if (!this.error)
            return this.$router.push(this.$route.query.redirect || '/user');
        })
    },
    resetFormError() {
      this.$store.dispatch('authentication/connexion/resetError');
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
    padding: 20px;
    height: 100%;
    max-height: 250px;
    width: 300px;
    background-color: #FAFAFA;
    border-radius: 6px;
    box-shadow: 0 4px 36px 0 rgba(197,197,197,0.7);

    .input-container {
      width: 100%;
      .input-label {
        font-weight: bold;
      }
      .base-input {
        width: 100%;
        box-sizing: border-box;
        padding: 0 0 0 10px;
        height: 32px;
        border-radius: 5px;
        border: 1px solid #DADADA;
        outline: none;

        &:focus {
          padding: 0 0 0 9px;
          border: 2px solid #67CFFF;
        }

        &.input-error {
          border: 1px solid red;
        }

        &[type="password"] {
          font-size: 18px;
          letter-spacing: 5px;
        }
      }
    }

    .form-call-to-action {
      .submit-button {
        width: 100%;
      }
      .error-block {
        height: 20px;
        .error-text {
          font-size: 12px;
          line-height: 20px;
          color: red;
        }
      }  
    }

    &--error {
      .input-container {
        .base-input {
          border-color: red;
        }
      }
    }
  }
}
</style>
