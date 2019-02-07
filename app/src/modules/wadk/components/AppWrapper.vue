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
            <b-dropdown
              id="divider"
              variant="link"
              right
              class="widget-dropdown widget-button"
              no-caret>
              <b-dropdown-item-button>Settings</b-dropdown-item-button>
              <b-dropdown-item-button>Move</b-dropdown-item-button>
              <b-dropdown-divider/>
              <b-dropdown-item-button
                v-for="(text, title) in eepApp.field_settings_menu_items"
                :title="text"
                @click="widgetMenuModalToIndex(title, $event.target)">{{ title }}
              </b-dropdown-item-button>
            </b-dropdown>
            <b-button
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
            class="text-decoration-underline cursor-pointer no-after"
            v-show="!!eepApp.field_settings_menu_items.Description"
            target="_blank"
            @click="onDescription($event.target)">
            Description</a>
          <span v-show="!!eepApp.source && !!eepApp.field_settings_menu_items.Description">
            &#8226;</span>
          <template
            v-show="!!eepApp.source"
            v-for="(source, index) in eepApp.source">
            Source:&nbsp;
            <span :key="index">
              <a
                :href="source.link"
                target="_blank">{{ source.text }}</a>
              <br
                :key="index"
                v-if="eepApp.source.length !== index + 1" >
            </span>
          </template>
        </h6>
      </div>
      <div class="wapp-inner-wrapper">
        <slot/>
      </div>
    </div>
    <AppModal
      :id="`${eepApp.id}-description`"
      modal-ref="widgetMenuModal"
      hide-footer
      :title="`${eepApp.title} Menu`">
      <b-tabs
        v-model="menuModalTabIndex"
        ref="bwi-tabs">
        <b-tab
          title="Description"
          ref="widgetMenuDescription"
          class="py-3"
          :disabled="!eepApp.field_settings_menu_items.Description">
          <b-col>
            {{ eepApp.field_settings_menu_items.Description }}
          </b-col>
        </b-tab>
        <b-tab
          title="Help"
          ref="widgetMenuHelp"
          class="py-3"
          :disabled="!eepApp.field_settings_menu_items.Help">
          <b-col>
            {{ eepApp.field_settings_menu_items.Help }}
          </b-col>
        </b-tab>
        <b-tab
          title="Disclaimer"
          ref="widgetMenuDisclaimer"
          class="py-3"
          :disabled="!eepApp.field_settings_menu_items.Disclaimer">
          <b-col>
            {{ eepApp.field_settings_menu_items.Disclaimer }}
          </b-col>
        </b-tab>
        <b-tab
          title="Contact"
          ref="widgetMenuContact"
          class="py-3"
          :disabled="!eepApp.field_settings_menu_items.Contact">
          <b-col>
            {{ eepApp.field_settings_menu_items.Contact }}
          </b-col>
        </b-tab>
        <b-tab
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
                v-if="eepApp.source.length !== index + 1" >
            </span>
          </template>
        </b-tab>
      </b-tabs>
    </AppModal>
  </div>
</template>

<script>
  /* eslint-disable global-require */

  import AppAxios from '../utils/AppAxios';
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
        vm.$root.$emit('bv::show::modal', `${vm.eepApp.id}-description`, button);
      },
      widgetMenuModalToIndex(title, button) {
        const vm = this;
        switch (title) {
          case 'Description':
            this.menuModalTabIndex = 0;
            break;
          case 'Help':
            this.menuModalTabIndex = 1;
            break;
          case 'Disclaimer':
            this.menuModalTabIndex = 2;
            break;
          case 'Contact':
            this.menuModalTabIndex = 3;
            break;
          case 'Source':
            this.menuModalTabIndex = 4;
            break;
          default:
            this.menuModalTabIndex = 0;
        }
        vm.$root.$emit('bv::show::modal', `${vm.eepApp.id}-description`, button);
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
