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
      <div class="w-100 d-block d-md-none "/>

      <div class="col-4-md d-flex justify-content-lg-end align-self-end align-items-center">
        <div
          id="try-it-container"
          class="col-4-md d-flex mr-3 align-self-end align-items-center">
          <template>
            <router-link to="/workbench">
              <div
                id="tryit-arrow"
                ref="tryit-arrow"
                class="d-none"
              />
              <b-button
                id="try-it"
                class="btn btn-sm"
                variant="primary"
                @mouseover="addTryItArrow"
                @mouseleave="removeTryItArrow"
                v-if='!isLoggedIn'>
                <i class="fas fa-arrow-circle-right fa-arrow-alt-from-left pr-1"/>Try It
              </b-button>
            </router-link>
          </template>
        </div>
        <div class="col-4-md" id="log-in-container">
          <template v-if='isLoggedIn'>
            <span>Welcome {{ username }}</span>
            <b-btn
              to="/"
              variant="outline-secondary"
              class="btn btn-sm btn-outline-primary account-auth"
              @click="userLogOut">
              <i class="fas fa-lock pr-1"/>
              Logout
            </b-btn>
            <b-button
                 to="/User"
                 id="my-account"
                 class="btn btn-sm ml-2"
                 variant="primary">
                 My account
            </b-button>
          </template>
          <template v-else>
              <div
                id="login-arrow"
                ref="login-arrow"
                class="d-none"
              />
              <div class="router-link-wrapper pt-2" id="log-in">
                  <a
                      href="javascript:void(0);"
                      @mouseover="addLogInArrow"
                      @mouseleave="removeLogInArrow"
                      @click="handleLogin"
                      class="btn btn-sm btn-outline-primary account-auth-login">
                    <i class="fas fa-lock pr-1"/>
                    Login
                  </a>
            </div>
          </template>
        </div>
          <b-tooltip
                  target="try-it"
                  class="tryit-tooltip"
                  placement="bottom">
              Want to just try it? No log in needed.
          </b-tooltip>
          <b-tooltip
                  target="log-in"
                  class="login-tooltip"
                  placement="bottom">
              Use an EPA, CDX, or a social media account to login
          </b-tooltip>
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
        'handleLogin',
      ]),
      removeTryItArrow() {
          this.$refs['tryit-arrow'].classList.remove('d-block');
          this.$refs['tryit-arrow'].classList.add('d-none');
      },
      addTryItArrow() {
          this.$refs['tryit-arrow'].classList.remove('d-none');
          this.$refs['tryit-arrow'].classList.add('d-block');
      },
      removeLogInArrow() {
          this.$refs['login-arrow'].classList.remove('d-block');
          this.$refs['login-arrow'].classList.add('d-none');
      },
      addLogInArrow() {
          this.$refs['login-arrow'].classList.remove('d-none');
          this.$refs['login-arrow'].classList.add('d-block');
      },
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
    #try-it-container {
        position: relative;
    }
    #try-it {
        position: relative;
    }
    #log-in-container {
        position: relative;
    }
    #log-in {
        position: relative;
    }
    #tryit-arrow {
        top: 100%;
        left: 50%;
        border: .7rem solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(0, 98, 160, 0);
        border-top-color: #0062a0;
        margin-left: -.7rem;
    }
    #login-arrow {
        top: 100%;
        left: 50%;
        border: .7rem solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(0, 98, 160, 0);
        border-top-color: #007ac6;
        margin-left: -.7rem;
    }

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
