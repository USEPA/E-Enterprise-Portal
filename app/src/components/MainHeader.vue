<template>
  <header class="py-3 container">
    <div class="d-flex flex-nowrap justify-content-between align-items-center">
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
        <div class="w-100 d-block d-md-none "></div>
        <div class="col-md-4 d-flex justify-content-end align-self-end align-items-center">
          <div class="col-md-12">
            <template v-if='authenticated'>
              <span>Welcome {{ username }} </span>
              <b-btn
                      variant="outline-secondary"
                      class="btn btn-sm btn-outline-primary float-right account-auth"
                      @click="userLogOut">
                <i class="fas fa-lock"></i>&nbsp;
                Logout
              </b-btn>
            </template>
            <template v-else>
              <router-link
                      to="/login"
                      class="btn btn-sm btn-outline-primary account-auth"
                      ref="loginBtn"
                      @mouseover.native="startHover"
                      @mouseleave.native="endHover">
                <i class="fas fa-lock"></i>&nbsp;
                Login
              </router-link>
              <div id="login-btn-arrow" class="arrow-down" v-bind:style="displayArrow"></div>
              <div v-bind:style="displayMessage">
                <span id="login-message" class="arrow-down-message">{{loginBtnHoverMessage}}</span>
              </div>
            </template>
          </div>
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
    computed: {
      ...mapGetters({
        authenticated: 'getUserAuthentication',
        bridgeURL: 'getBridgeURL',
        username: 'getUserFullName',
        loginBtnHoverMessage: 'getloginBtnHoverMessage'
      }),
    },
    methods: {
      ...mapActions([
        'userLogOut',
      ]),
      startHover(){
        const vm = this;
        const store = vm.$store;
        this.displayArrow.display = '';
        this.displayMessage.display = '';
      },
      endHover(){
        const vm = this;
        const store = vm.$store;
        this.displayArrow.display = 'none';
        this.displayMessage.display = 'none';
      },
    },
    data() {
      return {
        displayArrow: {
          display: 'none',
          position: 'absolute'
        },
        displayMessage: {
          display: 'none',
          position: 'absolute'
        },
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped
  lang="scss">
  .eep_logo {
    img {
      max-width: 100%;
    }
  }

  .account-auth {
    background-color: #0071bc;
    color: white;
    margin-left: 65px;
  }

  .login-btn-arrow-and-message-wrapper {
    position: relative;
  }

  .arrow-down {
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid #0071bc;
    margin-left: 95px;
  }

  .arrow-down-message {
    font-size: x-small;
  }
</style>
