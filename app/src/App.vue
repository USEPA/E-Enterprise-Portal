<template>
  <div
    id="app">
    <MainHeader/>
    <div class="container">
      <div
        id="nav"
        class="region-navigation pb-2 px-3">
        <router-link to="/">Home</router-link>
        <span class="divider">|</span>
        <router-link to="/about">About</router-link>
        <span class="divider">|</span>
        <router-link to="/workbench">Workbench</router-link>
      </div>
      <div
        id="main-content"
        class="no-gutters py-2">
        <router-view/>
      </div>
    </div>
    <MainFooter/>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MainHeader from '@/components/MainHeader.vue';
  import MainFooter from '@/components/MainFooter.vue';
  import VueProgessBar from 'vue-progressbar';
  import types from './store/types';

  export default {
    name: 'App',
    components: {
      MainHeader,
      MainFooter,
      VueProgessBar,
    },
    mounted() {
      //  [App.vue specific] When App.vue is finish loading finish the progress bar
      this.$Progress.finish();
    },
    created() {
      const vm = this;
      vm.$store.commit(types.SET_APP, vm);
      //  [App.vue specific] When App.vue is first loaded start the progress bar
      vm.$Progress.start();
      //  hook the progress bar to start before we move router-view
      vm.$router.beforeEach((to, from, next) => {
        //  does the page we want to go to have a meta.progress object
        if (to.meta.progress !== undefined) {
          const meta = to.meta.progress;
          // parse meta tags
          vm.$Progress.parseMeta(meta);
        }
        //  start the progress bar
        vm.$Progress.start();
        //  continue to next page
        next();
      });
      //  hook the progress bar to finish after we've finished moving router-view
      vm.$router.afterEach(() => {
        //  finish the progress bar
        vm.$Progress.finish();
      });
    },
  };
</script>

<style lang="scss">
  // @TODO - Move no scoped styles to the appropiate sass file

  @import './styles/bootstrap-variable-overrides.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import '../node_modules/open-iconic/font/css/open-iconic-bootstrap.css';
  @import './styles/styles.scss';

  .region-navigation {
    color: #ffffff;
    text-shadow: -1px 0 1px rgba(0,0,0, 0.5);
    background-color: #0071bc;
    // background-color: #007bff;
    height: auto;
    font-size: 1.5rem;

    a {
      @extend small;
      color: #fff;
      text-shadow: none;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .divider {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>
