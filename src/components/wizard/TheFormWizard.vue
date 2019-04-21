<template>
  <div class="the-form-wizard">
    <transition
      name="custom-classes-transition"
      :enter-active-class="enterTransitionName"
      :leave-active-class="leaveTransitionName"
    >
      <surface-selection
        key="surface"
        v-if="!isSurfaceSelected"
        :callback="selectSurfaceType"
      ></surface-selection>
      <div
        key="paint"
        v-if="isSurfaceSelected"
      >
        {{ currentSurface }}
        <div
          @click="returnToFirstStep()"
        >
          RETURN
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SurfaceSelection from './../form/SurfaceSelection';

export default {
  name: 'TheFormWizard',
  components: {
    SurfaceSelection
  },
  data() {
    return {
      enterTransitionName: '',
      leaveTransitionName: ''
    }
  },
  computed: {
    ...mapGetters('shapeIt/wizard', [
      'currentSurface',
      'isSurfaceSelected'
    ])
  },
  methods: {
    selectSurfaceType(type) {
      this.$store.dispatch('shapeIt/wizard/changeSurfaceType', type);
    },
    returnToFirstStep() {
      this.$store.dispatch('shapeIt/wizard/resetSurfaceType');

    }
  },
  watch: {
  'currentSurface' () {
    this.enterTransitionName = (!this.isSurfaceSelected) ? 'animated fadeInLeft' : 'animated fadeInRight';
    this.leaveTransitionName = (!this.isSurfaceSelected) ? 'animated fadeOutRight' : 'animated fadeOutLeft';
  }
}
};
</script>

<style lang="scss">
.the-form-wizard {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  &>* {
    position: absolute;
    width: 100%;
  }
}
</style>
