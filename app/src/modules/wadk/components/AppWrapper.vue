<template>
  <div
    :id="eepApp.id"
    :class="`wapp app-outer-wrapper wapp-${getSize}`">
    <div class="container px-2">
      <div class="justify-content-end">
        <!--
          @todo Need to update buttons and methods for AppWrapper
          Maximize, minimize, dropdown menu, etc.
          background-image:url('../images/widget-expand.svg');
        -->
        <div class="text-left">
          <div class="float-right px-0 text-right">
            <label
              for="divider"
              class="sr-only">{{ getTitle }} Menu</label>
            <b-dropdown
              :title="`${eepApp.title} Menu`"
              id="divider"
              role="button"
              tabindex="0"
              variant="link"
              right
              class="widget-dropdown widget-button"
              no-caret>
              <b-dropdown-item-button
                v-for="(text,title, index) in eepApp.field_settings_menu_items"
                :title="title"
                @click="widgetMenuModalToIndex(title, $event.target, index)">{{ title }}
              </b-dropdown-item-button>
              <b-dropdown-item-button
                v-if="eepApp.source.length > 0"
                title="Source"
                @click="onSource">
                Source
              </b-dropdown-item-button>
            </b-dropdown>
            <label
              for="expander"
              class="sr-only">Expand {{ getTitle }}</label>
            <b-button
              :title="`Expand ${eepApp.title}`"
              id="expander"
              v-if='eepApp.field_is_expandable'
              class="widget-expand widget-button"
              @click="maximizeWidget()"/>
          </div>
          <h2
            class="wapp-title"
            :style="getIcon">{{ getTitle }}</h2>
        </div>
      </div>
      <div class="w-100 source-description-wrapper">
        <h6 class="small">
          <a
            class="text-decoration-underline cursor-pointer link-button"
            v-show="!!eepApp.field_settings_menu_items.Description"
            @click="onDescription($event.target)">
            Description</a>
          <span v-show="!!eepApp.source && !!eepApp.field_settings_menu_items.Description">
            &#8226;&nbsp;</span>
          <a
            v-if="eepApp.source.length > 0"
            class="text-decoration-underline cursor-pointer link-button"
            v-show="!!eepApp.source && getSize === 'small'"
            @click="onSource($event.target)">Source</a>
          <span v-if="getSize !== 'small' && eepApp.source.length > 0">Source: </span>
          <template
            v-show="!!eepApp.source"
            v-for="(source, index) in eepApp.source">
            <span
              v-if="getSize !== 'small'"
              :key="index">
              <a
                :title="source.text"
                :href="source.link"
                target="_blank">{{ source.text }}</a>
              <br
                :key="index"
                v-if="eepApp.source.length !== index + 1">
            </span>
          </template>
        </h6>
      </div>
      <div class="wapp-inner-wrapper">
        <slot/>
      </div>
    </div>
    <AppModal
      :id="`${eepApp.id}-widget-modal`"
      modal-ref="widgetMenuModal"
      hide-footer
      :title="`${eepApp.title} Menu`">
      <b-tabs
        v-model="menuModalTabIndex"
        ref="widget-menu-tabs">
        <b-tab
          :title="title"
          ref="widgetMenuItems"
          class="py-3"
          v-for="(text, title) in eepApp.field_settings_menu_items">
          <div v-html="text"/>
        </b-tab>
        <b-tab
          v-if="eepApp.source.length > 0"
          title="Source"
          ref="widgetMenuSource"
          class="py-3"
          :disabled="!eepApp.source">
          <template
            v-show="!!eepApp.source"
            v-for="(source, index) in eepApp.source">
            <span :key="index">
              <a
                :href="source.link"
                target="_blank">{{ source.text }}</a>
              <br
                :key="index"
                v-if="eepApp.source.length !== index + 1">
            </span>
          </template>
        </b-tab>
      </b-tabs>
    </AppModal>
  </div>
</template>

<script>
  import AppModal from './AppModal.vue';

  export default {
    name: 'AppWrapper',
    components: {
      AppModal,
    },
    data() {
      return {
        menuModalTabIndex: 0,
      };
    },
    props: {
      eepApp: {
        type: Object,
        required: true,
      },
    },
    computed: {
      getIcon() {
        const vm = this;
        const size = vm.getSize;
        let style = '';
        // Using CSS to gracefully fail if the image doesn't exist
        let padding = '1.8rem';
        if (size !== 'small') {
          padding = '1.8rem';
        }
        if (vm.eepApp.field_icon_name) {
          style = `background-image: url('images/${vm.eepApp.field_icon_name}'); padding-left: ${padding};`;
        }
        return style;
      },
      /**
       * Returns the title truncated to the appropriated size
       */
      getTitle() {
        const vm = this;
        const size = vm.getSize;
        let maxLength = 20;
        if (size !== 'small') {
          maxLength = 50;
        }
        return vm.eepApp.title.slice(0, maxLength);
      },
      /**
       * This returns the readable size of the grid: small, medium, or large
       * @returns {string}
       */
      getSize() {
        const vm = this;
        let size = 'small';
        // If the grid is 'tall', it is large
        if (vm.eepApp.field_grid.height > 1) {
          size = 'large';

          // If the grid is not 'tall' but wide, it is medium
        } else if (vm.eepApp.field_grid.width > 1) {
          size = 'medium';
        }
        return size;
      },
    },
    methods: {
      maximizeWidget() {
        // eslint-disable-next-line no-console
        console.log('hi');
      },
      onDescription(button) {
        const vm = this;
        const keys = Object.keys(this.eepApp.field_settings_menu_items);
        vm.menuModalTabIndex = keys.indexOf('Description');
        vm.$root.$emit('bv::show::modal', `${vm.eepApp.id}-widget-modal`, button);
      },
      onSource(button) {
        const vm = this;
        const keys = Object.keys(this.eepApp.field_settings_menu_items);
        vm.menuModalTabIndex = keys.length;
        vm.$root.$emit('bv::show::modal', `${vm.eepApp.id}-widget-modal`, button);
      },
      widgetMenuModalToIndex(title, button, index) {
        const vm = this;
        vm.menuModalTabIndex = index;
        vm.$root.$emit('bv::show::modal', `${vm.eepApp.id}-widget-modal`, button);
      },
    },
  };

</script>

<style
  lang="scss"
  scoped>
  @import '../styles/bootstrap-widget-dropdown.scss';
  .app-window-icon {
    padding: 0.5em;
  }
  .widget-dropdown {
    background-image: url('../images/widget-menu.svg');
  }
  .widget-expand {
    background-image: url('../images/widget-expand.svg');
  }
  .widget-button {
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #0071c2;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    background-size: 0.9rem 0.9rem;
    padding: 0;
    display: inline-block;
    margin-right: 0.2rem;

    &:last-child {
      margin-right: 0;
    }
  }
</style>
