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
      class="region-navigation pb-2 px-3"
      v-bind:style="navMargin">
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
    <div class="container px-0 pb-5">
      <div
        id="main-content"
        class="no-gutters py-2">
        <router-view/>
      </div>
    </div>
    <MainFooter/>
    <!-- set progressbar -->
    <vue-progress-bar/>
    <!-- Modal for cookie extension -->
    <AppModal id="cookie_modal"
              modal-ref="cookie_modal"
              title="Your session is about to expire">
        <!-- Modal content -->
        <p>Your session will expire in {{timeLeftUntilLogout}} minute(s).
            If you choose not to extend, then you will be logged out.</p>
        <p>Would you like to extend your session?</p>
        <template slot="footer">
            <b-button class="usa-button usa-button-secondary" @click="exitModal">
                Cancel
            </b-button>
            <b-button class="usa-button" @click="extendTheSession">
                Extend Session
            </b-button>
        </template>
    </AppModal>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapGetters, mapActions } from 'vuex';
  import AppAxios from 'axios';
  import MainHeader from '@/components/MainHeader.vue';
  import MainFooter from '@/components/MainFooter.vue';
  import LocationSearch from '@/components/LocationSearch.vue';
  import VueProgessBar from 'vue-progressbar';
  import types from './store/types';
  import {EventBus} from './EventBus';
  import {AppModal} from './modules/wadk/WADK';

  const moduleName = "App";

  export default {
    name: 'App',
    components: {
      MainHeader,
      MainFooter,
      VueProgessBar,
      LocationSearch,
      AppModal,
    },
    computed: {
    ...mapGetters({
        ENV: 'getEnvironment',
        navMargin: 'getnavMargin',
        basicPages: 'getBasicPages',
        timeLeftUntilLogout: 'getTimeLeftUntilLogout',
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
          openModal(){
              const vm = this;
              vm.$root.$emit(
                      'bv::show::modal',
                      'cookie_modal',
                      vm.$refs.cookie_modal
              );
          },
          exitModal(){
              const vm = this;
              vm.$root.$emit(
                  'bv::hide::modal',
                  'cookie_modal',
                  this.$refs.cookie_modal
              );
              this.$store.dispatch('userLogOut');
          },
          extendTheSession(){
              const vm = this
              vm.$store.dispatch('extendSession', {vm});
          },
      },
      beforeCreate(){
          const vm = this;
          vm.$store.dispatch('EEPBasicPagesToState');

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
      },
      beforeMount(){
          const vm = this;
          vm.$store.dispatch('DrupalConfigsToState');
      },
      mounted() {
          // Declare the main url that the page is currently on
          const main_url = window.location.href;
          // Declare the store
          const vm = this;
          const store = vm.$store;
          if (main_url.indexOf("token") > -1 && main_url.indexOf("uid") > -1) {
              // Declare variables
              let vars = {};
              // Extracts the URL params
              // Got this functionality from https://html-online.com/articles/get-url-parameters-javascript/
              let parts = main_url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                  vars[key] = value;
              });
              // find the URL params for each one
              const token = vars["token"];
              const uid = vars["uid"];

//              const cookie_time = store.getters.getAllConfigs.eepcookieconfig.cookie_expiration_time;
//              const cookie_time_units = store.getters.getAllConfigs.eepcookieconfig.cookie_time_units;
//
//              const COOKIE_EXPIRATION_TIME = cookie_time + cookie_time_units;
              // Have to do it this way for cross browser method: https://scotch.io/tutorials/how-to-encode-and-decode-strings-with-base64-in-javascript
              // Set another cookie saying they logged in
              // replace cookie expiration with the one from config
              this.$cookie.set('userLoggedIn', true, {expires: COOKIE_EXPIRATION_TIME});
              // set user token in cookie
              this.$cookie.set('Token', token, {expires: COOKIE_EXPIRATION_TIME});
              this.$cookie.set('uid', uid, {expires: COOKIE_EXPIRATION_TIME});

              // Set login time and token in the store
              store.commit(types.SET_LOGGED_IN_TOKEN, token);
              store.commit(types.SET_LOGGED_IN_TIME, new Date());

              // Set user id in the store
              store.commit(types.SET_UID, uid);

              // Log user in
              store.commit(types.IS_USER_LOGGED_IN, true);

              // After the user is logged in then start checking to see if the cookie has expired and if it has then log them out
              setInterval(function(evt){
                  // If statement will only execute when there is one minute left until expiration and the user is logged in
                  var cookie_expiration_time = store.getters.getLogInTime.getMinutes() + (cookie_time - 1);
                  if((new Date()).getMinutes() === cookie_expiration_time &&
                          store.getters.getDisplayLoggedInElements){
                      store.commit(types.TIME_LEFT_UNTIL_LOG_OUT, 1);
                      vm.$root.$emit(
                              'bv::show::modal',
                              'cookie_modal',
                              vm.$refs.cookie_modal
                      );
                  }else if((new Date()).getMinutes() > cookie_expiration_time){
                      store.dispatch('userLogOut');
                  }
              }, (cookie_time - 1) * 60000);
          }else{
              if(this.$cookie.get('userLoggedIn')){
                  // Log user in and set user name
                  store.commit('IS_USER_LOGGED_IN', true);
                  store.commit(types.SET_UID, this.$cookie.get('uid'));
              }
          }

          if (this.$cookie.get('userLoggedIn')) {
              AppAxios.get(`${this.$store.getters.getEnvironmentApiURL}/user/${this.$cookie.get('uid')}?_format=json`, {
                  headers: { Authorization: `Bearer ${this.$cookie.get('Token')}` },
              }).then((response) => {
                  store.commit('SET_USER_OBJECT', response.data);
              }).catch((error) => {
                  console.warn(error)
              });
          }

          //  [App.vue specific] When App.vue is finish loading finish the progress bar
          this.$Progress.finish();
        if(window.location.href.indexOf("token") > -1) {
          this.$router.push('/workbench');
        }
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
