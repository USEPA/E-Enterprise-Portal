<template>
  <div
    id="app">
    <Storage/>
    <div
      class="environment-status text-white"
      v-if="(ENV !='PROD')">
      <div class="container">
        <div class="row">
          <div v-html="bannerText" class="col-12 text-center text-white">
          </div>
        </div>
      </div>
    </div>
    <div
      class="environment-status text-white"
      v-else>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center text-white">
            <span>
              Welcome to the new E-Enterprise Portal, with an updated and improved look and
              performance! As we move everything over, you can find old widgets and services
              at the original E-Enterprise <a :href="EEPURL">{{EEPURL}}</a> for the time being.
            </span>
          </div>
        </div>
      </div>
    </div>
    <MainHeader/>
    <div
      id="nav"
      class="region-navigation pb-2 px-3"
      v-if="!onHomePage">
      <div
        id="main-navigation-container"
        class="container">
        <div class="row">
          <div
            id="page-selection-wrapper"
            class="col-md-5 mt-2 pt-1 ml-0 pl-0">
            <ul>
              <li class="pl-0"
                v-show="!user.isLoggedIn">
                <router-link to="/">Home</router-link>
              </li>
              <li>
                <router-link to="/about">About</router-link>
              </li>
              <li>
                <router-link to="/workbench">Workbench</router-link>
              </li>
            </ul>
          </div>
          <template v-if="this.$router.history.current.path === '/workbench'">
            <LocationSearch/>
          </template>
        </div>
      </div>
    </div>
    <!-- issue here with container and the caroseul -->
    <template v-if="this.$router.history.current.path === '/'">
      <div class="px-0">
        <div id="main-content"
          class="no-gutters">
          <router-view/>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="container px-0">
        <div id="main-content"
          class="no-gutters">
          <router-view/>
        </div>
      </div>
    </template>
    <MainFooter/>
    <BannerUserCookiePolicy/>
    <!-- END OF CONTENT -->
    <!-- BEGINNING OF ADDITIONAL FEATURES -->
    <!-- set progressbar -->
    <vue-progress-bar/>
    <!-- Modal for cookie extension -->
    <AppModal
      id="cookieModal"
      modal-ref="cookieModal"
      title="Your session is about to expire">
      <!-- Modal content -->
      <p>{{ user.extendSessionModalMessage }}</p>
      <template slot="footer">
        <b-button
          class="usa-button usa-button-secondary"
          @click="exitModal"
          v-show="(user.displayLoginAgainButtonOnModal === 'none')">
          Cancel
        </b-button>
        <b-button
          class="usa-button"
          @click="extendTheSession"
          v-show="(user.displayLoginAgainButtonOnModal === 'none')">
          Extend Session
        </b-button>
        <b-button
          class="usa-button"
          @click="handleLogOut"
          v-show="!(user.displayLoginAgainButtonOnModal === 'none')">
          Login Again
        </b-button>
      </template>
    </AppModal>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapGetters, mapActions } from 'vuex';
  import MainHeader from '@/components/MainHeader.vue';
  import MainFooter from '@/components/MainFooter.vue';
  import LocationSearch from '@/components/LocationSearch.vue';
  import BannerTermsAndConditions from '@/components/BannerTermsAndConditions.vue';
  import BannerUserCookiePolicy from '@/components/BannerUserCookiePolicy.vue';
  import VueProgessBar from 'vue-progressbar';
  import types from './store/types';
  import { AppModal } from './modules/wadk/WADK';
  import Storage from './modules/Storage/Storage';

  const moduleName = 'App';

  export default {
    name: 'App',
    components: {
      MainHeader,
      MainFooter,
      VueProgessBar,
      LocationSearch,
      AppModal,
      BannerTermsAndConditions,
      BannerUserCookiePolicy,
      Storage,
    },
    computed: {
      ...mapGetters({
        deepLink: 'getDeepLink',
        ENV: 'getEnvironment',
        navMargin: 'getnavMargin',
        basicPages: 'getBasicPages',
        user: 'getUser',
        EEPURL: 'getOldEEPURL',
        bannerText: 'getBannerText'
      }),
      onHomePage: {
        get() {
          return this.$route.path === '/';
        },
      },
      // @todo clean up variable names here
      environmentName() {
        let env = 'LOCAL';
        const { host } = window.location;
        let match;
        const regex = {
          LOCAL: /(localhost|local|^e-enterprise$)/gm,
          DEV: /dev\d?\.e-enterprise/gm,
          TEST: /test\d?\.e-enterprise/gm,
          PROD: /^e-enterprise\.gov/gm,
        };
        Object.keys(regex).forEach((envName) => {
          // eslint-disable-next-line no-cond-assign
          while ((match = regex[envName].exec(host)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (match.length) {
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
        'setDeepLink',
        'setWorkbenchReadyState',
      ]),
      openModal() {
        const vm = this;
        vm.$root.$emit(
          'bv::show::modal',
          'cookieModal',
          vm.$refs.cookieModal,
        );
      },
      handleLogOut() {
        const vm = this;
        vm.$root.$emit(
          'bv::hide::modal',
          'cookieModal',
          vm.$refs.cookieModal,
        );
        vm.$router.push('/');
      },
      exitModal() {
        const vm = this;
        vm.$root.$emit(
          'bv::hide::modal',
          'cookieModal',
          this.$refs.cookie_modal,
        );
        this.$store.dispatch('userLogOut');
        this.$router.push('/login');
      },
      extendTheSession() {
        const vm = this;
        vm.$store.dispatch('extendSession', { vm });
      },
    },
    beforeCreate() {
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
      // workbench app
      // Grab the params property that was passed by the router and use it to navigate to the proper
      const currentRoute = vm.$router.history.current;
      vm.setDeepLink({ query: currentRoute.query.q, params: currentRoute.params });
    },
    mounted() {
      // Declare the store
      const vm = this;
      const store = vm.$store;

      // Fetch cookie information from Drupal backend and log in
      store.dispatch('getEEPConfigs', { vm });
    },
  };

</script>

<style lang="scss">
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
    font-size: 0.875rem;
    margin-top: 20px;
    vertical-align: center;

    input {
      font-size: 0.875rem;
      border-bottom: none;
    }

    a {
      text-decoration: none;
    }

    ul {
      list-style: none;
      padding-left: 0;
      margin-bottom: 0;

      li {
        display: inline-block;
        width: auto;

        a {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          color: #fff;
          text-shadow: none;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        &:not(:last-child):after {
          content: "|"
        }
      }
    }
  }
  .environment-status {
    background-color: #444;
    font-size: .75rem;
    &:hover {
      opacity: 1.0;
    }
  }
  // General slider media queries
  @include media-breakpoint-up(sm) {
    .environment-status {
      span {
        font-size: .7rem;
        height: 1.5rem;
      }
    }
  }
  @include media-breakpoint-up(md) {
    .environment-status {
      span {
        font-size: .7rem;
      }
    }
  }
  #nav {
    margin-top: 20px !important;
  }
  .usa-button:active,
  button:active,
  .usa-button:focus,
  button:focus,
  .usa-button:hover,
  button:hover {
    border: none;
    outline: none;
  }
</style>
