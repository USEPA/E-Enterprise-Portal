<template>
  <div
    :id="eepApp.id"
    :class="`wapp app-outer-wrapper wapp-${getSize}`">
    <div class="app-window-icon-wrapper container px-2">
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
              <b-dropdown-item-button>Description</b-dropdown-item-button>
              <b-dropdown-item-button>Source</b-dropdown-item-button>
              <b-dropdown-item-button>Help</b-dropdown-item-button>
              <b-dropdown-item-button>Contact</b-dropdown-item-button>
            </b-dropdown>
            <b-button
              v-if='eepApp.isExpandable'
              class="widget-expand widget-button"
              @click="maximizeWidget()"/>
          </div>
          <h2
            class="wapp-title"
            :style="getIcon">{{ getTitle }}</h2>
        </div>
      </div>
      <div class="w-100 source-wrapper">
        <h6
          class="small"
          v-show="!!eepApp.source" >
          Source:&nbsp;
          <template
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
        </h6>
      </div>
      <div class="app-inner-wrapper">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable global-require */

  import AppAxios from '../utils/AppAxios';

  export default {
    name: 'AppWrapper',
    data() {
      return {
        title: '',
        value: '',
      };
    },
    props: {
      eepApp: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      AppAxios
        .get('https://apidev2.e-enterprise.gov/api/workbenchapps')
        .then((response) => {
          this.title = (response.data);
        });
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
        if (vm.eepApp.iconName) {
          style = `background-image: url('images/${vm.eepApp.iconName}'); padding-left: ${padding};`;
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
        if (vm.eepApp.grid.h > 1) {
          size = 'large';

          // If the grid is not 'tall' but wide, it is medium
        } else if (vm.eepApp.grid.w > 1) {
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
