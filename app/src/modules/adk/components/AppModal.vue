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
        id="gridModalLabel">{{ title }}</h5>
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
      <slot></slot>
    </div>
    <template slot="modal-footer">
      <slot name="footer"></slot>
    </template>
  </b-modal>
</template>

<script>
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
        default: () => {},
        required: false,
      },
      onHide: {
        type: Function,
        default: () => {},
        required: false,
      },
      title: {
        type: String,
        required: true,
      },
    },
    computed: {
      inputListeners: function () {
        var vm = this
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
        );
      },
    },
    methods: {
      hideModal() {
        this.$refs[this.modalRef].hide();
      },
    },
  };
</script>

<style lang="scss">
  @import '../../../styles/bootstrap-mixins-cheatsheet.scss';

  @include media-breakpoint-up(sm) {
    .modal-dialog { max-width: $modal-sm; }
  }

  @include media-breakpoint-up(md) {
    .modal-dialog { max-width: $modal-md; }
  }

  @include media-breakpoint-up(lg) {
    .modal-dialog { max-width: $modal-lg; }
  }

  @include media-breakpoint-up(xl) {
    .modal-dialog { max-width: $modal-xl; }
  }
</style>
