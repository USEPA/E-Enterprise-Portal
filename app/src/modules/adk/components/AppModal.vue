<template>
  <b-modal
    class="eep-app-modal"
    :id="id"
    :ref="modalRef">
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
    <div class="container-fluid">
      <slot></slot>
    </div>
    <template slot="modal-footer"></template>
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
