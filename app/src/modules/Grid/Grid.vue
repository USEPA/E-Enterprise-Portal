<template>
  <div class="workbench-grid">
    <template v-if="isLayoutReady">
      <grid-layout
        :layout.sync="layout"
        :responsive="true"
        :breakpoints="{ lg: 992, md: 768, sm: 576, xs: 380, xxs: 0 }"
        :cols="{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }"
        :col-num="4"
        :max-row="4"
        :row-height="210"
        :is-draggable="true"
        :is-resizable="false"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="(wapp, index) in layout"
          :min-w="275"
          :is-resizable="false"
          :x="wapp.eepApp.grid.x"
          :y="wapp.eepApp.grid.y"
          :w="wapp.eepApp.grid.w"
          :h="wapp.eepApp.grid.h"
          :i="index"
          :key="index">
          <component
            :is="wapp.componentName"
            :eep-app="wapp.eepApp"/>
        </grid-item>
      </grid-layout>
    </template>
    <template v-if="!isLayoutReady">
      <AppPlaceholderContent/>
    </template>
  </div>
</template>

<script>

  import BeWellInformed from '@/modules/BeWellInformed/BeWellInformed.vue';
  import TrendingAir from '@/modules/TrendingAir/TrendingAir.vue';
  import FavoriteLinks from '@/modules/FavoriteLinks/FavoriteLinks.vue';
  import MyReporting from '@/modules/MyReporting/MyReporting.vue';

  import { mapActions, mapGetters } from 'vuex';
  import { GridLayout, GridItem } from 'vue-grid-layout';
  import { AppPlaceholderContent } from '../wadk/WADK';
  import storeModule from './store/index';
  // import { EventBus } from '../../EventBus';

  const moduleName = 'Grid';

  export default {
    name: moduleName,
    components: {
      AppPlaceholderContent,
      GridLayout,
      GridItem,
      BeWellInformed,
      TrendingAir,
      FavoriteLinks,
      MyReporting,
    },
    beforeCreate() {
    },
    created() {
      const vm = this;
      const store = vm.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
      // filter layout
      vm.initializeLayout();
    },
    data() {
      return {
      };
    },
    mounted() {
      const vm = this;
    },
    computed: {
       ...mapGetters({
        getLayout: `${moduleName}/getLayout`,
        isLayoutReady: `${moduleName}/isLayoutReady`,
      }),
      layout: {
        get() {
          return this.getLayout;
        },
        set(newValue) {
          return this.setGridLayout(newValue);
        },
      },
    },
    methods: {
      ...mapActions(moduleName, [
        'setGridLayout',
        'initializeLayout',
      ]),
    },
  };
</script>

<style scoped
  lang="scss">
</style>
