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

      <div class="col-4-md d-flex justify-content-lg-end align-self-end align-items-center">
        <div class="col-4-md d-flex mr-3 align-self-end align-items-center" >
          <template>
            <router-link to="/workbench">
              <b-button
                id="try-it"
                class="btn btn-sm"
                variant="primary"
                :title="tryitTitle"
                v-if='!isLoggedIn'>
                <i class="fas fa-arrow-circle-right fa-arrow-alt-from-left"></i>&nbsp;Try It
              </b-button>
            </router-link>
          </template>
        </div>
        <div class="col-4-md">
          <template v-if='isLoggedIn'>
            <span>Welcome {{ username }}</span>
            <b-btn
              to="/"
              variant="outline-secondary"
              class="btn btn-sm btn-outline-primary account-auth"
              @click="userLogOut">
              <i class="fas fa-lock"></i>&nbsp;
              Logout
            </b-btn>
            <router-link to="/User">
               <b-button
                id="my-account"
                class="btn btn-sm ml-2"
                variant="primary">
                My account
               </b-button>
            </router-link>
          </template>
          <template v-else>
            <div class="router-link-wrapper pt-2">
              <router-link
                to="/login"
                class="btn btn-sm btn-outline-primary account-auth-login">
                <i class="fas fa-lock"></i>&nbsp;
                Login
                <span class="arrow-down-message small mt-3">{{ loginBtnHoverMessage }}</span>
              </router-link>
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
    computed: {
      ...mapGetters({
        isLoggedIn: 'getIsLoggedIn',
        bridgeURL: 'getBridgeURL',
        username: 'getUsername',
        loginBtnHoverMessage: 'getloginBtnHoverMessage',
      }),
      tryitTitle() {
        return 'Want to just try it? No log in needed.';
      },
    },
    methods: {
      ...mapActions([
        'userLogOut',
      ]),
      dumyLogOut() {
        this.userLogOut();
      },
    },
    data() {
      return {
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

  .arrow-down-message {
    display: none;
    color: #000;
    position: absolute;
    right: 0;
    font-size: 1rem;
    font-family: 'Futura LT BT', 'Poppins', 'Century Gothic', 'Source Sans Pro', Helvetica, Arial, sans-serif
  }

  .account-auth-login {
    background-color: #0071bc;
    color: white;
    position: relative;

    &:hover {
      &:after {
        content: '';
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid #0071bc;
        bottom: -7px;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
      }

      .arrow-down-message {
        display: block;
      }
    }
  }


</style>
