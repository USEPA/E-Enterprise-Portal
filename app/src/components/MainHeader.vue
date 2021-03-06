<template>
  <header class="py-3 container">
    <div class="row d-flex justify-content-between align-items-center">
      <div class="col-md-3 justify-content-start">
        <a
          class="eep_logo"
          href='#/home'
          title="Home - E-Enterprise for the Environment"
          rel="home">
          <img
            src="../assets/images/eenterprise.svg"
            alt="Home - E-Enterprise for the Environment">
        </a>
      </div>
      <div class="w-100 d-block d-sm-none"/>
      <div
        class="col-md-9 col-12 pt-3 d-flex justify-content-sm-end justify-content-md-end
            justify-content-lg-end justify-content-center">
        <div class="tryit-wrapper pr-2 float-right">
          <router-link
            to="/workbench"
            v-if='!displayLoggedInElements'
            ref="try-it-button"
            class="usa-button pr-3 tryit-button"
            variant="primary"
            v-b-tooltip.hover="{
              placement:'bottomleft',
              html: true
            }"
            :title="tryitCaptionTitle"
            data-container="body">
            <i class="fas fa-arrow-circle-right fa-arrow-alt-from-left pr-1"/>Try It
          </router-link>
        </div>
        <div class="otherbtns-wrapper">
          <template v-if='displayLoggedInElements'>
            <div class="greeting-wrapper">
              <span class="mr-3">Welcome {{ user.name }}</span>
            </div>
            <div class="logout-myaccount-wrapper">
              <button
                variant="outline-secondary"
                class="usa-button logout-btn mb-1 mr-2"
                @click="userLogOut">
                <i class="fas fa-lock pr-1"/>
                Logout
              </button>
              <button
                id="my-account"
                class="usa-button myaccount-btn mb-1"
                @click="navigateToRouterLink('/User')"
                variant="primary"
                tag="button">
                My account
              </button>
            </div>
          </template>
          <template v-else>
            <div class="login-wrapper">
              <button
                @click="navigateToLoginRoute"
                ref="log-in-button"
                class="usa-button login-button"
                v-b-tooltip.hover="{
                  placement:'bottomleft',
                  html: true
                }"
                :title="loginCaptionTitle"
                data-container="body">
                <i class="fas fa-lock pr-1"/>Login
              </button>
            </div>
          </template>
          <h1
            ref="zoomHeightFix"
            class="invisible position-absolute">HEIGHT</h1>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { EventBus } from '../EventBus';

  // eslint-disable-next-line
  export default {
    name: 'MainHeader',
    props: {},
    data() {
      return {
        loginCaptionTitle: '<div class="arrow-down-tryit float-right" v-show="showTryitArrow"></div>' +
          '<div class=\'login-caption\'>Use an EPA, CDX, or a social media account to login.</div>',
        tryitCaptionTitle: '<div class="arrow-down-login float-right" v-show="showLoginArrow"></div>' +
          '<div class="tryit-caption">Want to just try it? No log in needed.</div>',
        showTryitArrow: false,
        showLoginArrow: false,
      };
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'getIsLoggedIn',
        bridgeURL: 'getBridgeURL',
        loginBtnHoverMessage: 'getloginBtnHoverMessage',
        displayLoggedInElements: 'getDisplayLoggedInElements',
        user: 'getUser',
      }),
    },
    methods: {
      ...mapActions([
        'navigateToBridge',
        'userLogOut',
        'setFontScaleRatio',
      ]),
      navigateToRouterLink(link) {
        this.$router.push(link);
      },
      navigateToLoginRoute() {
        // Checks to see if the user already accepted the user policy and if they did then go to the bridge login
        // If not, then go to the login view where the login options will be loaded
        if (this.$cookie.get('userPolicy') && !!this.$cookie.get('bridgeUrlLoginOption')) {
          // Redirect to the bridge login for a given url that is already stored in cookie
          window.location = this.$cookie.get('bridgeUrlLoginOption');
        } else {
          this.$router.push('/login');
        }
      },
    },
    mounted() {
      this.setFontScaleRatio(this.$refs.zoomHeightFix.clientHeight);
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .eep_logo {
    img {
      max-width: 250px;
    }
  }

  @media only screen and (min-width: 320px) and (max-device-width: 992px) {
    .greeting-wrapper {
      display: block !important;
    }

    .logout-myaccount-wrapper {
      margin-top: .5rem;
      float: left;
    }
  }

  .greeting-wrapper, .logout-myaccount-wrapper{
    display: inline-block;
  }

  .tryit-button,
  .login-button,
  .tryit-caption,
  .login-caption {
    white-space: nowrap;
  }

  .tryit-caption, .login-caption {
    display: inline-block;
  }

  @media (max-width: 410px) {
    .tooltip{
      width: 75%;
    }
  }
</style>
