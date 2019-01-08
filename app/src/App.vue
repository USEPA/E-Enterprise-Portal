<template>
  <div
    id="app">
    <div
      class="environment-status bg-warning text-white"
      v-if="(ENV !='PROD')">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center text-white">
            <span class="is-strong">{{ environmentName }} :</span>
            <span>
              Welcome to the E-Enterprise {{ environmentName }} Environment
              .</span>
            <br>
            <span>
              This is a non-production demonstration environment and is not to be used for
              any regulatory activity.
            </span>
          </div>
        </div>
      </div>
    </div>
    <MainHeader/>
    <div
      id="nav"
      class="region-navigation pb-2 px-3" v-bind:style="navMargin">

      <div
        id="main-navigation-container"
        class="container">
        <div class="row">
          <div
            id="page-selection-wrapper"
            class="col-md-5 mt-1">
            <router-link to="/">Home</router-link>
            <span class="divider">|</span>
            <router-link to="/about">About</router-link>
            <span class="divider">|</span>
            <router-link to="/workbench">Workbench</router-link>
          </div>
          <LocationSearch/>
        </div>

      </div>
    </div>
    <div class="container">
      <div
        id="main-content"
        class="no-gutters py-2">
        <router-view/>
      </div>
    </div>
    <MainFooter/>
    <!-- set progressbar -->
    <vue-progress-bar/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapGetters, mapActions } from 'vuex';
  import MainHeader from '@/components/MainHeader.vue';
  import MainFooter from '@/components/MainFooter.vue';
  import LocationSearch from '@/components/LocationSearch.vue';
  import VueProgessBar from 'vue-progressbar';
  import types from './store/types';

  export default {
    name: 'App',
    components: {
      MainHeader,
      MainFooter,
      VueProgessBar,
      LocationSearch,
    },
    beforeMount(){
      // Declare the main url that the page is currently on
      const main_url = window.location.href;
//      const cookie = this.$cookie.get("userLoggedIn");

      // Declare the store
      const vm = this;
      const store = vm.$store;

      if (main_url.indexOf("data") > -1 && main_url.indexOf("token") > -1) {

        // Declare variables
        var vars = {};

        // Extracts the URL params
        // Got this functionality from https://html-online.com/articles/get-url-parameters-javascript/
        var parts = main_url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });

        // find the URL params for each one
        const data = vars["data"];
        const token = vars["token"];

        // Have to do it this way for cross browser method: https://scotch.io/tutorials/how-to-encode-and-decode-strings-with-base64-in-javascript
        let username = atob(decodeURIComponent(data).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''));

        // Save username to store and put in the cookie
        this.$cookie.set('loggedInUserName', username, {expires: '20m'});
        store.commit(types.SET_USERNAME, username);

        // Set another cookie saying they logged in
        this.$cookie.set('userLoggedIn', true, {expires: '20m'});

        // Log user in
        store.commit('USER_LOG_IN');
      }else{
        if(this.$cookie.get('userLoggedIn')){
            // Log user in and set user name
            store.commit('USER_LOG_IN');
            store.commit(types.SET_USERNAME, this.$cookie.get('loggedInUserName'));
        }
      }
      
      // Redirect to the workbench
      this.$router.push("/workbench");

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

//      // Add event listener for the window load
//      window.addEventListener('load', function () {
//        var cookie = vm.$cookie.get('userLoggedIn');
//        if (cookie) {
//          vm.$cookie.set('userLoggedIn', true, {expires: '20m'});
//          vm.$store.commit('USER_LOG_IN');
//        }
//      }, false);
//
//      // Add event listener for the window refresh
//      window.addEventListener('beforeunload', function () {
//        this.$cookie.set('userLoggedIn', false, {expires: '-99s'});
//        vm.$store.commit('USER_LOG_OUT');
//      }, false);

      //  hook the progress bar to start before we move router-view
      vm.$router.beforeEach((
        to, from, next,
      ) => {
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
    computed: {
      ...mapGetters({
        ENV: 'getEnvironment',
        navMargin: 'getnavMargin',
      }),
      // @todo clean up variable names here
      environmentName() {
        let env = 'LOCAL';
        const { host } = window.location;
        let m;

        const regex = {
          LOCAL: /(localhost|local|^e-enterprise$)/gm,
          DEV: /dev\d?\.e-enterprise/gm,
          TEST: /test\d?\.e-enterprise/gm,
          PROD: /^e-enterprise\.gov/gm,
        };

        Object.keys(regex).forEach((envName) => {
          // eslint-disable-next-line no-cond-assign
          while ((m = regex[envName].exec(host)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.length) {
              env = envName;
            }
          }
        });

        let r = 'Local';
        r = (env === 'DEV') ? 'Development' : r;
        r = (env === 'TEST') ? 'Test' : r;
        return r;
      },
    },
    methods: {

    },
  };

</script>

<style lang="scss">
  /*// @TODO - Move non scoped styles to the appropiate sass file*/
  @import './styles/bootstrap-variable-overrides.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  @import '~@fortawesome/fontawesome-free/scss/fontawesome.scss';
  @import './styles/styles.scss';

  .region-navigation {
    color: #fff;
    text-shadow: -1px 0 1px rgba(0, 0, 0, 0.5);
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

  .environment-status {
    &:hover {
      opacity: 1.0;
    }
  }

  // General slider media queries
  @include media-breakpoint-up(sm) {
    .enviroment-status {
      width: 1.0rem;

      span {
        font-size: .7rem;
        height: 1.5rem;
      }
    }
  }

  @include media-breakpoint-up(md) {
    .enviroment-status {
      width: 1.5rem;
      span {
        font-size: 1.0rem;
      }
    }
  }

  #nav{
    margin-top: 20px !important;
  }
</style>
