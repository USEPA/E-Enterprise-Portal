<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h5>Legend:</h5>
      </div>
    </div>
    <div class="row border border-info">
      <div
        v-for="(result, key, index) in keys"
        :key="key"
        class="col-sm-6">
        <div class="row py-1">
          <div class="col-3">
            <img
              class="key-image-icon"
              :src="require(`../images/${key}.png`)"
              :alt="key">
          </div>
          <div class="col-9">
            <span
              class="key-label"
              v-html="result._cdata"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ResultLegend',
    props: {
      keys: {
        type: Object,
        required: false,
        default() {
          return {};
        },
      },
    },
  };
</script>
<style scoped
  lang="scss">
  @import '../../../styles/bootstrap-variable-overrides.scss';
  .key-image-icon {
    $ratio: 1.5rem;
    width: $ratio;
    height: $ratio
  }
</style>
