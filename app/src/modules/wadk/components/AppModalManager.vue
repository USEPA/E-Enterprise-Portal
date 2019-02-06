<template>
  <div ref="modal-external-wrapper">
    <!-- Modal Section -->
  </div>
</template>

<script>
  import { EventBus } from '../../../EventBus';

  const componentName = 'AppModalManager';

  export default {
    name: componentName,
    created() {
      // Custom event listeners
      EventBus.$on('AppModalManager::registerModal', this.registerModal);
    },
    data() {
      return {
      };
    },
    methods: {
      registerModal(payload) {
        const vm = this;
        // physically move the node in a smart way
        payload.modal.$el.parentNode.removeChild(payload.modal.$el);
        vm.$el.appendChild(payload.modal.$el);
      },
    },
  };
</script>

<style
  lang="scss"
  scoped>

</style>
