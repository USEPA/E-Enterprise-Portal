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
                ref="tryit-arrow"
                class="d-none button-down-arrow"/>
              <button
                id="try-it-header-button"
                class="usa-button"
                variant="primary"
                @mouseover="addTryItArrow"
                @mouseleave="removeTryItArrow"
                v-if='!displayLoggedInElements'>
                <i class="fas fa-arrow-circle-right fa-arrow-alt-from-left pr-1"/>Try It
              </button>
            </router-link>
          </template>
        </div>
        <div
          class="col-4-md"
          id="log-in-container">
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
              variant="primary">
              My account
            </router-link>
          </template>
          <template v-else>
            <div
              ref="login-arrow"
              class="d-none button-down-arrow"/>
            <div
              class="router-link-wrapper pt-2"
              id="log-in">
              <button
                @mouseover="addLogInArrow"
                @mouseleave="removeLogInArrow"
                class="usa-button"
                @click="handleLogin">
                <i class="fas fa-lock pr-1"/>
                Login
              </button>
            </div>
          </template>
        </div>
        <b-tooltip
          v-if="!displayLoggedInElements"
          target="try-it-header-button"
          class="tryit-tooltip"
          placement="bottom">
          Want to just try it? No log in needed.
        </b-tooltip>
        <b-tooltip
          v-if="!displayLoggedInElements"
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
        loginBtnHoverMessage: 'getloginBtnHoverMessage',
        displayLoggedInElements: 'getDisplayLoggedInElements',
        user: 'getUser'
      }),
    },
    methods: {
      ...mapActions([
        'navigateToBridge',
        'userLogOut',
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
      handleLogin() {
        this.$router.push('/login');
      },
    },
    data() {
      return {};
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
  .button-down-arrow {
    top: 100%;
    left: 50%;
    border: .7rem solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(0, 98, 160, 0);
    border-top-color: #1a4480;
    margin-left: -.7rem;
  }
  .eep_logo {
    img {
      max-width: 250px;
    }
  }


</style>
