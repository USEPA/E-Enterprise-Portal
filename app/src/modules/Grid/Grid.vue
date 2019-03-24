<template>
  <div class="workbench-grid">
    <template v-if="isLayoutReady">
      <grid-layout
        ref="gridRoot"
        :layout.sync="layout"
        :responsive="true"
        :breakpoints="{ lg: 992, md: 768, sm: 576, xs: 380, xxs: 0 }"
        :cols="{ lg: 4, md: 2, sm: 2, xs: 1, xxs: 1 }"
        :col-num="4"
        :max-row="4"
        :row-height="210"
        :is-draggable="true"
        :is-resizable="false"
        :is-mirrored="false"
        :vertical-compact="false"
        :margin="[10, 10]"
        :use-css-transforms="true"
        @layout-ready="layoutReadyEvent"
      >
        <grid-item
          v-for="(wapp, index) in layout"
          :drag-ignore-from="`.wapp-inner-wrapper`"
          :is-resizable="false"
          :ref="wapp.eepApp.id"
          :id="wapp.eepApp.id"
          :direct-link="wapp.eepApp.field_direct_links.join(' ')"
          :x="wapp.x"
          :y="wapp.y"
          :w="wapp.w"
          :h="wapp.h"
          :i="wapp.i"
          :key="index">
          <!-- @TODO Modal Manager Component -->
          <component
            :is="wapp.eepApp.field_vue_component_name"
            :eep-app="wapp.eepApp"/>
        </grid-item>
      </grid-layout>
    </template>
    <template v-if="!isLayoutReady">
      <AppPlaceholderContent>
        <div class="row">
          <div class="col-lg-3 col-6 square pulse"/>
          <div class="col-lg-3 col-6 square pulse"/>
          <div class="col-lg-3 col-6 square pulse"/>
          <div class="col-lg-3 col-6 square pulse"/>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="row">
              <div class="col-12 rectangle pulse"/>
              <div class="col-12 rectangle pulse"/>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-12 square pulse"/>
            </div>
          </div>
        </div>
      </AppPlaceholderContent>
    </template>
    <AppModalManager/>
  </div>
</template>

<script>

  import BeWellInformed from '@/modules/BeWellInformed/BeWellInformed.vue';
  import TrendingAir from '@/modules/TrendingAir/TrendingAir.vue';
  import FavoriteLinks from '@/modules/FavoriteLinks/FavoriteLinks.vue';
  import MyReporting from '@/modules/MyReporting/MyReporting.vue';
  import MyCertifications from '@/modules/MyCertifications/MyCertifications.vue';
  import PermitLookup from '@/modules/PermitLookup/PermitLookup.vue';

  import { mapActions, mapGetters } from 'vuex';
  import GridLayout from './vue-grid-layout/components/GridLayout.vue';
  import GridItem from './vue-grid-layout/components/GridItem.vue';
  import { AppPlaceholderContent, AppModalManager } from '../wadk/WADK';
  import storeModule from './store/index';
  import { EventBus } from '../../EventBus';

  const moduleName = 'Grid';

  export default {
    name: moduleName,
    components: {
      AppPlaceholderContent,
      AppModalManager,
      GridLayout,
      GridItem,
      BeWellInformed,
      TrendingAir,
      FavoriteLinks,
      MyReporting,
      MyCertifications,
      PermitLookup,
    },
    beforeCreate() {
      const vm = this;
      const store = vm.$store;
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
      return {};
    },
    updated() {
      const vm = this;
      const gridRef = vm.$refs.gridRoot;
    },
    computed: {
      ...mapGetters({
        getDeepLink: 'getDeepLink',
        directLinksMappings: 'getDirectLinksMappings',
        getLayout: `${moduleName}/getLayout`,
        isLayoutReady: `${moduleName}/isLayoutReady`,
      }),
      deepLink: {
        get() {
          return this.getDeepLink;
        },
        set(newValue) {
          return this.setDeepLink(newValue);
        },
      },
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
      ...mapActions([
        'setDeepLink',
      ]),
      ...mapActions(moduleName, [
        'autoPositionWapps',
        'initializeLayout',
        'setGridLayout',
        'sortWappBySizes',
        'validateWappPositions',
      ]),
      /**
       * things to do once the grid is ready for us to work with.
       * @param newLayout
       */
      layoutReadyEvent(newLayout) {
        const vm = this;
        // Check for the layout to be ready and that we actually need to resolve a deep link
        if (vm.isLayoutReady && !vm.deepLink.isResolved && vm.deepLink.params.link) {
          vm.deepLink.isResolved = true;

          // CSS transitions on the grid items are pretty but take an additional 200ms to perform
          // this causes the positioning to not be static enough to get accurate positions so we
          // wait just a bit longer to get them.
          setTimeout(() => {
            /*
             * The position of the wapps is impossible for the scrollTo function to find because of
             * the abosolute positioning. We capture the position inside of the grid and pass it as
             * an additional offset so we get an accurate scroll position.
             */
            // position of the grid layout
            const gridRect = vm.$refs.gridRoot.$el.getBoundingClientRect();
            // Get the id of the wapp using the direct link mappings
            const wappId = vm.$store.getters['Grid/getDirectLinksMappings'](vm.deepLink.params.link);
            // position of the wapp inside the grid
            const wappRect = vm.$refs[wappId][0].$el.getBoundingClientRect();
            // Calculate the offset
            const offset = wappRect.top - gridRect.top;
            vm.$scrollTo(`#${wappId}`, 1000, { container: 'body', offset });
          }, 250);
        }
      },
    },
  };
</script>

<style scoped
  lang="scss">
</style>
