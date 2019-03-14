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

      <div class="col-sm-6 col-12 pt-4 pt-sm-0 d-flex justify-content-lg-end align-self-end-lg ">
        <div
          id="try-it-container"
          class="col-sm-6 col-lg-4">
          <router-link
            to="/workbench"
            tag="button"
            id="try-it-header-button"
            class="usa-button"
            variant="primary"
            @mouseover="addTryItArrow"
            @mouseleave="removeTryItArrow"
            v-if='!displayLoggedInElements'>
            <div
              ref="tryit-arrow"
              class="d-none button-down-arrow"/>
            <i class="fas fa-arrow-circle-right fa-arrow-alt-from-left pr-1"/>Try It
          </router-link>
        </div>
        <div
          class="col-sm-6 col-lg-4"
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
              variant="primary"
              tag="button">
              My account
            </router-link>
          </template>
          <template v-else>
            <button
              id="log-in"
              @mouseover="addLogInArrow"
              @mouseleave="removeLogInArrow"
              class="usa-button"
              @click="handleLogin">
              <i class="fas fa-lock pr-1"/>
              Login
            </button>
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
        user: 'getUser',
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
