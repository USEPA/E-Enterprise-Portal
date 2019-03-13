<template>
  <b-modal
    class="eep-app-modal"
    :id="id"
    :hide-footer="hideFooter"
    :ref="modalRef"
    v-on="inputListeners">
    <template
      slot="modal-header">
      <h5
        class="modal-title"
        id="gridModalLabel"
        :style="getIcon">{{ title }}</h5>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        @click="hideModal"
      >
        <span aria-hidden="true">×</span>
      </button>
    </template>
    <div class="">
      <slot/>
    </div>
    <template slot="modal-footer">
      <slot name="footer"/>
    </template>
  </b-modal>
</template>

<script>
  import { EventBus } from '../../../EventBus';

  export default {
    name: 'AppModal',
    props: {
      id: {
        type: String,
        required: true,
      },
      hideFooter: {
        type: Boolean,
        default: () => false,
        required: false,
      },
      modalRef: {
        type: String,
        required: true,
      },
      onShow: {
        type: Function,
        default: () => {
        },
        required: false,
      },
      onHide: {
        type: Function,
        default: () => {
        },
        required: false,
      },
      title: {
        type: String,
        required: true,
      },
      useAppModalManager: {
        type: Boolean,
        default: () => true,
        required: false,
      },
      icon: {
        type: String,
        required: false,
        default: () => '',
      },
    },
    computed: {
      inputListeners() {
        const vm = this;
        // `Object.assign` merges objects together to form a new object
        return Object.assign({},
          // We add all the listeners from the parent
          this.$listeners,
          // Then we can add custom listeners or override the
          // behavior of some listeners.
          {
            // This ensures that the component works with v-model
            change: (event) => {
              vm.$emit('change', event);
            },
            show: (event) => {
              vm.$emit('show', event);
            },
            shown: (event) => {
              vm.$emit('shown', event);
            },
            hide: (event) => {
              vm.$emit('hide', event);
            },
            hidden: (event) => {
              vm.$emit('hidden', event);
            },
            ok: (event) => {
              vm.$emit('ok', event);
            },
            cancel: (event) => {
              vm.$emit('cancel', event);
            },
          },
          // eslint-disable-next-line function-paren-newline
        );
      },
      getIcon() {
        const vm = this;
        let style = '';
        // Using CSS to gracefully fail if the image doesn't exist
        const padding = '1.8rem';
        if (vm.icon) {
          style = `background-image: url('images/${vm.icon}'); padding-left: ${padding};`;
        }
        return style;
      },
    },
    mounted() {
      const vm = this;
      if (vm.useAppModalManager) {
        EventBus.$emit('AppModalManager::registerModal', {
          callee: vm,
          modal: vm.$refs[vm.modalRef],
        });
      }
    },
    methods: {
      hideModal() {
        const vm = this;
        vm.$refs[vm.modalRef].hide();
      },
    },
  };
</script>

<style lang="scss">
  @import '../../../styles/bootstrap-mixins-cheatsheet.scss';

  @include media-breakpoint-up(sm) {
    .modal-dialog {
      max-width: $modal-sm;
    }
  }

  @include media-breakpoint-up(md) {
    .modal-dialog {
      max-width: $modal-md;
    }
  }

  @include media-breakpoint-up(lg) {
    .modal-dialog {
      max-width: $modal-lg;
    }
  }

  @include media-breakpoint-up(xl) {
    .modal-dialog {
      max-width: $modal-xl;
    }
  }

  .modal-title {
    background-repeat: no-repeat;
  }
</style>
