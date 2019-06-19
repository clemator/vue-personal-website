<template>
  <div class="the-form-wizard">
    <transition
      v-if="!onPending"
      name="custom-classes-transition"
      :enter-active-class="enterTransitionName"
      :leave-active-class="leaveTransitionName"
    >
      <surface-selection
        key="surface"
        v-if="!isSurfaceSelected"
        :callback="selectSurfaceType"
      ></surface-selection>

      <surface-composition
        key="paint"
        v-if="isSurfaceSelected"
      >
        <div
          @click="resetSurfaceChoice()"
        >
          RETURN
        </div>
      </surface-composition>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SurfaceSelection from '@/components/form/SurfaceSelection';
import SurfaceComposition from '@/components/form/SurfaceComposition';

export default {
  name: 'TheFormWizard',
  components: {
    SurfaceSelection,
    SurfaceComposition
  },
  data () {
    return {
      enterTransitionName: '',
      leaveTransitionName: ''
    }
  },
  computed: {
    ...mapGetters('shapeIt/wizard', [
      'isSurfaceSelected',
      'onPending'
    ])
  },
  methods: {
    selectSurfaceType(type) {
      this.$store.dispatch('shapeIt/wizard/changeSurfaceType', type);
    },
    resetSurfaceChoice() {
      this.$store.dispatch('shapeIt/wizard/resetSurfaceType');
    }
  },
  watch: {
    'isSurfaceSelected' (isIt) {
      this.enterTransitionName = (!isIt) ? 'animated fadeInLeft' : 'animated fadeInRight';
      this.leaveTransitionName = (!isIt) ? 'animated fadeOutRight' : 'animated fadeOutLeft';
    }
  },
  created () {
    this.$store.dispatch('shapeIt/wizard/setCacheData');
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
