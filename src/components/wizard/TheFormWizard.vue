<template>
  <div class="the-form-wizard">
    <surface-selection
      v-if="currentStep === wizard.STEPS.FIRST && currentSurface === wizard.SURFACES.NONE"
    ></surface-selection>
    <div
      v-if="currentStep === wizard.STEPS.SECOND"
    >
      SURFACE CHOSEN
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { WIZARD } from './../../utils/constants/index';
import SurfaceSelection from './../form/SurfaceSelection';

export default {
  name: 'TheFormWizard',
  components: {
    SurfaceSelection
  },
  computed: {
    ...mapGetters('shapeIt/wizard', [
      'currentStep',
      'currentSurface'
    ]),
    wizard() {
      return WIZARD;
    }
  }
};
</script>

<style lang="scss">
.the-form-wizard {

}
</style>
