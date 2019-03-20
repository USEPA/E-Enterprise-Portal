<template>
  <header class="py-3 container">
    <div class="row d-flex justify-content-between align-items-center">
      <div class="col-4-md justify-content-start">
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
      <div class="w-100 d-block d-sm-none "/>
      <div class="col-md-8 col-12 pt-3 d-flex justify-content-center justify-content-lg-end align-self-end-lg">
        <div class="tryit-wrapper pr-2 float-right">
          <router-link
            to="/workbench"
            v-if='!displayLoggedInElements'
            ref="try-it-button"
            class="usa-button pr-3 tryit-button"
            variant="primary"
            @mouseover="showTryitArrow=true"
            @mouseleave="showTryitArrow=false"
            v-b-tooltip.hover="{
                        placement:'bottomleft',
                        html: true
                      }"
            :title="tryitCaptionTitle"
            data-container="body">
            <i class="fas fa-arrow-circle-right fa-arrow-alt-from-left pr-1"/>Try It
          </router-link>
        </div>
        <div class="otherbtns-wrapper float-right">
          <template v-if='displayLoggedInElements'>
            <span class="mr-3">Welcome {{ user.name }}</span>
            <button
              variant="outline-secondary"
              class="usa-button"
              @click="userLogOut">
              <i class="fas fa-lock pr-1"/>
              Logout
            </button>
            <router-link
              to="/User"
              id="my-account"
              class="usa-button ml-2"
              variant="primary"
              tag="button">
              My account
            </router-link>
          </template>
          <template v-else>
            <div class="login-wrapper">
              <b-button
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
              </b-button>
            </div>
          </template>
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
      ]),
      navigateToRouterLink(link){
        this.$router.push(link);
      },
      navigateToLoginRoute() {
        console.log("hit navigate login route");

        // Checks to see if the user already accepted the user policy and if they did then go to the bridge login
        // If not, then go to the login view where the login options will be loaded
        if(this.$cookie.get('userPolicy')){
          // Redirect to the bridge login for a given url that is already stored in cookie
          window.location = this.$cookie.get('bridgeUrlLoginOption');
        }else{
          this.$router.push('/login')
        }
      },
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

  .tryit-button,
  .login-button,
  .tryit-caption,
  .login-caption {
    white-space: nowrap;
  }

  .tryit-caption, .login-caption {
    display: inline-block;
  }

  .arrow-down-login, .arrow-down-tryit {

    /* Draws the triangle*/
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #112e51;

    /*!*Sets position of triangle*!*/
    margin-top: -11px;
  }

  @media (max-width: 410px) {
    .tooltip{
      width: 75%;
    }
  }
</style>