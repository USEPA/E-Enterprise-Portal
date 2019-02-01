<template>
  <div class="workbench">
    <!-- @TODO - Dynamically load workbench apps -->
    <Grid v-if="!modalOpen"/>
<!--
    <BeWellInformed v-if="modalOpen"/>
-->
  </div>
</template>

<script>
  // @ is an alias to /src
  import Grid from '@/modules/Grid/Grid.vue';
  import { AppWrapper, AppModal, AppPlaceholderContent } from '../modules/wadk/WADK';
  import BeWellInformed from '@/modules/BeWellInformed/BeWellInformed.vue';
  import { EventBus } from '../EventBus';

  export default {
    name: 'Workbench',
    components: {
      Grid,
      AppWrapper,
      AppModal,
      AppPlaceholderContent,
      BeWellInformed,
    },
    data() {
      return {
        modalOpen: false,
      };
    },
    methods: {
      manageModalOpen() {
        this.modalOpen = true;
      },
      manageModalClose() {
        this.modalOpen = false;
      },
    },
    created() {
      // Custom event listeners
      EventBus.$on('grid::modalOpen', this.manageModalOpen);
      EventBus.$on('grid::modalClose', this.manageModalClose);
    },
  };
</script>
