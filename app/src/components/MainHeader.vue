<template>
  <header class="py-3 container">
    <div class="d-flex flex-nowrap justify-content-between align-items-center">
      <div class="col-md-4 justify-content-start">
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
      <div class="col-4-md d-flex justify-content-end align-self-end align-items-center">
        <div>
          <template v-if='authenticated'>
            <span>Welcome {{ username }} </span>
            <b-btn
                    variant="outline-secondary"
                    class="btn btn-sm btn-outline-primary account-auth"
                    @click="userLogOut">
              <i class="fas fa-lock"></i>&nbsp;
              Logout
            </b-btn>
          </template>
          <template v-else>
            <div class="router-link-wrapper">
              <router-link
                      to="/login"
                      class="btn btn-sm btn-outline-primary account-auth"
                      ref="loginBtn"
                      @mouseover.native="startHover"
                      @mouseleave.native="endHover">
                <i class="fas fa-lock"></i>&nbsp;
                Login
              </router-link>
            </div>

            <div class="arrow-and-msg-wrapper" v-bind:style="displayInfo">
              <div id="login-btn-arrow" class="arrow-down"></div>
              <span class="arrow-down-message">{{loginBtnHoverMessage}}</span>
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
        this.displayInfo.display = '';
      },
      endHover(){
        this.displayInfo.display = 'none';
      },
    },
    data() {
      return {
        displayInfo: {
          display: 'none',
          position: 'absolute',
        }
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
    margin-left: 30px;
  }

  .arrow-down-message {
    font-size: 1rem;
    font-family: 'Futura LT BT', 'Poppins', 'Century Gothic', 'Source Sans Pro', Helvetica, Arial, sans-serif;
  }
</style>
