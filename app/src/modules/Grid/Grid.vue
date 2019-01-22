<template>
  <div class="workbench-grid">
    <grid-layout
      :layout.sync="layout"
      :responsive="true"
      :breakpoints="{ lg: 992, md: 768, sm: 576, xs: 380, xxs: 0 }"
      :cols="{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }"
      :col-num="4"
      :max-row="4"
      :row-height="210"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in layout"
        :min-w="275"
        :is-resizable="false"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i">
        <component :is="item.componentName"/>
      </grid-item>
    </grid-layout>
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
  import { EventBus } from '../../EventBus';

  const moduleName = 'Grid';

  export default {
    name: moduleName,
    components: {
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
      const store = this.$store;
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    },
    data() {
      return {};
    },
    mounted() {
      const vm = this;
    },
    computed: {
      ...mapGetters({
        layout: `${moduleName}/getLayout`,
      }),
    },
    methods: {
      ...mapActions(moduleName, [
        'setGridLayout',
      ]),
    },
  };
</script>

<style scoped
  lang="scss">
</style>
