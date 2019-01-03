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
    <h2 v-for="item in title.slice(1,2)" v-if="eepApp.title =='Be Well Informed'">{{item.title[0].value}}</h2>
    <h2 v-for="item in title.slice(2,3)" v-if="eepApp.title =='Trending Air'">{{item.title[0].value}}</h2>
    <h2 v-for="item in title.slice(0,1)" v-if="eepApp.title =='Favorite Links'">{{ item.title[0].value}}</h2>
    <h2 v-for="item in title.slice(3,4)" v-if="eepApp.title =='My Reporting'">{{ item.title[0].value }}</h2>
    <h6 v-show="!!eepApp.source">
      Source: <a
      :href="eepApp.source.link"
      target="_blank">{{ eepApp.source.text }}</a>
    </h6>
    <div class="app-inner-wrapper">
      <slot></slot>
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
        .get('http://e-enterprise/api/workbenchapps')
        .then(response => (this.title = (response.data)))
    },
  };

</script>

<style scoped>
  .app-window-icon {
    padding: 0.5em;
  }
</style>
