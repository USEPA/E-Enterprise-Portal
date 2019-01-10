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
      <div  class="col-10 text-left">
    <h2 v-for="item in title.slice(2,3)" v-if="eepApp.title =='Be Well Informed'">{{item.title[0].value}}</h2>
    <h2 v-for="item in title.slice(1,2)" v-if="eepApp.title =='Trending Air'">{{item.title[0].value}}</h2>
    <h2 v-for="item in title.slice(3,4)" v-if="eepApp.title =='Favorite Links'">{{ item.title[0].value}}</h2>
    <h2 v-for="item in title.slice(0,1)" v-if="eepApp.title =='My Reporting'">{{ item.title[0].value }}</h2>
    <h6 v-show="!!eepApp.source">
      Source: <a
      :href="eepApp.source.link"
      target="_blank">{{ eepApp.source.text }}</a>
    </h6>
      </div>
        <div class="col-2 text-right">
          <div>
            <b-dropdown id="divider" variant="link" right class="widget-dropdown" no-caret>

              <b-dropdown-item-button>Settings</b-dropdown-item-button>
              <b-dropdown-item-button>Move</b-dropdown-item-button>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button>Description</b-dropdown-item-button>
              <b-dropdown-item-button>Source</b-dropdown-item-button>
              <b-dropdown-item-button>Help</b-dropdown-item-button>
              <b-dropdown-item-button>Contact</b-dropdown-item-button>
            </b-dropdown>
          </div>

        </div>
      </div>
    <div class="app-inner-wrapper">
      <slot></slot>
    </div>
  </div>
  </div>
</template>

<script>
  import AppAxios from '../utils/AppAxios.js';

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
    mounted () {
      AppAxios
        .get('https://apidev2.e-enterprise.gov/api/workbenchapps')
        .then(response => (this.title = (response.data)))
    },
  };

</script>

<style>
  .app-window-icon {
    padding: 0.5em;
  }

  .widget-dropdown {
    background-image:url('../images/widget-menu.svg');
    background-repeat:no-repeat;
    background-position:center center;
    background-color:#0071c2;
    width:2.2rem;
    height:2.2rem;
    border-radius:50%;
    background-size: 1.3rem 1.325rem;
  }

  .widget-menu {
    background-color: #0071c2;
    width:2.2rem;
    height:2.2rem;
    border-radius:50%;
  }

  .dropdown .dropdown-menu .dropdown-item {
    color:#fff;
  }

  .dropdown .dropdown-menu {
    background-color: #0071c2;
    border-radius: 10%;
  }
  .dropdown .dropdown-divider {
    margin:0.5rem;
    border-top: 1px dashed #e9ecef;
  }
  .dropdown .dropdown-item:hover, .dropdown .dropdown-item:focus {
    color: #fff;
    text-decoration: none;
    background-color: #0A5B95;
  }
</style>
