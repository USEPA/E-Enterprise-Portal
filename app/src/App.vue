<template>
  <div
    id="app">
    <div
      class="environment-status text-white"
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
      v-if="!onHomePage">
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
    <div class="container px-0">
      <div
        id="main-content"
        class="no-gutters py-2">
        <router-view/>
      </div>
    </div>
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
          v-show="!(user.displayLoginAgainButtonOnModal === 'none')" >
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
    },
    computed: {
      ...mapGetters({
        deepLink: 'getDeepLink',
        ENV: 'getEnvironment',
        navMargin: 'getnavMargin',
        basicPages: 'getBasicPages',
        user: 'getUser',
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
        vm.$router.push('/login');
        vm.$root.$emit(
          'bv::hide::modal',
          'cookieModal',
          vm.$refs.cookieModal,
        );
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
    beforeMount() {

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
    font-size: 1.4rem;

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
    background-color:#444;
    font-size:.75rem;
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

  #nav {
    margin-top: 20px !important;
  }
</style>
