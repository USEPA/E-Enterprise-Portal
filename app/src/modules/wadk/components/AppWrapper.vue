<template>
  <div
    :id="eepApp.id"
    class="app-outer-wrapper">
    <div class="app-window-icon-wrapper container">
      <div class="row justify-content-end">
        <div class="col-sm-10 col-lg-11"></div>
        <!--
          @todo Need to update buttons and methods for AppWrapper
          Maximize, minimize, dropdown menu, etc.
        -->
        <div class="col-sm-2 col-lg-1 text-right">
          <span class="app-window-icon oi oi-fullscreen-enter"></span>
          <span class="app-window-icon oi oi-question-mark"></span>
        </div>
      </div>
    </div>
    <h2>{{ eepApp.title }}</h2>
    <h6 v-show="!!eepApp.source">
        Source: <a :href="eepApp.source.link" target="_blank">{{ eepApp.source.text }}</a>
    </h6>
    <div class="app-inner-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppWrapper',
    data() {
      return {
        title: 'Test Title',
      };
    },
    props: {
      eepApp: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .app-window-icon {
    padding: 0.5em;
  }
</style>
