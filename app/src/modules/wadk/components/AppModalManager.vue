<template>
  <div ref="modal-external-wrapper">
    <!-- Modal Section -->
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import storeModule from '../store/common/index';
  import { EventBus } from '../../../EventBus';

  const componentName = 'AppModalManager';

  export default {
    name: componentName,
    components: {},
    beforeCreate() {

    },
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[componentName])) {
        store.registerModule(componentName, storeModule);
      }

      // Custom event listeners
      EventBus.$on('AppModalManager::registerModal', this.registerModal);
    },
    data() {
      return {
        modals: [],
        htmlRef: '',
      };
    },
    mounted() {

    },
    computed: {
      ...mapGetters({
        localSampleGetterName: `${componentName}/sampleGetter`,
        localSampleGetterWithParamGetterName: `${componentName}/sampleGetterWithParam`,
      }),
    },
    methods: {
      ...mapActions(componentName, [
        'sampleAction',
      ]),
      registerModal(payload) {
        const vm = this;
        // vm.modals.push(payload);
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
