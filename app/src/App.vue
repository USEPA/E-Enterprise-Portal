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
      console.log(window.location.href);
      const main_url = window.location.href;
      if (main_url.indexOf("data") > -1 && main_url.indexOf("token") > -1) {
        // Declare the store
        // Put inside the if statement for performance reasons
        const vm = this;
        const store = vm.$store;
        var vars = {};


        // Got this function from https://html-online.com/articles/get-url-parameters-javascript/

        var parts = main_url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
          vars[key] = value;
        });

        // find the URL params
        const data = vars["data"];
        const token = vars["token"];

        // Have to do it this way for cross browser method: https://scotch.io/tutorials/how-to-encode-and-decode-strings-with-base64-in-javascript
        var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/++[++^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

        const username = Base64.decode(data);

        store.commit(types.SET_USERNAME, username.split("_")[0]);
      }
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
      // Initialize token
      vm.initializeToken();

    },
    computed: {
      ...mapGetters({
        ENV: 'getEnvironment',
        navMargin: 'getnavMargin',
      }),
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
      ...mapActions([
        'initializeToken',
      ]),
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
